import "./works.css";
import { WorksPageSection } from "./WorksPageSection";

export const metadata = {
  title: 'AMS Systems | Portfolio',
  description: "Portfolio de proyectos realizados por AMS Systems.",
  openGraph: {
    title: 'Portfolio',
  },
}

const Works = () => {

  return (
    <WorksPageSection />
  );
};

export default Works;