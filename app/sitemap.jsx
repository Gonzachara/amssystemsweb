export default function sitemap() {
  const baseUrl = 'https://amssystems.com.ar'
  const currentDate = new Date()
  
  // Generate dynamic dates for better SEO
  const getLastModified = (daysAgo = 0) => {
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return date
  }

  return [
    // Main pages
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: getLastModified(7),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trabajos`,
      lastModified: getLastModified(3),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: getLastModified(30),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: getLastModified(14),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // English versions
    {
      url: `${baseUrl}/about`,
      lastModified: getLastModified(7),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: getLastModified(3),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: getLastModified(14),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: getLastModified(30),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // FAQ page
    {
      url: `${baseUrl}/faq`,
      lastModified: getLastModified(21),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Project case studies
    {
      url: `${baseUrl}/proyecto/revestimientos-don-andres`,
      lastModified: getLastModified(1),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/combracks`,
      lastModified: getLastModified(2),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/american-racks`,
      lastModified: getLastModified(3),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/romatea`,
      lastModified: getLastModified(4),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/match-point-courts`,
      lastModified: getLastModified(5),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/construcciones-secas`,
      lastModified: getLastModified(6),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/cyarq`,
      lastModified: getLastModified(7),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/real-premoldeados`,
      lastModified: getLastModified(8),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/estudio-torres`,
      lastModified: getLastModified(9),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: getLastModified(90),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: getLastModified(90),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: getLastModified(90),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ]
  }