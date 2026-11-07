#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam, and shared with other
 * participating engines). This is the fastest way to tell search engines a
 * page is new or updated, with no crawl-budget wait.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                 # every URL in the live sitemap
 *   node scripts/submit-indexnow.mjs --region logan  # only /sitemap-logan.xml
 *   node scripts/submit-indexnow.mjs https://www.mymechanicqld.com.au/sunnybank/ ...
 *
 * The key file must be live at https://<host>/<key>.txt before running.
 */

const HOST = 'www.mymechanicqld.com.au'
const SITE_URL = `https://${HOST}`
const KEY = '7f1e86871dd8fe55bbdaee180c6c8302'
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`

/**
 * URLs come from the live sitemap, so this only ever submits pages we want
 * indexed. (It used to build the list from content/suburbs.json, which would
 * push the ~800 noindexed template pages back at search engines.)
 */
async function fetchLocs(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

async function sitemapUrls(segment) {
  if (segment) return fetchLocs(`${SITE_URL}/sitemap-${segment}.xml`)
  const segments = await fetchLocs(`${SITE_URL}/sitemap.xml`)
  const lists = await Promise.all(segments.map(fetchLocs))
  return lists.flat()
}

async function buildUrlList(args) {
  // Explicit URLs passed on the command line
  const explicit = args.filter((a) => a.startsWith('http'))
  if (explicit.length) return explicit

  const regionIdx = args.indexOf('--region')
  const regionFilter = regionIdx !== -1 ? args[regionIdx + 1] : null
  return sitemapUrls(regionFilter)
}

async function submitBatch(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  })
  return res.status
}

async function main() {
  const args = process.argv.slice(2)
  const urls = await buildUrlList(args)

  console.log(`IndexNow: submitting ${urls.length} URLs as ${HOST}`)
  console.log(`Key file: ${KEY_LOCATION}`)

  // IndexNow accepts up to 10,000 URLs per request; batch at 1,000 to be safe.
  const BATCH = 1000
  for (let i = 0; i < urls.length; i += BATCH) {
    const slice = urls.slice(i, i + BATCH)
    const status = await submitBatch(slice)
    const ok = status === 200 || status === 202
    console.log(
      `  Batch ${i / BATCH + 1}: ${slice.length} URLs -> HTTP ${status} ${ok ? 'OK' : 'CHECK'}`
    )
    if (status === 403) {
      console.error(
        '  403 means the key file is not reachable. Confirm it is live at the key location first.'
      )
    }
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
