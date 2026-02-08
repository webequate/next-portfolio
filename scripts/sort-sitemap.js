#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const sitemapPath = path.join(__dirname, "../public/sitemap-0.xml");

function sortSitemap() {
  try {
    let xmlData = fs.readFileSync(sitemapPath, "utf8");

    // Extract all <url> entries
    const urlRegex = /<url>([\s\S]*?)<\/url>/g;
    let match;
    const urlMap = new Map();

    while ((match = urlRegex.exec(xmlData)) !== null) {
      const urlEntry = match[0];
      const locMatch = urlEntry.match(/<loc>(.*?)<\/loc>/);
      if (locMatch) {
        const loc = locMatch[1];
        // Keep only one copy of each URL
        urlMap.set(loc, urlEntry);
      }
    }

    // Sort by full URL
    const sortedUrls = Array.from(urlMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
      .map(([_, entry]) => entry);

    // Rebuild XML
    const header = xmlData.match(/^[\s\S]*?(?=<url>)/)[0];
    const footer = "\n</urlset>";

    const sortedXml = header + sortedUrls.join("\n") + footer;
    fs.writeFileSync(sitemapPath, sortedXml, "utf8");

    console.log("✓ Sitemap sorted and deduplicated successfully");
  } catch (error) {
    console.error("Error sorting sitemap:", error);
    process.exit(1);
  }
}

sortSitemap();
