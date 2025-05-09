/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ebongng.site', 
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/server-sitemap.xml'], 
  generateIndexSitemap: false,
  outDir: 'public',
  // Add any additional configuration options here
  changefreq: 'weekly',
  priority: 0.7,
};
