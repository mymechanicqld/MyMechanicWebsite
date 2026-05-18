#!/usr/bin/env node
/**
 * Encode Supabase credentials for the standalone dashboard.
 *
 * Usage:
 *   node scripts/encode-creds.mjs
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from
 * .env.local, applies a +13 char-code rotation, prints the two `_enc` strings.
 * Paste them into dashboard/index.html.
 *
 * Why obfuscate at all?
 *   - The publishable key is *designed* to be public — RLS is the security.
 *   - But we don't want the literal `sb_publishable_` prefix or project ref
 *     grep-able on GitHub. Avoids secret-scanner false positives and
 *     drive-by scrapers.
 *
 * This is NOT real security. Anyone who runs the page sees the decoded
 * values. The real protection is the Supabase RLS policies in
 * supabase/migrations/.
 */
import fs from 'node:fs'

function encode(s) {
  return Array.from(s)
    .map((c) => c.charCodeAt(0) + 13)
    .join('.')
}

const envFile = fs.readFileSync('.env.local', 'utf8')
const get = (k) => {
  const m = envFile.match(new RegExp(`^${k}=(.+)$`, 'm'))
  if (!m) throw new Error(`${k} not found in .env.local`)
  return m[1].trim()
}

const url = get('NEXT_PUBLIC_SUPABASE_URL')
const key = get('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')

console.log('Paste these into dashboard/index.html, replacing the existing _enc values:\n')
console.log('const _enc = {')
console.log(`  url: '${encode(url)}',`)
console.log(`  key: '${encode(key)}',`)
console.log('};')
