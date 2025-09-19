import "../works/works.css";
import { WorksPageSection } from "../works/WorksPageSection";

export const metadata = {
  title: 'AMS SYSTEMS | Casos de Éxito - Portfolio de Desarrollo Web en Argentina',
  description: 'Descubre nuestros casos de éxito en desarrollo web, e-commerce y sistemas a medida en Argentina. +$247M en ingresos generados para nuestros clientes. Ver portfolio completo.',
  keywords: 'casos de éxito desarrollo web argentina, portfolio e-commerce, proyectos software a medida, clientes AMS SYSTEMS, resultados comprobados',
  openGraph: {
    title: 'AMS SYSTEMS | Casos de Éxito - Portfolio de Desarrollo Web',
    description: 'Descubre nuestros casos de éxito en desarrollo web, e-commerce y sistemas a medida en Argentina. +$247M en ingresos generados.',
    url: 'https://amssystems.com.ar/trabajos',
    type: 'website',
    images: [
      {
        url: '/images/ams-portfolio-og.webp',
        width: 1200,
        height: 630,
        alt: 'Portfolio AMS SYSTEMS - Casos de Éxito en Desarrollo Web Argentina',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS SYSTEMS | Casos de Éxito - Portfolio de Desarrollo Web',
    description: 'Descubre nuestros casos de éxito en desarrollo web, e-commerce y sistemas a medida en Argentina. +$247M en ingresos generados.',
    images: ['/images/ams-portfolio-twitter.webp'],
  },
  alternates: {
    canonical: 'https://amssystems.com.ar/trabajos',
  },
}

const Trabajos = () => {
  return (
    <WorksPageSection />
  );
};

export default Trabajos;
