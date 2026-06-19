/**
 * Export WebVTT caption files from Remotion subtitle data in 0xverse/remotion.
 * Run: node scripts/export-captions.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REMOTION_SRC = path.resolve(__dirname, "../../0xverse/remotion/src");
const OUT_DIR = path.resolve(__dirname, "../public/videos/captions");
const FPS = 30;

/** @type {{ slug: string; file: string; block?: number }[]} */
const SOURCES = [
  { slug: "frontend-explainer", file: "FrontendExplainer.tsx" },
  { slug: "data-explainer", file: "DataAnalyticsExplainer.tsx" },
  { slug: "marketing-explainer", file: "DigitalMarketingExplainer.tsx" },
  { slug: "fullstack-explainer", file: "FullStackExplainer.tsx" },
  { slug: "uiux-explainer", file: "UIUXExplainer.tsx" },
  { slug: "web3-explainer", file: "Web3Explainer.tsx" },
  { slug: "graphics-explainer", file: "GraphicsExplainer.tsx" },
  { slug: "mktalgos-explainer", file: "MktAlgosExplainer.tsx" },
  { slug: "web3-devrel", file: "terms/web3Terms.tsx", block: 0 },
  { slug: "web3-smart-contract", file: "terms/web3Terms.tsx", block: 1 },
  { slug: "web3-gas-fee", file: "terms/web3Terms.tsx", block: 2 },
  { slug: "fullstack-api", file: "terms/fullstackTerms.tsx", block: 0 },
  { slug: "fullstack-frontend-backend", file: "terms/fullstackTerms.tsx", block: 1 },
  { slug: "fullstack-github", file: "terms/fullstackTerms.tsx", block: 2 },
  { slug: "uiux-ui-vs-ux", file: "terms/uiuxTerms.tsx", block: 0 },
  { slug: "uiux-ux-friction", file: "terms/uiuxTerms.tsx", block: 1 },
  { slug: "uiux-micro-interactions", file: "terms/uiuxTerms.tsx", block: 2 },
  { slug: "graphics-branding-logo", file: "terms/graphicsTerms.tsx", block: 0 },
  { slug: "graphics-visual-hierarchy", file: "terms/graphicsTerms.tsx", block: 1 },
  { slug: "graphics-typography", file: "terms/graphicsTerms.tsx", block: 2 },
  { slug: "mkt-seo", file: "terms/marketingTerms.tsx", block: 0 },
  { slug: "mkt-watch-time", file: "terms/marketingTerms.tsx", block: 1 },
  { slug: "mkt-funnel", file: "terms/marketingTerms.tsx", block: 2 },
  { slug: "web3-ai-changed", file: "aichanged/web3AiChanged.tsx", block: 0 },
];

function framesToVttTime(frames) {
  const sec = frames / FPS;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const ms = Math.round((s % 1) * 1000);
  const whole = Math.floor(s);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(whole).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

/** @param {string} content */
function extractSubtitleBlocks(content) {
  const blocks = [];
  const re = /subtitles:\s*\[/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    while (i < content.length && depth > 0) {
      if (content[i] === "[") depth++;
      if (content[i] === "]") depth--;
      i++;
    }
    blocks.push(content.slice(start, i - 1));
  }
  return blocks;
}

/** @param {string} block */
function parseSubtitleLines(block) {
  /** @type {{ text: string; from: number; to: number }[]} */
  const subs = [];
  const textFirst =
    /\{\s*text:\s*"((?:\\.|[^"\\])*)"\s*,\s*from:\s*(\d+)\s*,\s*to:\s*(\d+)/g;
  const framesFirst =
    /\{\s*from:\s*(\d+)\s*,\s*to:\s*(\d+)\s*,\s*text:\s*"((?:\\.|[^"\\])*)"/g;

  let m;
  while ((m = textFirst.exec(block)) !== null) {
    subs.push({
      text: m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n"),
      from: Number(m[2]),
      to: Number(m[3]),
    });
  }
  if (subs.length === 0) {
    while ((m = framesFirst.exec(block)) !== null) {
      subs.push({
        text: m[3].replace(/\\"/g, '"').replace(/\\n/g, "\n"),
        from: Number(m[1]),
        to: Number(m[2]),
      });
    }
  }
  return subs.sort((a, b) => a.from - b.from);
}

/** @param {{ text: string; from: number; to: number }[]} subs */
function toVtt(subs) {
  if (subs.length === 0) return null;
  let vtt = "WEBVTT\n\n";
  subs.forEach((sub, i) => {
    vtt += `${i + 1}\n`;
    vtt += `${framesToVttTime(sub.from)} --> ${framesToVttTime(sub.to)}\n`;
    vtt += `${sub.text.trim()}\n\n`;
  });
  return vtt;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

/** @type {string[]} */
const exported = [];

for (const { slug, file, block } of SOURCES) {
  const srcPath = path.join(REMOTION_SRC, file);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skip ${slug}: missing ${file}`);
    continue;
  }
  const content = fs.readFileSync(srcPath, "utf8");
  let blockText;
  if (block !== undefined) {
    const blocks = extractSubtitleBlocks(content);
    blockText = blocks[block];
    if (!blockText) {
      console.warn(`Skip ${slug}: block ${block} not found in ${file}`);
      continue;
    }
  } else {
    const subsMatch = content.match(/const SUBS[^=]*=\s*\[([\s\S]*?)\];/);
    blockText = subsMatch ? subsMatch[1] : content;
  }

  const subs = parseSubtitleLines(blockText);
  const vtt = toVtt(subs);
  if (!vtt) {
    console.warn(`Skip ${slug}: no subtitles parsed`);
    continue;
  }

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.vtt`), vtt, "utf8");
  exported.push(slug);
  console.log(`✓ ${slug}.vtt (${subs.length} cues)`);
}

const slugsPath = path.resolve(__dirname, "../src/lib/captionSlugs.json");
fs.writeFileSync(slugsPath, JSON.stringify(exported, null, 2) + "\n");
console.log(`\nExported ${exported.length} caption files.`);
