const fs = require('fs');
const path = require('path');

// Regex to flexibly catch common emojis used in the previous design
const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F200}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{3297}\u{3299}\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}]+(?=\s|)/gu;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        if (filePath.includes('node_modules') || filePath.includes('.git')) return;
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = walk(__dirname);
let updatedFiles = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // We only want to remove emojis from visible text nodes, buttons, headers.
    // For simplicity, we are stripping emojis globally from the HTML for specific offending ones used in headers/cards.

    // Specific targeted removals to avoid breaking attributes or meta tags 
    const specificTargets = [
        "☁️", "👇", "💬", "🎁", "🔥", "✨", "⏱️", "🛋️", "🍰", "🛡️", "💧", "🤔", "👉", "👑", "🏆", "👨‍⚕️", "✅", "⭐", "📚", "📍", "💆‍♀️"
    ];

    specificTargets.forEach(emoji => {
        // Replace emoji optionally followed by a space
        const regex = new RegExp(emoji + '\\s?', 'g');
        content = content.replace(regex, '');
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        updatedFiles++;
    }
});

console.log(`Removed emojis from ${updatedFiles} HTML files.`);
