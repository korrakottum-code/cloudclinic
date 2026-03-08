import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirsToCompress = [
    'public/images',
    'public/images/gallery',
    'public/images/drips',
];

const MAX_WIDTH = 1600; // keep it a bit large for hero images
const QUALITY = 75; // good balance of size and quality

async function processDirectory(dirPath) {
    const absolutePath = path.resolve(dirPath);
    if (!fs.existsSync(absolutePath)) return;

    const files = fs.readdirSync(absolutePath);

    for (const file of files) {
        const filePath = path.join(absolutePath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) continue;

        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            const tempPath = path.join(absolutePath, `temp_${file}`);

            try {
                const image = sharp(filePath);
                const metadata = await image.metadata();

                let pipeline = image;

                if (metadata.width > MAX_WIDTH) {
                    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
                }

                if (ext === '.jpg' || ext === '.jpeg') {
                    pipeline = pipeline.webp({ quality: QUALITY, progressive: true });
                } else if (ext === '.png') {
                    pipeline = pipeline.webp({ quality: QUALITY, compressionLevel: 8 });
                }

                await pipeline.toFile(tempPath);

                const oldSize = stat.size;
                const newSize = fs.statSync(tempPath).size;

                if (newSize < oldSize) {
                    fs.renameSync(tempPath, filePath);
                    console.log(`Compressed: ${file} | ${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB`);
                } else {
                    fs.unlinkSync(tempPath);
                    console.log(`Skipped (no size reduction): ${file}`);
                }
            } catch (err) {
                console.error(`Error processing ${file}:`, err.message);
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            }
        }
    }
}

async function main() {
    console.log('--- Starting Image Compression ---');
    for (const dir of dirsToCompress) {
        console.log(`\nProcessing directory: ${dir}`);
        await processDirectory(dir);
    }
    console.log('\n✅ Image compression completed safely!');
}

main();
