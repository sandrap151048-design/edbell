import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://edbelledusolutions.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/courses',
    '/universities',
    '/services',
    '/blog',
    '/contact',
    '/login',
  ]

  // Course pages - These should be dynamic in production, but we remove the demo data as requested
  const coursePages: string[] = []

  // University pages - These should be dynamic in production, but we remove the demo data as requested
  const universityPages: string[] = []

  const allPages = [...staticPages, ...coursePages, ...universityPages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : page.includes('/courses/') || page.includes('/universities/') ? 'weekly' : 'monthly',
    priority: page === '' ? 1 : page === '/courses' || page === '/universities' ? 0.9 : page.includes('/courses/') || page.includes('/universities/') ? 0.8 : 0.7,
  }))
}