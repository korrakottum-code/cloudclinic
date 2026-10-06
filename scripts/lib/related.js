// Internal-linking helpers shared by publish-blog-post.js and relink-blog.js.
// Builds the article link graph from the pages on disk + content/blog-calendar.json.
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

export const CATEGORY_EMOJI = { 'skin-tips': '✨', 'health-guide': '🌿', 'drip-knowledge': '💧' };

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function loadCalendar(projectRoot) {
  return JSON.parse(readFileSync(join(projectRoot, 'content/blog-calendar.json'), 'utf-8'));
}

/** Every published article page on disk: { slug, category, file, dripId, title, date } */
export function scanArticles(projectRoot) {
  const calendar = loadCalendar(projectRoot);
  const topics = Object.fromEntries(calendar.topics.map((t) => [t.slug, t]));
  const blogDir = join(projectRoot, 'blog');
  const articles = [];
  for (const category of readdirSync(blogDir)) {
    const catDir = join(blogDir, category);
    if (!statSync(catDir).isDirectory()) continue;
    for (const slug of readdirSync(catDir)) {
      const file = join(catDir, slug, 'index.html');
      if (!existsSync(file)) continue;
      const html = readFileSync(file, 'utf-8');
      const drip = html.match(/href="\/iv-drip\/([a-z0-9-]+)\/"/);
      const topic = topics[slug];
      const rawTitle = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? slug;
      articles.push({
        slug,
        category,
        file,
        dripId: drip ? drip[1] : null,
        title: topic?.title || rawTitle.replace(/\s*\|.*$/, ''),
        date: topic?.publishedDate || '',
      });
    }
  }
  return { articles, categories: calendar.categories };
}

/**
 * slug -> up to `count` related articles. Same drip + same category score highest; a penalty on
 * already-linked articles spreads inbound links evenly instead of piling onto the oldest pages.
 */
export function buildRelatedMap(articles, count = 3) {
  const inbound = Object.fromEntries(articles.map((a) => [a.slug, 0]));
  const order = [...articles].sort((a, b) => hash(a.slug) - hash(b.slug));
  const map = {};
  for (const a of order) {
    const scored = articles
      .filter((b) => b.slug !== a.slug)
      .map((b) => ({
        b,
        score:
          (a.dripId && a.dripId === b.dripId ? 4 : 0) +
          (a.category === b.category ? 3 : 0) -
          0.8 * inbound[b.slug] +
          (hash(a.slug + b.slug) % 100) / 1000,
      }))
      .sort((x, y) => y.score - x.score)
      .slice(0, count)
      .map((x) => x.b);
    scored.forEach((b) => (inbound[b.slug] += 1));
    map[a.slug] = scored;
  }
  return map;
}

/** Articles to show on a drip detail page: matching drip first, evergreen guides as fallback. */
export function articlesForDrip(articles, dripId, count = 4) {
  const evergreen = ['what-is-iv-drip', 'vitamin-guide', 'safety-tips', 'first-time-iv-drip-prep'];
  const matching = articles
    .filter((a) => a.dripId === dripId)
    .sort((a, b) => hash(dripId + a.slug) - hash(dripId + b.slug));
  const picked = matching.slice(0, count);
  for (const slug of evergreen) {
    if (picked.length >= count) break;
    const a = articles.find((x) => x.slug === slug);
    if (a && !picked.includes(a)) picked.push(a);
  }
  return picked;
}

export function renderCards(items, categories, indent = '            ') {
  return items
    .map((a) => {
      const label = categories[a.category]?.label || a.category;
      return [
        `${indent}<a href="/blog/${a.category}/${a.slug}/" class="related-card">`,
        `${indent}  <span class="related-card__emoji">${CATEGORY_EMOJI[a.category] || '📄'}</span>`,
        `${indent}  <div>`,
        `${indent}    <div class="related-card__cat">${label}</div>`,
        `${indent}    <div class="related-card__title">${escapeHtml(a.title)}</div>`,
        `${indent}  </div>`,
        `${indent}</a>`,
      ].join('\n');
    })
    .join('\n');
}
