import "../contact/contact.css";
import { ContactPageSection } from "../contact/ContactPageSection";

export const metadata = {
  title: 'AMS SYSTEMS | Contacto - Consulta Gratuita para Desarrollo Web en Argentina',
  description: '¿Listo para multiplicar tus resultados? Contacta a AMS SYSTEMS para una consulta estratégica gratuita. Desarrollo web profesional, e-commerce y sistemas a medida en Argentina.',
  keywords: 'contacto desarrollo web argentina, consulta gratuita, AMS SYSTEMS contacto, desarrollo web Buenos Aires, cotización proyecto web',
  openGraph: {
    title: 'AMS SYSTEMS | Contacto - Consulta Gratuita para Desarrollo Web',
    description: '¿Listo para multiplicar tus resultados? Contacta a AMS SYSTEMS para una consulta estratégica gratuita. Desarrollo web profesional en Argentina.',
    url: 'https://amssystems.com.ar/contacto',
    type: 'website',
    images: [
      {
        url: '/images/ams-contact-og.webp',
        width: 1200,
        height: 630,
        alt: 'Contacto AMS SYSTEMS - Consulta Gratuita Desarrollo Web Argentina',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS SYSTEMS | Contacto - Consulta Gratuita para Desarrollo Web',
    description: '¿Listo para multiplicar tus resultados? Contacta a AMS SYSTEMS para una consulta estratégica gratuita. Desarrollo web profesional en Argentina.',
    images: ['/images/ams-contact-twitter.webp'],
  },
  alternates: {
    canonical: 'https://amssystems.com.ar/contacto',
  },
}

const Contacto = () => {
  return (
    <ContactPageSection />
  );
};

export default Contacto;
