import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const imgRegex = /<img\s([^>]+)>/gi;
    let modified = false;

    const matches = [...content.matchAll(imgRegex)];

    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];
        const imgTag = match[0];

        if (imgTag.includes('width=') || imgTag.includes('height=')) continue;

        const srcMatch = imgTag.match(/src="([^"]+)"/);
        if (!srcMatch) continue;

        let src = srcMatch[1];
        if (src.startsWith('http') || src.startsWith('data:')) continue;

        let localImagePath = src;
        if (src.startsWith('/')) {
            localImagePath = path.join('public', src);
        } else {
            localImagePath = path.join(path.dirname(filePath), src);
        }

        if (!fs.existsSync(localImagePath)) {
            console.warn(`File not found: ${localImagePath}`);
            continue;
        }

        try {
            const metadata = await sharp(localImagePath).metadata();
            if (metadata.width && metadata.height) {
                const newImgTag = imgTag.replace('<img ', `<img width="${metadata.width}" height="${metadata.height}" `);
                content = content.substring(0, match.index) + newImgTag + content.substring(match.index + imgTag.length);
                modified = true;
                console.log(`Added dims to ${src} in ${filePath}`);
            }
        } catch (err) {
            console.error(`Error processing ${localImagePath}: ${err.message}`);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

async function findHtml(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', 'dist', '.git'].includes(file)) {
                await findHtml(fullPath);
            }
        } else if (file.endsWith('.html')) {
            await processHtmlFile(fullPath);
        }
    }
}

findHtml('.').then(() => console.log('Done!'));
