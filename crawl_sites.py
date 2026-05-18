"""
Crawl two competitor sites, extract clean text + SEO metadata per page,
save into organized folders for offline analysis.

No paid APIs. No Claude API. Pure free crawling.
"""
import os
import re
import time
import json
import urllib.parse
from collections import deque
from xml.etree import ElementTree as ET

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    )
}

MAX_PAGES = 60          # cap per site
REQUEST_DELAY = 1.0     # polite delay between requests (seconds)
TIMEOUT = 20

SITES = {
    "mymechanicqld": "https://www.mymechanicqld.com.au/",
    "autoking":      "https://www.autoking.com.au/",
}

OUT_ROOT = os.path.dirname(os.path.abspath(__file__))


def safe_filename(url: str) -> str:
    """Turn a URL path into a safe filename."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "_home"
    name = re.sub(r"[^a-zA-Z0-9._-]+", "_", path)
    return name[:120] or "_page"


def fetch(url: str):
    try:
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT, allow_redirects=True)
        if r.status_code == 200 and "text/html" in r.headers.get("Content-Type", "").lower():
            return r.text, r.url
        if r.status_code == 200 and "xml" in r.headers.get("Content-Type", "").lower():
            return r.text, r.url
        return None, r.url
    except Exception as e:
        print(f"   ! fetch error {url}: {e}")
        return None, url


def discover_via_sitemap(base_url: str):
    """Try common sitemap locations. Return list of URLs found."""
    found = []
    candidates = [
        urllib.parse.urljoin(base_url, "/sitemap.xml"),
        urllib.parse.urljoin(base_url, "/sitemap_index.xml"),
        urllib.parse.urljoin(base_url, "/sitemap-0.xml"),
        urllib.parse.urljoin(base_url, "/robots.txt"),
    ]
    sitemaps_to_parse = []

    for c in candidates:
        body, _ = fetch(c)
        if not body:
            continue
        if c.endswith("robots.txt"):
            for line in body.splitlines():
                if line.lower().startswith("sitemap:"):
                    sitemaps_to_parse.append(line.split(":", 1)[1].strip())
        else:
            sitemaps_to_parse.append(c)

    seen_sm = set()
    for sm in sitemaps_to_parse:
        if sm in seen_sm:
            continue
        seen_sm.add(sm)
        body, _ = fetch(sm)
        if not body:
            continue
        try:
            # strip namespaces for easy parsing
            body_clean = re.sub(r'\sxmlns="[^"]+"', '', body, count=1)
            root = ET.fromstring(body_clean)
        except Exception:
            continue
        # sitemap index?
        for sm_el in root.findall(".//sitemap/loc"):
            sitemaps_to_parse.append(sm_el.text.strip())
        for loc in root.findall(".//url/loc"):
            if loc.text:
                found.append(loc.text.strip())

    return list(dict.fromkeys(found))  # de-dup, preserve order


def discover_via_bfs(base_url: str, max_pages: int):
    """Fallback: BFS crawl from homepage."""
    base_host = urllib.parse.urlparse(base_url).netloc
    queue = deque([base_url])
    seen = {base_url}
    found = []

    while queue and len(found) < max_pages:
        url = queue.popleft()
        html, _ = fetch(url)
        time.sleep(REQUEST_DELAY)
        if not html:
            continue
        found.append(url)
        soup = BeautifulSoup(html, "html.parser")
        for a in soup.find_all("a", href=True):
            href = urllib.parse.urljoin(url, a["href"]).split("#")[0]
            if urllib.parse.urlparse(href).netloc != base_host:
                continue
            if href.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".pdf", ".webp", ".svg", ".zip")):
                continue
            if href not in seen:
                seen.add(href)
                queue.append(href)
    return found


def extract_page(html: str, url: str):
    soup = BeautifulSoup(html, "html.parser")

    # remove non-content elements
    for tag in soup(["script", "style", "noscript", "iframe", "svg"]):
        tag.decompose()

    title = (soup.title.string.strip() if soup.title and soup.title.string else "")

    def meta_content(name=None, prop=None):
        if name:
            m = soup.find("meta", attrs={"name": name})
        else:
            m = soup.find("meta", attrs={"property": prop})
        return m["content"].strip() if m and m.get("content") else ""

    meta_desc = meta_content(name="description")
    meta_keywords = meta_content(name="keywords")
    og_title = meta_content(prop="og:title")
    og_desc = meta_content(prop="og:description")
    canonical_tag = soup.find("link", rel="canonical")
    canonical = canonical_tag["href"] if canonical_tag and canonical_tag.get("href") else ""

    h1s = [h.get_text(" ", strip=True) for h in soup.find_all("h1")]
    h2s = [h.get_text(" ", strip=True) for h in soup.find_all("h2")]
    h3s = [h.get_text(" ", strip=True) for h in soup.find_all("h3")]

    # images / alts
    imgs = soup.find_all("img")
    img_count = len(imgs)
    imgs_no_alt = sum(1 for i in imgs if not i.get("alt"))

    # links
    base_host = urllib.parse.urlparse(url).netloc
    internal_links = 0
    external_links = 0
    for a in soup.find_all("a", href=True):
        href = urllib.parse.urljoin(url, a["href"])
        host = urllib.parse.urlparse(href).netloc
        if host == base_host or host == "":
            internal_links += 1
        else:
            external_links += 1

    # schema.org JSON-LD types
    jsonld_types = []
    for s in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(s.string or "")
            if isinstance(data, list):
                for d in data:
                    t = d.get("@type")
                    if t: jsonld_types.append(t)
            elif isinstance(data, dict):
                t = data.get("@type")
                if t: jsonld_types.append(t)
        except Exception:
            pass

    # main visible text
    body = soup.find("body")
    text = body.get_text("\n", strip=True) if body else soup.get_text("\n", strip=True)
    # collapse blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    word_count = len(text.split())

    return {
        "url": url,
        "title": title,
        "title_length": len(title),
        "meta_description": meta_desc,
        "meta_description_length": len(meta_desc),
        "meta_keywords": meta_keywords,
        "og_title": og_title,
        "og_description": og_desc,
        "canonical": canonical,
        "h1": h1s,
        "h2": h2s,
        "h3": h3s,
        "word_count": word_count,
        "image_count": img_count,
        "images_missing_alt": imgs_no_alt,
        "internal_links": internal_links,
        "external_links": external_links,
        "schema_types": list(set(jsonld_types)),
        "text": text,
    }


def crawl_site(name: str, base_url: str):
    print(f"\n=== {name} :: {base_url} ===")
    out_dir = os.path.join(OUT_ROOT, "crawl", name)
    pages_dir = os.path.join(out_dir, "pages")
    os.makedirs(pages_dir, exist_ok=True)

    urls = discover_via_sitemap(base_url)
    print(f"   sitemap discovered: {len(urls)} URLs")
    if not urls:
        print("   falling back to BFS crawl ...")
        urls = discover_via_bfs(base_url, MAX_PAGES)
    urls = urls[:MAX_PAGES]

    summary_rows = []
    full_text_blob = []
    site_host = urllib.parse.urlparse(base_url).netloc

    for i, url in enumerate(urls, 1):
        if urllib.parse.urlparse(url).netloc != site_host:
            continue
        print(f"   [{i}/{len(urls)}] {url}")
        html, final_url = fetch(url)
        time.sleep(REQUEST_DELAY)
        if not html:
            continue
        info = extract_page(html, final_url)
        fname = safe_filename(final_url) + ".txt"
        fpath = os.path.join(pages_dir, fname)

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(f"URL: {info['url']}\n")
            f.write(f"TITLE: {info['title']}  (len={info['title_length']})\n")
            f.write(f"META DESCRIPTION: {info['meta_description']}  (len={info['meta_description_length']})\n")
            f.write(f"META KEYWORDS: {info['meta_keywords']}\n")
            f.write(f"OG TITLE: {info['og_title']}\n")
            f.write(f"OG DESC:  {info['og_description']}\n")
            f.write(f"CANONICAL: {info['canonical']}\n")
            f.write(f"SCHEMA TYPES: {', '.join(info['schema_types'])}\n")
            f.write(f"WORD COUNT: {info['word_count']}\n")
            f.write(f"IMAGES: {info['image_count']}  (missing alt: {info['images_missing_alt']})\n")
            f.write(f"LINKS: internal={info['internal_links']} external={info['external_links']}\n")
            f.write("\n--- H1 ---\n" + "\n".join(info["h1"]) + "\n")
            f.write("\n--- H2 ---\n" + "\n".join(info["h2"]) + "\n")
            f.write("\n--- H3 ---\n" + "\n".join(info["h3"]) + "\n")
            f.write("\n--- BODY TEXT ---\n")
            f.write(info["text"])

        summary_rows.append({k: v for k, v in info.items() if k != "text"})
        full_text_blob.append(f"\n\n========== {info['url']} ==========\n{info['text']}")

    # write summary index + combined text
    with open(os.path.join(out_dir, "summary.json"), "w", encoding="utf-8") as f:
        json.dump(summary_rows, f, indent=2, ensure_ascii=False)

    # human-readable index
    with open(os.path.join(out_dir, "INDEX.txt"), "w", encoding="utf-8") as f:
        f.write(f"Site: {name} ({base_url})\n")
        f.write(f"Pages crawled: {len(summary_rows)}\n\n")
        for row in summary_rows:
            f.write(f"- {row['url']}\n")
            f.write(f"    title: {row['title']}\n")
            f.write(f"    meta:  {row['meta_description'][:140]}\n")
            f.write(f"    words: {row['word_count']}  H1s: {len(row['h1'])}  H2s: {len(row['h2'])}\n\n")

    with open(os.path.join(out_dir, "ALL_TEXT.txt"), "w", encoding="utf-8") as f:
        f.write("".join(full_text_blob))

    print(f"   done. wrote {len(summary_rows)} pages -> {out_dir}")
    return summary_rows


if __name__ == "__main__":
    all_summaries = {}
    for name, url in SITES.items():
        all_summaries[name] = crawl_site(name, url)
    print("\nAll done.")
