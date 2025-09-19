import "../about/about.css";
import { AboutPageSection } from "../about/AboutPageSection";

export const metadata = {
  title: 'AMS SYSTEMS | Nosotros - El Equipo que Hace Crecer Empresas en Argentina',
  description: 'Conoce al equipo de AMS SYSTEMS. Especialistas en desarrollo web profesional, e-commerce y sistemas a medida en Argentina. Transformamos ideas en soluciones digitales rentables.',
  keywords: 'equipo desarrollo web argentina, especialistas e-commerce, desarrolladores software a medida, Buenos Aires, AMS SYSTEMS equipo',
  openGraph: {
    title: 'AMS SYSTEMS | Nosotros - El Equipo que Hace Crecer Empresas',
    description: 'Conoce al equipo de AMS SYSTEMS. Especialistas en desarrollo web profesional, e-commerce y sistemas a medida en Argentina.',
    url: 'https://amssystems.com.ar/nosotros',
    type: 'website',
    images: [
      {
        url: '/images/ams-team-og.webp',
        width: 1200,
        height: 630,
        alt: 'Equipo AMS SYSTEMS - Desarrollo Web Profesional en Argentina',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS SYSTEMS | Nosotros - El Equipo que Hace Crecer Empresas',
    description: 'Conoce al equipo de AMS SYSTEMS. Especialistas en desarrollo web profesional, e-commerce y sistemas a medida en Argentina.',
    images: ['/images/ams-team-twitter.webp'],
  },
  alternates: {
    canonical: 'https://amssystems.com.ar/nosotros',
  },
}

const Nosotros = () => {
  return (
    <AboutPageSection />
  );
};

export default Nosotros;
