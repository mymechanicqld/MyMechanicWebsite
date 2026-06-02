#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam, and shared with other
 * participating engines). This is the fastest way to tell search engines a
 * page is new or updated, with no crawl-budget wait.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                 # submit every live URL
 *   node scripts/submit-indexnow.mjs --region logan  # only one region's pages
 *   node scripts/submit-indexnow.mjs https://www.mymechanicqld.com.au/sunnybank/ ...
 *
 * The key file must be live at https://<host>/<key>.txt before running.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const HOST = 'www.mymechanicqld.com.au'
const SITE_URL = `https://${HOST}`
const KEY = '7f1e86871dd8fe55bbdaee180c6c8302'
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`

const PRIORITY_SERVICES = [
  'brake-repairs',
  'starter-alternator',
  'radiator-cooling-system',
  'logbook-servicing',
]

function loadSuburbs() {
  const raw = readFileSync(join(ROOT, 'content/suburbs.json'), 'utf8')
  return JSON.parse(raw).suburbs
}

function staticUrls() {
  const paths = [
    '/',
    '/services/',
    '/areas/',
    '/pricing/',
    '/warranty/',
    '/how-it-works/',
    '/check-coverage/',
    '/toyota-mechanic/',
    '/hilux-service/',
    '/mazda-service/',
    '/ford-ranger/',
    '/about/',
    '/contact/',
    '/faq/',
    '/book/',
    '/brisbane/',
    '/logan/',
    '/ipswich/',
    '/gold-coast/',
  ]
  return paths.map((p) => `${SITE_URL}${p}`)
}

function localUrls(regionFilter) {
  const suburbs = loadSuburbs().filter(
    (s) => !regionFilter || s.region === regionFilter
  )
  const urls = []
  for (const s of suburbs) {
    urls.push(`${SITE_URL}/${s.slug}/`)
    for (const svc of PRIORITY_SERVICES) {
      urls.push(`${SITE_URL}/${svc}/${s.slug}/`)
    }
  }
  return urls
}

function buildUrlList(args) {
  // Explicit URLs passed on the command line
  const explicit = args.filter((a) => a.startsWith('http'))
  if (explicit.length) return explicit

  const regionIdx = args.indexOf('--region')
  const regionFilter = regionIdx !== -1 ? args[regionIdx + 1] : null

  if (regionFilter) return localUrls(regionFilter)

  // Default: everything
  return [...staticUrls(), ...localUrls(null)]
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
  const urls = buildUrlList(args)

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
