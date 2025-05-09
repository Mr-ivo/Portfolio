import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request) {
  // Base URL of your website
  const baseUrl = process.env.SITE_URL || 'https://ebongng.site';
  
  // Define your static routes
  const staticPages = [
    '',
    '/projects',
    '/about',
    '/contact',
    '/resume',
    '/blog',
  ];

  // Create sitemap entries for static pages
  const staticFields = staticPages.map(path => ({
    loc: `${baseUrl}${path}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: path === '' ? 1.0 : 0.7, // Homepage gets highest priority
  }));

  // You can add dynamic routes here
  // For example, if you have blog posts or project pages with dynamic IDs:
  // const projects = await fetchProjectsFromDatabase();
  // const projectFields = projects.map(project => ({
  //   loc: `${baseUrl}/project/${project.id}`,
  //   lastmod: new Date(project.updatedAt).toISOString(),
  //   changefreq: 'weekly',
  //   priority: 0.8,
  // }));

  // Combine all fields
  const fields = [
    ...staticFields,
    // ...projectFields, // Uncomment when you implement dynamic routes
  ];

  // Return the sitemap
  return getServerSideSitemap(fields);
}

// This ensures Next.js doesn't try to statically optimize this route
export const dynamic = 'force-dynamic';
