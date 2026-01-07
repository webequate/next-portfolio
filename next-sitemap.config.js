// next-sitemap.config.js
module.exports = {
  siteUrl: "https://webequate.com",
  exclude: ["/featured", "/featured/**", "/testimonials"],
  generateRobotsTxt: true,
  changefreq: undefined,
  priority: undefined,
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    return result;
  },
  sortEntries: true,
};
