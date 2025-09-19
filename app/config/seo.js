export const seoConfig = {
  // Site Information
  siteName: "AMS Systems",
  siteUrl: "https://amssystems.com.ar",
  siteDescription: "AMS Systems es una agencia especializada en desarrollo web, diseño digital y soluciones tecnológicas innovadoras. Creamos experiencias digitales únicas que conectan tu marca con el mundo digital.",
  
  // Default Meta Tags
  defaultTitle: "AMS Systems - Desarrollo Digital y Soluciones Tecnológicas",
  defaultDescription: "Desarrollo web profesional, diseño digital y soluciones tecnológicas innovadoras. Transformamos ideas en realidades digitales con las últimas tecnologías.",
  defaultKeywords: "desarrollo web, diseño digital, soluciones tecnológicas, agencia digital, marketing digital, páginas web, aplicaciones web, UX/UI design, Buenos Aires, Argentina",
  
  // Contact Information
  contactEmail: "amssystems22@gmail.com",
  contactPhone: "+54-9-11-5054-4776",
  
  // Social Media
  socialMedia: {
    linkedin: "https://linkedin.com/company/ams-systems",
    instagram: "https://instagram.com/amssystems",
    twitter: "https://twitter.com/amssystems"
  },
  
  // Google Analytics
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX",
  
  // Pages SEO
  pages: {
    home: {
      title: "AMS Systems - Desarrollo Digital y Soluciones Tecnológicas",
      description: "Desarrollo web profesional, diseño digital y soluciones tecnológicas innovadoras. Transformamos ideas en realidades digitales con las últimas tecnologías.",
      keywords: "desarrollo web, diseño digital, soluciones tecnológicas, agencia digital, marketing digital, páginas web, aplicaciones web, UX/UI design"
    },
    about: {
      title: "Nosotros - AMS Systems | Agencia de Desarrollo Digital",
      description: "Conoce al equipo de AMS Systems, especialistas en desarrollo web y diseño digital. Más de 3 años creando soluciones tecnológicas innovadoras.",
      keywords: "equipo AMS Systems, desarrolladores web, diseñadores digitales, agencia desarrollo web, Buenos Aires"
    },
    services: {
      title: "Servicios - AMS Systems | Desarrollo Web y Diseño Digital",
      description: "Ofrecemos desarrollo web, diseño digital, marketing digital y soluciones tecnológicas personalizadas. Servicios profesionales para empresas y startups.",
      keywords: "servicios desarrollo web, diseño digital, marketing digital, soluciones tecnológicas, páginas web, aplicaciones web"
    },
    works: {
      title: "Portfolio - AMS Systems | Proyectos de Desarrollo Web",
      description: "Explora nuestro portfolio de proyectos de desarrollo web y diseño digital. Casos de éxito de empresas que confiaron en AMS Systems.",
      keywords: "portfolio desarrollo web, proyectos diseño digital, casos de éxito, trabajos AMS Systems, ejemplos desarrollo web"
    },
    contact: {
      title: "Contacto - AMS Systems | Hablemos de tu Proyecto",
      description: "¿Tienes un proyecto en mente? Contacta con AMS Systems. Desarrollamos soluciones digitales personalizadas para tu empresa.",
      keywords: "contacto AMS Systems, consulta desarrollo web, presupuesto diseño digital, agencia desarrollo web Buenos Aires"
    }
  }
};
