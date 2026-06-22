/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://fasttikmp3.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/_next/*", "/public/*"],
};
