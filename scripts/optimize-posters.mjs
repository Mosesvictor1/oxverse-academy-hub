/**
 * Generate lightweight thumbnails for video cards and medium posters for the player.
 * Run: node scripts/optimize-posters.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEOS_DIR = path.resolve(__dirname, "../public/videos");
const THUMBS_DIR = path.join(VIDEOS_DIR, "thumbs");
const POSTERS_DIR = path.join(VIDEOS_DIR, "posters");

/** Card display is ~160px — 320px thumb covers 2x retina */
const THUMB_W = 320;
/** Player modal max ~640px wide */
const POSTER_W = 640;

fs.mkdirSync(THUMBS_DIR, { recursive: true });
fs.mkdirSync(POSTERS_DIR, { recursive: true });

const mp4s = fs.readdirSync(VIDEOS_DIR).filter((f) => f.endsWith(".mp4"));

let thumbBytes = 0;
let posterBytes = 0;

for (const file of mp4s) {
  const slug = file.replace(/\.mp4$/, "");
  const input = path.join(VIDEOS_DIR, file);
  const thumbOut = path.join(THUMBS_DIR, `${slug}.jpg`);
  const posterOut = path.join(POSTERS_DIR, `${slug}.jpg`);

  execSync(
    `ffmpeg -y -ss 1 -i "${input}" -vf "scale=${THUMB_W}:-2:flags=lanczos" -frames:v 1 -q:v 5 "${thumbOut}"`,
    { stdio: "pipe" },
  );
  execSync(
    `ffmpeg -y -ss 1 -i "${input}" -vf "scale=${POSTER_W}:-2:flags=lanczos" -frames:v 1 -q:v 4 "${posterOut}"`,
    { stdio: "pipe" },
  );

  thumbBytes += fs.statSync(thumbOut).size;
  posterBytes += fs.statSync(posterOut).size;
  console.log(`✓ ${slug}`);
}

console.log(
  `\n${mp4s.length} videos → thumbs ${(thumbBytes / 1024).toFixed(0)} KB, posters ${(posterBytes / 1024).toFixed(0)} KB`,
);

// ─── Gallery photos (served from public, not bundled at full resolution) ───────
const GALLERY_DIR = path.resolve(__dirname, "../public/gallery");
const ASSETS = path.resolve(__dirname, "../src/assets");
const GALLERY_W = 960;

const galleryImages = [
  { file: "hero-oxverse-student.jpg", alt: "hero" },
  { file: "promo-student-1.jpg", alt: "promo" },
  { file: "campus.jpg", alt: "campus" },
  { file: "students-group.jpg", alt: "students" },
  { file: "courses/frontend.jpg", alt: "frontend" },
  { file: "courses/ai.jpg", alt: "ai" },
  { file: "courses/uiux.jpg", alt: "uiux" },
  { file: "courses/data.jpg", alt: "data" },
];

fs.mkdirSync(GALLERY_DIR, { recursive: true });
let galleryBytes = 0;

for (const { file } of galleryImages) {
  const input = path.join(ASSETS, file);
  const outName = file.replace(/\//g, "-");
  const output = path.join(GALLERY_DIR, outName);
  if (!fs.existsSync(input)) {
    console.warn(`Skip gallery ${file}: not found`);
    continue;
  }
  execSync(
    `ffmpeg -y -i "${input}" -vf "scale=${GALLERY_W}:-2:flags=lanczos" -q:v 4 "${output}"`,
    { stdio: "pipe" },
  );
  galleryBytes += fs.statSync(output).size;
  console.log(`✓ gallery/${outName}`);
}

console.log(`Gallery photos → ${(galleryBytes / 1024).toFixed(0)} KB total (optimized for web)`);

