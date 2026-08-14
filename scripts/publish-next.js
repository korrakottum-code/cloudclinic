// Picks the next pending topic from the calendar and publishes it IF a pre-written,
// guardrail-ready draft already exists at content/drafts/<slug>.json. Does not write any
// content itself — intended to be run by a scheduled CI job with no AI access, consuming a
// queue of drafts written ahead of time (see content/BLOG-PLAYBOOK.md).
// Usage: node scripts/publish-next.js
// Prints one of: QUEUE_EMPTY | NO_READY_DRAFT: <slug> | PUBLISHED: <slug>

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const calendar = JSON.parse(readFileSync(join(projectRoot, 'content/blog-calendar.json'), 'utf-8'));
const next = calendar.topics.find((t) => t.status === 'pending');

if (!next) {
  console.log('QUEUE_EMPTY');
  process.exit(0);
}

const draftRelPath = `content/drafts/${next.slug}.json`;
if (!existsSync(join(projectRoot, draftRelPath))) {
  console.log(`NO_READY_DRAFT: ${next.slug}`);
  process.exit(0);
}

console.log(`Found ready draft for "${next.slug}", publishing...`);
execFileSync('node', ['scripts/publish-blog-post.js', draftRelPath], {
  cwd: projectRoot,
  stdio: 'inherit',
});

console.log(`PUBLISHED: ${next.slug}`);
