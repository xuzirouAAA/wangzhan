import { defineConfig } from 'next-sitemap';

export default defineConfig({
  siteUrl: 'https://fasttikmp3.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*'],
});
