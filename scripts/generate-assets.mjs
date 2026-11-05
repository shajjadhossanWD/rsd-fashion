/**
 * Generates optimized, committed assets from the source images in public/asset/.
 * Source files are never modified. Re-run after replacing a source image:
 *
 *   npm run assets
 *
 * Outputs
 *  - public/favicon-32.png, public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png
 *    The RSD mark cropped from favicon.webp, on a dark tile (the mark is silver/white,
 *    which would vanish on light browser tabs).
 *  - public/asset/products/<slug>-{480,960}.webp
 *    Product category thumbnails (sources are ~1920px / up to 800 KB; shown ~240–450px wide).
 *  - public/asset/about/global-partner-{560,1120}.webp
 *    Photo extracted from the SVG-wrapped home-5th-section-left-img.jpg.
 */
import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = (...p) => path.join(root, 'public', ...p)

const BRAND_DARK = '#231f20'

async function favicons() {
  // Crop away the tagline / "&" below the mark, then trim leftover transparent edges.
  // Two passes: sharp applies trim() before extract() within one pipeline.
  const cropped = await sharp(pub('asset', 'favicon.webp'))
    .extract({ left: 140, top: 150, width: 1660, height: 1020 })
    .png()
    .toBuffer()
  const mark = await sharp(cropped).trim().png().toBuffer()

  const sizes = [
    { file: 'favicon-32.png', size: 32, padding: 0.08, radius: 0.22 },
    { file: 'apple-touch-icon.png', size: 180, padding: 0.14, radius: 0 }, // iOS rounds it itself
    { file: 'icon-192.png', size: 192, padding: 0.14, radius: 0.22 },
    { file: 'icon-512.png', size: 512, padding: 0.14, radius: 0.22 },
  ]

  for (const { file, size, padding, radius } of sizes) {
    const inner = Math.round(size * (1 - padding * 2))
    const markResized = await sharp(mark)
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer()

    const r = Math.round(size * radius)
    const tile = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
         <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${BRAND_DARK}"/>
       </svg>`,
    )

    await sharp(tile)
      .composite([{ input: markResized, gravity: 'center' }])
      .png({ compressionLevel: 9 })
      .toFile(pub(file))
    console.log('✓', file)
  }
}

const PRODUCT_SOURCES = {
  knitwear: 'home-4th-section-products-Knitwear.jpg',
  crochet: 'home-4th-section-products-Crochet.jpg',
  woven: 'home-4th-section-products-Woven.jpg',
  denim: 'home-4th-section-products-Denim.jpg',
  jersey: 'home-4th-section-products-jersey.jpg',
  accessories: 'home-4th-section-products-accessories.jpg',
}

async function productThumbnails() {
  await mkdir(pub('asset', 'products'), { recursive: true })
  for (const [slug, source] of Object.entries(PRODUCT_SOURCES)) {
    for (const width of [480, 960]) {
      const out = pub('asset', 'products', `${slug}-${width}.webp`)
      const info = await sharp(pub('asset', source))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(out)
      console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
    }
  }
}

/**
 * home-5th-section-left-img.jpg is actually an SVG wrapping an embedded WebP (plus a
 * figure-8 clip path). Pull the photo out so the browser can use srcset; the shape is
 * re-applied in CSS (`mask-figure8` in globals.css).
 */
async function partnerPhoto() {
  const svg = await readFile(pub('asset', 'home-5th-section-left-img.jpg'), 'utf8')
  const match = svg.match(/data:image\/(?:webp|png|jpeg);base64,([A-Za-z0-9+/=]+)/)
  if (!match?.[1]) throw new Error('No embedded image found in home-5th-section-left-img.jpg')
  const photo = Buffer.from(match[1], 'base64')

  await mkdir(pub('asset', 'about'), { recursive: true })
  for (const width of [560, 1120]) {
    const out = pub('asset', 'about', `global-partner-${width}.webp`)
    const info = await sharp(photo)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out)
    console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
  }
}

/** home-6th-section-bg.webp is really a JPEG; emit true WebP at two widths for srcset. */
async function partnershipBackground() {
  await mkdir(pub('asset', 'about'), { recursive: true })
  for (const width of [960, 1920]) {
    const out = pub('asset', 'about', `partnership-${width}.webp`)
    const info = await sharp(pub('asset', 'home-6th-section-bg.webp'))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(out)
    console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
  }
}

/** Footer: yarn background (source is a JPEG named .webp) + trimmed stacked logo. */
async function footerAssets() {
  await mkdir(pub('asset', 'brand'), { recursive: true })
  for (const width of [960, 1920]) {
    const out = pub('asset', 'brand', `footer-bg-${width}.webp`)
    const info = await sharp(pub('asset', 'home-footer-section-bg.webp'))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(out)
    console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
  }

  // The banner logo has ~10% transparent padding; trim it so it can be sized by its artwork.
  const trimmed = await sharp(pub('asset', 'rsd-home-banner logo.webp')).trim().toBuffer()
  const out = pub('asset', 'brand', 'logo-stacked-480.webp')
  const info = await sharp(trimmed).resize({ width: 480 }).webp({ quality: 88 }).toFile(out)
  console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
}

/** Light (silver/white) RSD mark from favicon.webp — for use on dark backgrounds. */
async function lightMark() {
  const cropped = await sharp(pub('asset', 'favicon.webp'))
    .extract({ left: 140, top: 150, width: 1660, height: 1020 })
    .png()
    .toBuffer()
  const mark = await sharp(cropped).trim().png().toBuffer()

  await mkdir(pub('asset', 'brand'), { recursive: true })
  for (const width of [480, 960]) {
    const out = pub('asset', 'brand', `mark-light-${width}.webp`)
    const info = await sharp(mark).resize({ width }).webp({ quality: 88 }).toFile(out)
    console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
  }
}

/** Products page photos that ship far larger than they're displayed. */
async function productsPagePhotos() {
  const jobs = [
    ['products-page-6th-section-denim-pant.jpg', 'denim-rack', 640],
    ['Kidswear-7th-section-1.jpg', 'kids-girl-portrait', 640],
    ['Kidswear-7th-section-6.jpg', 'kids-yellow-dress', 640],
  ]
  await mkdir(pub('asset', 'products-page'), { recursive: true })
  for (const [source, name, width] of jobs) {
    const out = pub('asset', 'products-page', `${name}-${width}.webp`)
    const info = await sharp(pub('asset', source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out)
    console.log('✓', path.relative(root, out), `${Math.round(info.size / 1024)} KB`)
  }
}

await favicons()
await productsPagePhotos()
await productThumbnails()
await partnerPhoto()
await partnershipBackground()
await footerAssets()
await lightMark()
