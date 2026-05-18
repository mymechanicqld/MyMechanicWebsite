#!/usr/bin/env node
/**
 * Compress public/images/*.{png,jpg,jpeg} to WebP under ~200 KB.
 *
 * - Caps width at 1600 px (heroes never display wider, even on retina).
 * - WebP quality 80 (visually lossless for photos, ~5-10× smaller than PNG).
 * - Skips logo.png (kept as PNG for transparency / favicon use).
 * - Emits an OG image (`og-default.webp`, 1200×630) cropped from hero-van.
 * - Reports before/after sizes so you can sanity-check the savings.
 *
 * Run with: `node scripts/compress-images.mjs`
 *
 * After running, references in /app, /components and /content should point
 * to `.webp` filenames; the script does NOT delete originals (do that
 * manually once you've verified output looks right).
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const IMG_DIR = path.resolve(process.cwd(), 'public/images')
const MAX_WIDTH = 1600
const QUALITY = 78
const EFFORT = 6 // sharp's max compression effort (slower encode, smaller files)
const TARGET_KB = 200
const SKIP = new Set(['logo.png'])

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`
}

async function compressOne(file) {
  const src = path.join(IMG_DIR, file)
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null
  if (SKIP.has(file)) return null

  const base = path.basename(file, ext)
  const out = path.join(IMG_DIR, `${base}.webp`)

  const srcStat = await stat(src)

  // First pass at full width / target quality.
  let width = MAX_WIDTH
  let quality = QUALITY
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: EFFORT })
    .toFile(out)
  let outStat = await stat(out)

  // If still over budget, step down width then quality until we fit.
  const steps = [
    { w: 1400, q: 76 },
    { w: 1200, q: 74 },
    { w: 1200, q: 70 },
    { w: 1100, q: 66 },
  ]
  for (const s of steps) {
    if (outStat.size <= TARGET_KB * 1024) break
    width = s.w
    quality = s.q
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: EFFORT })
      .toFile(out)
    outStat = await stat(out)
  }

  const pct = ((1 - outStat.size / srcStat.size) * 100).toFixed(0)
  return {
    file,
    before: srcStat.size,
    after: outStat.size,
    pct,
    out: path.basename(out),
  }
}

async function buildOgImage() {
  const src = path.join(IMG_DIR, 'hero-van.png')
  const out = path.join(IMG_DIR, 'og-default.webp')
  try {
    await stat(src)
  } catch {
    return null
  }
  await sharp(src)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
    .webp({ quality: 82 })
    .toFile(out)
  const s = await stat(out)
  return { out: 'og-default.webp', size: s.size }
}

async function main() {
  const files = (await readdir(IMG_DIR)).sort()
  console.log(`Compressing ${files.length} files in public/images/...\n`)

  let totalBefore = 0
  let totalAfter = 0
  for (const f of files) {
    const r = await compressOne(f)
    if (!r) continue
    totalBefore += r.before
    totalAfter += r.after
    const flag = r.after > 200 * 1024 ? '⚠️ ' : '  '
    console.log(
      `${flag}${r.file.padEnd(38)} ${fmtKB(r.before).padStart(8)} → ${fmtKB(r.after).padStart(8)}   (-${r.pct}%)`,
    )
  }

  const og = await buildOgImage()
  if (og) {
    console.log(`\nOG image: ${og.out} (${fmtKB(og.size)})`)
  }

  console.log(
    `\nTotal: ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)} ` +
      `(saved ${fmtKB(totalBefore - totalAfter)}, ` +
      `${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
