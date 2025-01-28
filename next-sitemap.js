module.exports = {
  siteUrl: process.env.SITE_URL || "https://code4code.dev",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7, // Optional, priority for pages
  sitemapSize: 7000, // Optional, split sitemaps if you have too many pages
  exclude: ["/admin/**", "/private/**"], // Optional, exclude any pages
};
