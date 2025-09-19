import "./about.css";
import { AboutPageSection } from "./AboutPageSection";

export const metadata = {
  title: 'AMS Systems | Nosotros',
  description: "Equipo multidisciplinario con experiencia en producto, diseño y desarrollo.",
  openGraph: {
    title: 'Nosotros',
  },
}

const About = () => {

  return (
    <AboutPageSection />
  );
};

export default About;