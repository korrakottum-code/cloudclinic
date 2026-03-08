import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const filesToResize = [
    'public/images/clinic-map.webp',
    ...fs.readdirSync('public/images').filter(f => f.startsWith('knowledge-') && f.endsWith('.webp')).map(f => `public/images/${f}`),
    ...fs.readdirSync('public/images/drips').filter(f => f.endsWith('.webp')).map(f => `public/images/drips/${f}`)
];

async function main() {
    for (const file of filesToResize) {
        if (!fs.existsSync(file)) continue;

        const tempFile = file.replace('.webp', '-temp.webp');

        try {
            const metadata = await sharp(file).metadata();
            if (metadata.width > 800) {
                await sharp(file)
                    .resize(800, null, { withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(tempFile);

                fs.renameSync(tempFile, file);
                console.log(`Resized ${file} to 800px width.`);
            }
        } catch (e) {
            console.error(`Error with ${file}:`, e);
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        }
    }
}

main();
