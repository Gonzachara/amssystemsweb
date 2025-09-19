"use client";
import { ReactLenis, useLenis } from 'lenis/react'
import { SectionHero } from "./SectionHero";
import { SectionFooter } from "./SectionFooter";
import { SectionTestimonials } from "./SectionTestimonials";
import { SectionTechstack } from "./SectionTechstack";
import { SectionFlower } from "./SectionFlower";
import { SectionServices } from "./SectionServices";
import { SectionProjects } from "./SectionProjects";
import { SectionProjectsMobile } from "./SectionProjectsMobile";
import { SectionKPI } from "./SectionKPI";
import { SectionProblems } from "./SectionProblems";
import "./main.css";
import { useLayoutEffect, useState } from 'react';
import { ModernPreloader } from "../components/ModernPreloader";

const Main = () => {

  const [fadeOut, setFadeOut] = useState(false);
  const lenis = useLenis();

  useLayoutEffect(() => {
    // Simulate progress completion
    const timer = setTimeout(() => {
      setFadeOut(true);
      lenis?.start();
    }, 2000);

    return () => clearTimeout(timer);
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2 }}>
      {!fadeOut && <ModernPreloader onComplete={() => setFadeOut(true)} />}
      <SectionHero />


      <div className="border-padding">
        <div className="section-border"></div>
      </div>
      <SectionProblems />
      <div className="normal-padding" />
      <SectionServices />
      <div className="normal-padding" />
      <SectionProjects />
      <SectionProjectsMobile />
      <div className="normal-padding" />
      <SectionTechstack />
      <div className="normal-padding" />
      <SectionTestimonials />
      <SectionKPI />
      <div className="normal-padding" />
      <SectionFlower />
      <div className="normal-padding" />
      <SectionFooter />
    </ReactLenis>
  );
};

export default Main;
