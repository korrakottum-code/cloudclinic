import fs from 'fs';
import path from 'path';

function replaceInHtml(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !['node_modules', 'dist', '.git'].includes(file)) {
            replaceInHtml(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // async Google Fonts pattern
            const googleFontsRegex = /<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Sans\+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap"\s+rel="stylesheet">/g;
            const googleFontsRegex2 = /<link\s+rel="stylesheet"\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Sans\+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap">/g;

            const replacementFonts = `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap"></noscript>`;

            if (googleFontsRegex.test(content)) {
                content = content.replace(googleFontsRegex, replacementFonts);
                modified = true;
            } else if (googleFontsRegex2.test(content)) {
                content = content.replace(googleFontsRegex2, replacementFonts);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated fonts in: ${fullPath}`);
            }
        }
    }
}

replaceInHtml('.');
console.log('✅ HTML font tags updated!');
