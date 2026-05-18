"""
Scrape every image used on mymechanicqld.com.au.

Reads the page list from our existing crawl (crawl/mymechanicqld/summary.json),
refetches each page, extracts every image reference (img src, srcset, data-src,
inline background-image), downloads the unique files, and writes a manifest
mapping each downloaded image to the pages it appears on plus surrounding alt
text and DOM context.

Output goes to scraped-images/.
"""
import os
import re
import json
import time
import hashlib
import urllib.parse
from collections import defaultdict

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}
PAGE_DELAY = 0.8
IMG_DELAY = 0.15
TIMEOUT = 30

ROOT = os.path.dirname(os.path.abspath(__file__))
CRAWL_SUMMARY = os.path.join(ROOT, "crawl", "mymechanicqld", "summary.json")
OUT_DIR = os.path.join(ROOT, "scraped-images")
RAW_DIR = os.path.join(OUT_DIR, "raw")
os.makedirs(RAW_DIR, exist_ok=True)

SKIP_PATTERNS = (
    "pixel.gif", "1x1.gif", "analytics", "googletag",
    "facebook.com/tr", "doubleclick", "wixstatic.com/media/svg",
)
ALLOWED_EXT = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif")


def page_slug(url: str) -> str:
    p = urllib.parse.urlparse(url).path.strip("/")
    return p or "home"


def normalise_wix(url: str) -> str:
    """
    Wix often serves transformed variants of the same image at URLs like
        .../media/abc123.jpg/v1/fill/w_980,h_613,.../abc123.jpg
    We dedup by the underlying file name (the bit before /v1/).
    """
    if "wixstatic.com/media/" in url and "/v1/" in url:
        return url.split("/v1/")[0]
    return url.split("?")[0]


def extract_images(html: str, base_url: str):
    soup = BeautifulSoup(html, "html.parser")
    found = []

    def add(raw_url, alt, context):
        if not raw_url:
            return
        full = urllib.parse.urljoin(base_url, raw_url.strip())
        if any(s in full for s in SKIP_PATTERNS):
            return
        ext = os.path.splitext(urllib.parse.urlparse(full).path)[1].lower()
        # Wix often omits a sensible extension in the path; accept anything
        # whose path or query suggests an image
        if ext and ext not in ALLOWED_EXT:
            return
        found.append({"url": full, "alt": (alt or "").strip(), "context": context})

    for img in soup.find_all("img"):
        alt = img.get("alt", "")
        # Try to pick a section context (the nearest ancestor with a class)
        ctx = ""
        for parent in img.parents:
            if getattr(parent, "name", None) in ("section", "main", "article", "header", "footer"):
                ctx = parent.name
                break
            cls = parent.get("class") if hasattr(parent, "get") else None
            if cls:
                ctx = "-".join(cls[:2])
                break

        # standard src
        add(img.get("src"), alt, ctx)
        # common lazy-loading attributes
        for attr in ("data-src", "data-original", "data-lazy", "data-pin-media"):
            add(img.get(attr), alt, ctx)
        # srcset: take every URL listed
        for srcset_attr in ("srcset", "data-srcset"):
            ss = img.get(srcset_attr)
            if not ss:
                continue
            for entry in ss.split(","):
                bits = entry.strip().split()
                if bits:
                    add(bits[0], alt, ctx)

    # picture > source
    for source in soup.find_all("source"):
        for srcset_attr in ("srcset", "data-srcset"):
            ss = source.get(srcset_attr)
            if not ss:
                continue
            for entry in ss.split(","):
                bits = entry.strip().split()
                if bits:
                    add(bits[0], "", "picture-source")

    # inline background-image
    for el in soup.find_all(style=True):
        style = el.get("style") or ""
        for m in re.finditer(r"background(?:-image)?:\s*url\(['\"]?([^'\")]+)", style):
            add(m.group(1), el.get("aria-label", ""), "bg")

    # og:image meta
    og = soup.find("meta", property="og:image")
    if og and og.get("content"):
        add(og["content"], "", "og:image")

    return found


def safe_filename(url: str, idx: int = 0) -> str:
    p = urllib.parse.urlparse(url)
    base = os.path.basename(p.path) or "image"
    base = re.sub(r"[^A-Za-z0-9._-]+", "_", base)
    if "." not in base:
        # No extension. Try to keep a unique stem and let download supply the ext.
        h = hashlib.md5(url.encode()).hexdigest()[:8]
        base = f"img_{h}.bin"
    # Add a short hash to avoid filename clashes across pages.
    stem, ext = os.path.splitext(base)
    h = hashlib.md5(url.encode()).hexdigest()[:6]
    return f"{stem}_{h}{ext}"


def download(url: str, path: str) -> bool:
    try:
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT, stream=True)
        if r.status_code != 200:
            return False
        ctype = r.headers.get("Content-Type", "").lower()
        # If we ended up with a .bin extension because the URL had none, infer from content-type
        if path.endswith(".bin"):
            ext = {
                "image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png",
                "image/webp": ".webp", "image/gif": ".gif", "image/svg+xml": ".svg",
                "image/avif": ".avif",
            }.get(ctype.split(";")[0].strip(), ".jpg")
            path = path[:-4] + ext
        with open(path, "wb") as f:
            for chunk in r.iter_content(8192):
                if chunk:
                    f.write(chunk)
        return path
    except Exception as e:
        print(f"   ! download error: {e}")
        return False


def main():
    with open(CRAWL_SUMMARY) as f:
        pages = json.load(f)
    print(f"Loaded {len(pages)} pages from the crawl summary.")

    unique = {}            # normalised_url -> manifest entry
    usage = defaultdict(list)  # normalised_url -> [{page, alt, context, original_url}]

    for i, page in enumerate(pages, 1):
        page_url = page["url"]
        print(f"\n[{i:>2}/{len(pages)}] {page_url}")
        try:
            r = requests.get(page_url, headers=HEADERS, timeout=TIMEOUT)
        except Exception as e:
            print(f"   ! fetch error: {e}")
            continue
        time.sleep(PAGE_DELAY)
        if r.status_code != 200:
            print(f"   ! status {r.status_code}")
            continue

        images = extract_images(r.text, r.url)
        print(f"   found {len(images)} image references")

        for img in images:
            key = normalise_wix(img["url"])
            usage[key].append({
                "page": page_url,
                "page_slug": page_slug(page_url),
                "alt": img["alt"],
                "context": img["context"],
                "original_url": img["url"],
            })

            if key in unique:
                continue

            fname = safe_filename(img["url"])
            dest = os.path.join(RAW_DIR, fname)
            saved = download(img["url"], dest)
            time.sleep(IMG_DELAY)
            if not saved:
                continue
            if isinstance(saved, str):
                fname = os.path.basename(saved)
                dest = saved

            size = os.path.getsize(dest)
            unique[key] = {
                "key": key,
                "filename": fname,
                "local_path": os.path.relpath(dest, ROOT),
                "size_bytes": size,
                "primary_alt": img["alt"],
            }
            kb = size // 1024
            print(f"   saved {fname} ({kb} KB)")

    # Build final manifest
    manifest = []
    for key, entry in sorted(unique.items(), key=lambda kv: -kv[1]["size_bytes"]):
        entry["used_on"] = usage[key]
        entry["usage_count"] = len(usage[key])
        # Best alt across uses (longest non-empty)
        alts = [u["alt"] for u in usage[key] if u["alt"]]
        if alts:
            entry["primary_alt"] = max(alts, key=len)
        manifest.append(entry)

    manifest_path = os.path.join(OUT_DIR, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    # Build a per-page index for the next stage (wiring images into the concept)
    page_index = defaultdict(list)
    for entry in manifest:
        for use in entry["used_on"]:
            page_index[use["page_slug"]].append({
                "filename": entry["filename"],
                "local_path": entry["local_path"],
                "alt": use["alt"],
                "context": use["context"],
                "size_bytes": entry["size_bytes"],
            })
    page_index_path = os.path.join(OUT_DIR, "by-page.json")
    with open(page_index_path, "w") as f:
        json.dump(page_index, f, indent=2, ensure_ascii=False)

    print()
    print("=" * 60)
    print(f"Unique images downloaded: {len(manifest)}")
    print(f"Total bytes: {sum(e['size_bytes'] for e in manifest) / 1024:.0f} KB")
    print(f"Manifest:   {manifest_path}")
    print(f"Per-page:   {page_index_path}")
    print(f"Raw files:  {RAW_DIR}")


if __name__ == "__main__":
    main()
