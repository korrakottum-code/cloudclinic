import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirsToCompress = [
    'public/images',
    'public/images/gallery',
    'public/images/drips',
];

const MAX_WIDTH = 1600;
const QUALITY = 80;

async function processDirectory(dirPath) {
    const absolutePath = path.resolve(dirPath);
    if (!fs.existsSync(absolutePath)) return;

    const files = fs.readdirSync(absolutePath);

    for (const file of files) {
        const filePath = path.join(absolutePath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) continue;

        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.JPG') {
            const webpPath = path.join(absolutePath, `${path.basename(file, path.extname(file))}.webp`);

            try {
                const image = sharp(filePath);
                const metadata = await image.metadata();

                let pipeline = image;

                if (metadata.width > MAX_WIDTH) {
                    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
                }

                pipeline = pipeline.webp({ quality: QUALITY });
                await pipeline.toFile(webpPath);

                console.log(`Converted: ${file} -> ${path.basename(webpPath)}`);
                // only remove original if it's not the icon, logo or og-cover might be needed?
                // actually og-cover is better as jpg for broad support.
                // let's leave og-cover.webp, logo.webp, favicon alone?
                if (!['og-cover.jpg', 'logo.jpg', 'apple-touch-icon-transparent.png'].includes(file)) {
                    fs.unlinkSync(filePath);
                }

            } catch (err) {
                console.error(`Error processing ${file}:`, err.message);
            }
        }
    }
}

function replaceInFiles(dir, exts, searchRegexes) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
            replaceInFiles(fullPath, exts, searchRegexes);
        } else if (exts.includes(path.extname(fullPath))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const rx of searchRegexes) {
                if (rx.test(content)) {
                    content = content.replace(rx, (match, p1) => {
                        // ignore og-cover.webp and logo.webp replacements
                        if (p1 === 'og-cover' || p1 === 'logo' || p1 === 'apple-touch-icon-transparent') return match;
                        return `${p1}.webp`;
                    });
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated references in: ${fullPath}`);
            }
        }
    }
}

async function main() {
    console.log('--- Starting WebP Conversion ---');
    for (const dir of dirsToCompress) {
        console.log(`\nProcessing directory: ${dir}`);
        await processDirectory(dir);
    }
    console.log('\n✅ Image conversion completed!');

    console.log('\n--- Updating HTML/CSS/JS files ---');
    const regexes = [
        /([^"'/]+?)\.webp/g,
        /([^"'/]+?)\.webp/g,
        /([^"'/]+?)\.webp/g,
        /([^"'/]+?)\.webp/g
    ];
    replaceInFiles('.', ['.html', '.css', '.js'], regexes);
    console.log('✅ File paths updated!');
}

main();
