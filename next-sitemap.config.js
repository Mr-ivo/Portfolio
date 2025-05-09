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
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => {
    const result = [];
    
    // Add your portfolio sections/pages here
    const routes = [
      '/about',
      '/projects',
      '/skills',
      '/experience',
      '/contact'
    ];
    
    for (const route of routes) {
      result.push({
        loc: route,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      });
    }
    
    return result;
  },
};
