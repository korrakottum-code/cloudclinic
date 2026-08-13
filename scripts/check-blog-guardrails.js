// Guardrail lint for a draft blog article before it's allowed to publish.
// Usage: node scripts/check-blog-guardrails.js content/drafts/<slug>.json
// Exits 0 and prints "PASS" if clean. Exits 1 and prints every reason otherwise.
// See content/BLOG-PLAYBOOK.md for the rules this enforces.

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { IV_DRIPS } from '../src/js/components.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const ALL_DRIP_IDS = [...IV_DRIPS.standard, ...IV_DRIPS.premium].map((d) => d.id);
const DRIP_BY_ID = Object.fromEntries(
  [...IV_DRIPS.standard, ...IV_DRIPS.premium].map((d) => [d.id, d])
);

// Absolute/unverifiable claim phrases banned in clinic advertising copy.
// Keep this in sync with the "Non-negotiable compliance rules" in content/BLOG-PLAYBOOK.md.
const BLOCKLIST = [
  'หายขาด',
  'รักษาให้หาย',
  'รักษาหาย 100%',
  'ปลอดภัย 100%',
  'ปลอดภัยร้อยเปอร์เซ็นต์',
  'ไม่มีผลข้างเคียง',
  'ดีที่สุดในขอนแก่น',
  'ดีที่สุดในโลก',
  'อันดับ 1',
  'อันดับหนึ่ง',
  'เบอร์ 1',
  'รับประกันผล',
  'การันตีผลลัพธ์',
  'การันตี 100%',
  'เห็นผลทันที 100%',
  'ผลลัพธ์ 100%',
];

const CONSULT_MARKERS = ['ปรึกษาแพทย์', 'ปรึกษาผู้เชี่ยวชาญ', 'ปรึกษาแอดมิน', 'ปรึกษาทีมแพทย์'];

function fail(reasons, msg) {
  reasons.push(msg);
}

function collectText(draft) {
  const parts = [
    draft.title,
    draft.metaDescription,
    draft.ogTitle,
    draft.ogDescription,
    draft.heroTitle,
    draft.highlightBox,
    draft.ctaTitle,
    draft.ctaSubtitle,
  ];
  for (const section of draft.sections || []) {
    if (section.heading) parts.push(section.heading);
    if (section.paragraphs) parts.push(...section.paragraphs);
    if (section.list) parts.push(...section.list);
  }
  return parts.filter(Boolean).join('\n');
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, '');
}

function main() {
  const draftPath = process.argv[2];
  const reasons = [];

  if (!draftPath) {
    console.error('Usage: node scripts/check-blog-guardrails.js <path-to-draft.json>');
    process.exit(1);
  }
  const fullDraftPath = join(projectRoot, draftPath.replace(/^\.\//, ''));
  if (!existsSync(fullDraftPath)) {
    console.error(`Draft not found: ${draftPath}`);
    process.exit(1);
  }

  let draft;
  try {
    draft = JSON.parse(readFileSync(fullDraftPath, 'utf-8'));
  } catch (e) {
    console.error(`Draft is not valid JSON: ${e.message}`);
    process.exit(1);
  }

  const calendar = JSON.parse(readFileSync(join(projectRoot, 'content/blog-calendar.json'), 'utf-8'));
  const categoryKeys = Object.keys(calendar.categories);

  // --- Required fields ---
  const required = [
    'slug', 'category', 'title', 'metaDescription', 'metaKeywords', 'ogTitle',
    'ogDescription', 'heroTitle', 'readTime', 'highlightBox', 'sections',
    'relatedDripId', 'ctaTitle', 'ctaSubtitle',
  ];
  for (const field of required) {
    if (draft[field] === undefined || draft[field] === null || draft[field] === '') {
      fail(reasons, `Missing required field: ${field}`);
    }
  }
  if (reasons.length) {
    printAndExit(reasons);
    return;
  }

  // --- Category / calendar consistency ---
  if (!categoryKeys.includes(draft.category)) {
    fail(reasons, `Unknown category "${draft.category}". Must be one of: ${categoryKeys.join(', ')}`);
  }
  const slugCount = calendar.topics.filter((t) => t.slug === draft.slug).length;
  if (slugCount > 1) {
    fail(reasons, `slug "${draft.slug}" appears ${slugCount} times in content/blog-calendar.json — must be unique`);
  }
  const calendarEntry = calendar.topics.find((t) => t.slug === draft.slug);
  if (!calendarEntry) {
    fail(reasons, `slug "${draft.slug}" not found in content/blog-calendar.json`);
  } else {
    if (calendarEntry.status === 'published') {
      fail(reasons, `slug "${draft.slug}" is already marked published in the calendar — duplicate content`);
    }
    if (calendarEntry.category !== draft.category) {
      fail(reasons, `category mismatch: draft says "${draft.category}", calendar says "${calendarEntry.category}"`);
    }
  }

  // --- Existing file collision (belt-and-suspenders dedupe) ---
  const targetDir = join(projectRoot, 'blog', draft.category, draft.slug);
  if (existsSync(targetDir)) {
    fail(reasons, `Target directory already exists: blog/${draft.category}/${draft.slug}/`);
  }

  // --- Length limits ---
  if (draft.title && draft.title.length > 60) {
    fail(reasons, `Title too long (${draft.title.length}/60 chars): "${draft.title}"`);
  }
  if (draft.metaDescription && draft.metaDescription.length > 155) {
    fail(reasons, `Meta description too long (${draft.metaDescription.length}/155 chars)`);
  }

  // --- Structure ---
  if (!Array.isArray(draft.sections) || draft.sections.length < 3) {
    fail(reasons, `Need at least 3 sections, got ${draft.sections?.length ?? 0}`);
  } else {
    draft.sections.forEach((s, i) => {
      if (!s.heading) fail(reasons, `sections[${i}] missing heading`);
      if (!(s.paragraphs?.length || s.list?.length)) {
        fail(reasons, `sections[${i}] ("${s.heading}") has no paragraphs or list content`);
      }
    });
  }

  // --- Related drip must exist ---
  if (draft.relatedDripId && !ALL_DRIP_IDS.includes(draft.relatedDripId)) {
    fail(reasons, `relatedDripId "${draft.relatedDripId}" not found in IV_DRIPS (src/js/components.js)`);
  }

  // --- Body length (character count as proxy — Thai isn't space-delimited) ---
  const bodyText = stripTags(collectText(draft));
  const MIN_CHARS = 1000;
  if (bodyText.length < MIN_CHARS) {
    fail(reasons, `Body too thin: ${bodyText.length} chars, need at least ${MIN_CHARS}`);
  }

  // --- Compliance blocklist ---
  for (const phrase of BLOCKLIST) {
    if (bodyText.includes(phrase)) {
      fail(reasons, `Contains banned claim phrase: "${phrase}" — see BLOG-PLAYBOOK.md compliance rules`);
    }
  }

  // --- Safety-out: must point reader to a professional somewhere ---
  const hasConsultMarker = CONSULT_MARKERS.some((m) => bodyText.includes(m));
  if (!hasConsultMarker) {
    fail(reasons, `No "consult a professional" line found — every health-adjacent article needs one (see BLOG-PLAYBOOK.md)`);
  }

  // --- Price sanity check: any "X,XXX.-" pattern must match a real IV_DRIPS price ---
  const knownPriceTexts = new Set(
    [...IV_DRIPS.standard, ...IV_DRIPS.premium].map((d) => d.priceText)
  );
  const priceMatches = bodyText.match(/[\d,]+\.-/g) || [];
  for (const p of priceMatches) {
    if (!knownPriceTexts.has(p)) {
      fail(reasons, `Price "${p}" doesn't match any current price in src/js/components.js — could be stale/hallucinated`);
    }
  }

  printAndExit(reasons);
}

function printAndExit(reasons) {
  if (reasons.length) {
    console.error(`FAIL — ${reasons.length} issue(s):\n`);
    reasons.forEach((r, i) => console.error(`  ${i + 1}. ${r}`));
    process.exit(1);
  } else {
    console.log('PASS');
    process.exit(0);
  }
}

main();
