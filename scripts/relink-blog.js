// Rebuilds the internal link graph between blog articles, drip detail pages and the homepage.
// Idempotent — safe to re-run any time (publish-blog-post.js runs it after every publish).
// Usage: node scripts/relink-blog.js
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { scanArticles, buildRelatedMap, articlesForDrip, renderCards, escapeHtml } from './lib/related.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultRoot = join(__dirname, '..');

// Homepage knowledge cards (image filename -> article slug) and the featured list under them.
const HOME_CARD_LINKS = {
  'knowledge-drip-basics.webp': 'what-is-iv-drip',
  'knowledge-drip-suitable.webp': 'who-should-do-iv-drip',
  'knowledge-drip-signs.webp': 'work-stress-signals',
  'knowledge-drip-vs-cream.webp': 'iv-vs-oral-vitamins',
  'knowledge-vitamin-benefits.webp': 'vitamin-guide',
  'knowledge-drip-safety.webp': 'safety-tips',
};
const HOME_FEATURED = [
  'iv-drip-pain-duration',
  'first-time-iv-drip-prep',
  'choosing-safe-iv-clinic',
  'standard-vs-premium-drip',
  'iv-drip-ingredients-explained',
  'glutathione-explained',
];

function eolOf(text) {
  return text.includes('\r\n') ? '\r\n' : '\n';
}
function withEol(text, eol) {
  return eol === '\n' ? text : text.replace(/\n/g, eol);
}
function write(file, before, after) {
  if (before === after) return false;
  writeFileSync(file, after);
  return true;
}

function relinkArticles(articles, categories) {
  const related = buildRelatedMap(articles, 3);
  const re = /(<div class="related-articles">)([\s\S]*?)(\r?\n[ \t]*<\/div>(?:\s*<\/div>){2}\s*<\/article>)/;
  let changed = 0;
  for (const a of articles) {
    const html = readFileSync(a.file, 'utf-8');
    if (!re.test(html)) {
      console.warn(`! no related block in blog/${a.category}/${a.slug}/ — skipped`);
      continue;
    }
    const eol = eolOf(html);
    const cards = withEol('\n' + renderCards(related[a.slug], categories), eol);
    const next = html.replace(re, (_, open, _old, close) => open + cards + close);
    if (write(a.file, html, next)) changed++;
  }
  return changed;
}

function relinkDripPages(root, articles, categories) {
  const dir = join(root, 'iv-drip');
  const anchor = /([ \t]*)<section class="section">(\s*)<div class="container">(\s*)<div class="cta-banner/;
  const marked = /[ \t]*<!-- ARTICLES:START -->[\s\S]*?<!-- ARTICLES:END -->(\r?\n)?/;
  let changed = 0;
  for (const id of readdirSync(dir)) {
    const file = join(dir, id, 'index.html');
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf-8');
    const eol = eolOf(html);
    const picks = articlesForDrip(articles, id, 4);
    const block = withEol(
      [
        '  <!-- ARTICLES:START -->',
        '  <section class="section">',
        '    <div class="container">',
        '      <h2 class="section-title" style="font-size:var(--text-2xl);">บทความที่น่าอ่านก่อนตัดสินใจ</h2>',
        '      <div class="related-articles">',
        renderCards(picks, categories, '        '),
        '      </div>',
        '    </div>',
        '  </section>',
        '  <!-- ARTICLES:END -->',
        '',
      ].join('\n'),
      eol
    );
    let next;
    if (marked.test(html)) next = html.replace(marked, () => block);
    else if (anchor.test(html)) next = html.replace(anchor, (m) => block + m);
    else {
      console.warn(`! no CTA anchor in iv-drip/${id}/ — skipped`);
      continue;
    }
    if (write(file, html, next)) changed++;
  }
  return changed;
}

function relinkHomepage(root, articles, categories) {
  const file = join(root, 'index.html');
  const html = readFileSync(file, 'utf-8');
  const eol = eolOf(html);
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
  let next = html;

  // 1) Make the knowledge-card images clickable.
  for (const [img, slug] of Object.entries(HOME_CARD_LINKS)) {
    const a = bySlug[slug];
    if (!a) continue;
    const re = new RegExp(`(<div class="knowledge-card[^"]*">\\s*)(<img [^>]*${img.replace('.', '\\.')}[^>]*>)(\\s*</div>)`);
    next = next.replace(re, (m, open, imgTag, close) => {
      if (m.includes('<a ')) return m;
      return `${open}<a href="/blog/${a.category}/${a.slug}/" aria-label="${escapeHtml(a.title)}">${imgTag}</a>${close}`;
    });
  }

  // 2) Featured article list + category hubs under the grid.
  const featured = HOME_FEATURED.map((s) => bySlug[s]).filter(Boolean);
  const block = withEol(
    [
      '        <!-- HOME-ARTICLES:START -->',
      '        <div class="home-articles">',
      '          <h3 class="home-articles__title">บทความแนะนำ</h3>',
      '          <div class="related-articles">',
      renderCards(featured, categories, '            '),
      '          </div>',
      '          <p class="home-articles__more">',
      ...Object.entries(categories).map(([k, c]) => `            <a href="${c.path}">${c.label}</a>`),
      '            <a href="/blog/" class="btn btn--outline btn--sm">ดูบทความทั้งหมด</a>',
      '          </p>',
      '        </div>',
      '        <!-- HOME-ARTICLES:END -->',
      '',
    ].join('\n'),
    eol
  );
  const marked = /[ \t]*<!-- HOME-ARTICLES:START -->[\s\S]*?<!-- HOME-ARTICLES:END -->(\r?\n)?/;
  const gridEnd = /(<div class="knowledge-grid">[\s\S]*?<\/div>\s*<\/div>\s*)(<\/div>\s*<\/section>\s*<!-- First Visit Steps -->)/;
  if (marked.test(next)) next = next.replace(marked, () => block);
  else if (gridEnd.test(next)) next = next.replace(gridEnd, (m, grid, rest) => grid + block + '      ' + rest);
  else console.warn('! homepage knowledge section anchor not found — featured list skipped');

  return write(file, html, next) ? 1 : 0;
}

export function relinkAll(root = defaultRoot) {
  const { articles, categories } = scanArticles(root);
  const a = relinkArticles(articles, categories);
  const d = relinkDripPages(root, articles, categories);
  const h = relinkHomepage(root, articles, categories);
  console.log(`relink: ${articles.length} articles scanned — ${a} article pages, ${d} drip pages, ${h} homepage updated`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) relinkAll();
