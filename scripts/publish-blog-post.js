// Publishes a validated draft blog article: writes the article page, wires it into both
// index pages and the sitemap, and marks the calendar entry done.
// Usage: node scripts/publish-blog-post.js content/drafts/<slug>.json
// Refuses to write anything if scripts/check-blog-guardrails.js does not pass first.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import { IV_DRIPS } from '../src/js/components.js';
import { renderArticleHTML } from './lib/blog-article-template.js';
import { renderBlogCard } from './lib/blog-card-template.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const DRIP_BY_ID = Object.fromEntries([...IV_DRIPS.standard, ...IV_DRIPS.premium].map((d) => [d.id, d]));
const CATEGORY_EMOJI = { 'skin-tips': '✨', 'health-guide': '🌿', 'drip-knowledge': '💧' };

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

function thaiDate(d) {
  return `${d.getDate()} ${THAI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function excerptFrom(highlightBox, maxLen = 130) {
  const plain = highlightBox.replace(/<[^>]+>/g, '');
  return plain.length > maxLen ? plain.slice(0, maxLen - 1).trimEnd() + '…' : plain;
}

function insertCardIntoGrid(filePath, cardHtml) {
  const html = readFileSync(filePath, 'utf-8');
  const marker = '<div class="blog-grid">';
  const idx = html.indexOf(marker);
  if (idx === -1) throw new Error(`Could not find "${marker}" in ${filePath}`);
  const insertAt = idx + marker.length;
  const updated = html.slice(0, insertAt) + '\n' + cardHtml + html.slice(insertAt);
  writeFileSync(filePath, updated);
}

function toPascalCase(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function insertViteInputEntry(category, slug) {
  const viteConfigPath = join(projectRoot, 'vite.config.js');
  const src = readFileSync(viteConfigPath, 'utf-8');
  const relPath = `blog/${category}/${slug}/index.html`;
  if (src.includes(`'${relPath}'`)) {
    console.log('vite.config.js already has this entry, skipping insert');
    return;
  }
  const key = `blog${toPascalCase(slug)}`;
  const newLine = `        ${key}: resolve(__dirname, '${relPath}'),\n`;
  // Anchor on the closing of rollupOptions.input, right before "server: {" — the file's
  // structure keeps `input: {...} }, },` followed by the dev-server block.
  const anchor = '      },\n    },\n  },\n  server:';
  if (!src.includes(anchor)) {
    throw new Error('Could not find expected vite.config.js structure to insert build entry — update it manually.');
  }
  const updated = src.replace(anchor, `${newLine}      },\n    },\n  },\n  server:`);
  writeFileSync(viteConfigPath, updated);
}

function insertSitemapEntry(loc, publishDate) {
  const sitemapPath = join(projectRoot, 'public/sitemap.xml');
  const xml = readFileSync(sitemapPath, 'utf-8');
  if (xml.includes(`<loc>${loc}</loc>`)) {
    console.log(`sitemap.xml already has ${loc}, skipping insert`);
    return;
  }
  const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${publishDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  const closeTag = '</urlset>';
  const updated = xml.replace(closeTag, entry + closeTag);
  writeFileSync(sitemapPath, updated);
}

function pickRelated(calendar, draft) {
  const published = calendar.topics.filter((t) => t.status === 'published' && t.slug !== draft.slug);
  const sameCategory = published.filter((t) => t.category === draft.category);
  const otherCategory = published.filter((t) => t.category !== draft.category);
  const picked = [...sameCategory, ...otherCategory].slice(0, 2);
  return picked.map((t) => ({
    href: `/blog/${t.category}/${t.slug}/`,
    emoji: CATEGORY_EMOJI[t.category] || '📄',
    categoryLabel: calendar.categories[t.category]?.label || t.category,
    title: t.title,
  }));
}

function main() {
  const draftPath = process.argv[2];
  if (!draftPath) {
    console.error('Usage: node scripts/publish-blog-post.js <path-to-draft.json>');
    process.exit(1);
  }

  console.log('Running guardrail check...');
  try {
    execFileSync('node', ['scripts/check-blog-guardrails.js', draftPath], {
      cwd: projectRoot,
      stdio: 'inherit',
    });
  } catch {
    console.error('\nGuardrails failed — nothing was published.');
    process.exit(1);
  }

  const fullDraftPath = join(projectRoot, draftPath.replace(/^\.\//, ''));
  const draft = JSON.parse(readFileSync(fullDraftPath, 'utf-8'));
  const calendarPath = join(projectRoot, 'content/blog-calendar.json');
  const calendar = JSON.parse(readFileSync(calendarPath, 'utf-8'));

  const categoryMeta = calendar.categories[draft.category];
  const drip = DRIP_BY_ID[draft.relatedDripId];
  const related = pickRelated(calendar, draft);
  const now = new Date();
  const publishDate = isoDate(now);
  const publishDateThai = thaiDate(now);

  // --- Write article page ---
  const articleDir = join(projectRoot, 'blog', draft.category, draft.slug);
  mkdirSync(articleDir, { recursive: true });
  const html = renderArticleHTML(draft, { categoryMeta, drip, related, publishDate, publishDateThai });
  writeFileSync(join(articleDir, 'index.html'), html);
  console.log(`Wrote blog/${draft.category}/${draft.slug}/index.html`);

  // --- Insert card into category index + main blog index ---
  const cardEntry = {
    href: `/blog/${draft.category}/${draft.slug}/`,
    image: drip.image.startsWith('/') ? drip.image : `/${drip.image}`,
    title: draft.title,
    excerpt: excerptFrom(draft.highlightBox),
    categoryLabel: categoryMeta.label,
    readTime: draft.readTime,
  };

  const categoryIndexPath = join(projectRoot, 'blog', draft.category, 'index.html');
  insertCardIntoGrid(categoryIndexPath, renderBlogCard(cardEntry, { titleTag: 'div' }));
  console.log(`Updated blog/${draft.category}/index.html`);

  const mainIndexPath = join(projectRoot, 'blog', 'index.html');
  insertCardIntoGrid(mainIndexPath, renderBlogCard(cardEntry, { titleTag: 'h2' }));
  console.log('Updated blog/index.html');

  // --- Sitemap ---
  insertSitemapEntry(`https://cloudclinicth.com/blog/${draft.category}/${draft.slug}/`, publishDate);
  console.log('Updated public/sitemap.xml');

  // --- Vite build entry (production build drops unlisted pages otherwise) ---
  insertViteInputEntry(draft.category, draft.slug);
  console.log('Updated vite.config.js build entry');

  // --- Mark calendar entry published ---
  const entry = calendar.topics.find((t) => t.slug === draft.slug);
  entry.status = 'published';
  entry.publishedDate = publishDate;
  writeFileSync(calendarPath, JSON.stringify(calendar, null, 2) + '\n');
  console.log('Marked calendar entry as published');

  console.log(`\nDone. Article live at /blog/${draft.category}/${draft.slug}/ (after build+deploy).`);
}

main();
