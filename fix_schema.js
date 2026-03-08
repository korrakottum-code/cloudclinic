const fs = require('fs');

const filesToFix = [
  'reviews/index.html',
  'about/index.html',
  'iv-drip-menu/index.html'
];

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all script tags with application/ld+json
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let matches;
  let breadcrumbBlocks = [];
  
  while ((matches = scriptRegex.exec(content)) !== null) {
    if (matches[1].includes('"@type": "BreadcrumbList"')) {
      breadcrumbBlocks.push(matches[0]);
    }
  }
  
  if (breadcrumbBlocks.length > 1) {
    // Keep the first one, remove the others
    for (let i = 1; i < breadcrumbBlocks.length; i++) {
      content = content.replace(breadcrumbBlocks[i], '');
    }
    
    // Clean up any extra blank lines left behind
    content = content.replace(/\n\s*\n\s*<\/head>/, '\n</head>');
    
    fs.writeFileSync(file, content);
    console.log(`Fixed duplicate schema in ${file}`);
  }
});
