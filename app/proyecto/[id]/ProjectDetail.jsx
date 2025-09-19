"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from 'lenis/react';
import { useRouter } from 'next/navigation';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Code, Zap } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import amsContent from "../../data/amsContent";
import amsContentEn from "../../data/amsContentEn";
import { SectionFooter } from "../../Main/SectionFooter";
import Image from "next/image";
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

// Simple SplitText alternative
const splitText = (element, type = "chars") => {
  if (!element) return { chars: [], words: [] };
  
  const text = element.textContent;
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    return span;
  });
  
  const words = text.split(' ').map(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.marginRight = '0.25em';
    return span;
  });
  
  element.innerHTML = '';
  
  if (type === "chars") {
    chars.forEach(char => element.appendChild(char));
    return { chars, words: [] };
  } else {
    words.forEach(word => element.appendChild(word));
    return { chars: [], words };
  }
};

export default function ProjectDetail({ projectId }) {
  const { isSpanish } = useLanguage();
  const t = isSpanish ? amsContent : amsContentEn;
  const router = useRouter();
  
  // ANIMATIONS - Same structure as WorksPageSection
  const titleRef = useRef();
  const descriptionRef = useRef();
  const lineRef = useRef();
  const backButtonRef = useRef();
  const heroImageRef = useRef();
  const featuresRef = useRef();
  const techRef = useRef();
  const testimonialRef = useRef();
  const ctaRef = useRef();
  const cursor = useRef();
  const [showCursor, setShowCursor] = useState(false);

  // STACK ANIMATION REFS - Like AboutPageSection
  const projectInfoRef1 = useRef();
  const projectInfoRef2 = useRef();
  const projectInfoRef3 = useRef();
  
  const project = t.works.projects.find(p => p.id === projectId);

  // STICKY SECTION REFS - Move all refs to top
  const item1Ref = useRef(null);
  const item2Ref = useRef(null);
  const item3Ref = useRef(null);
  const item4Ref = useRef(null);

  // Event handlers
  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };

  useEffect(() => {
    if (!project) return;
    
    // Same animations as WorksPageSection
    // headline text animation
    const titleSplit = splitText(titleRef.current, "chars");
    gsap.fromTo(titleSplit.chars, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.02, duration: 0.75, ease: "power1" });

    // description text animation
    gsap.to(descriptionRef.current, { opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.6 });

    // line animation
    gsap.fromTo(lineRef.current, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, delay: 0.5 });

    // hero image animation
    gsap.fromTo(heroImageRef.current, { opacity: 0, scale: 0.8, filter: 'blur(8px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", delay: 0.8 });

    // features animation
    gsap.fromTo(featuresRef.current, { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: featuresRef.current, start: "top 80%" } });

    // tech stack animation
    gsap.fromTo(techRef.current, { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: techRef.current, start: "top 80%" } });

    // testimonial animation
    gsap.fromTo(testimonialRef.current, { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: testimonialRef.current, start: "top 80%" } });

    // CTA animation
    gsap.fromTo(ctaRef.current, { opacity: 0, y: 50, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ctaRef.current, start: "top 80%" } });

    // Back button animation
    gsap.fromTo(backButtonRef.current, { opacity: 0, x: -30, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: "power2.out", delay: 0.1 });

  }, [project]);

  // FOLLOWING CURSOR - Same as WorksPageSection
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.05;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;

      cursorX += distX * speed;
      cursorY += distY * speed;

      if (cursor.current) {
        cursor.current.style.left = `${cursorX}px`;
        cursor.current.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (showCursor) {
      gsap.to(cursor.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(cursor.current, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [showCursor]);

  // STACK ANIMATION - Like AboutPageSection
  useEffect(() => {
    if (!project) return;
    
    const refs = [projectInfoRef1, projectInfoRef2, projectInfoRef3];

    refs.forEach((ref, position) => {
      const el = ref.current;
      if (!el) return;
      const isLast = position === refs.length - 1;

      gsap.set(el, { willChange: "transform, filter" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'center center',
          end: '350%',
          scrub: true,
        },
      });

      timeline
      .to(el, {
        ease: 'none',
        startAt: { filter: 'blur(0px)' },
        filter: isLast ? 'blur(0px)' : 'blur(3px)',
        scrollTrigger: {
          trigger: el,
          start: 'center center',
          end: '+=100%',
          scrub: true,
        },
      }, 0)
      .to(el, {
        ease: 'none',
        scale: isLast ? 1 : 0.55,
        yPercent: isLast ? 0 : -45,
      }, 0);
    });
  }, [project]);

  // STICKY SECTION EFFECT
  useEffect(() => {
          const refs = [item1Ref, item2Ref, item3Ref, item4Ref];
  
          refs.forEach((ref, position) => {
              const el = ref.current;
              const isLast = position === refs.length - 1;
  
              gsap.set(el, { willChange: "transform, filter" });
  
              const timeline = gsap.timeline({
                  scrollTrigger: {
                      trigger: el,
                      start: 'center center',
                      end: '350%',
                      scrub: true,
                  },
              });
  
              timeline
              .to(el, {
                  ease: 'none',
                  startAt: { filter: 'blur(0px)' },
                  filter: isLast ? 'blur(0px)' : 'blur(3px)',
                  scrollTrigger: {
                      trigger: el,
                      start: 'center center',
                      end: '+=100%',
                      scrub: true,
                  },
              }, 0)
              .to(el, {
                  ease: 'none',
                  scale: isLast ? 1 : 0.55,
                  yPercent: isLast ? 0 : -45,
              }, 0);
          });
      }, []);

  if (!projectId || !project) {
    router.push('/trabajos');
    return null;
  }

  return (
    <ReactLenis root>
      <section className="works">
        <div className="works-content">
          {/* Back Button */}
          <div className="works-content-top">
            <div className="works-content-top-text">
              <button 
                ref={backButtonRef}
                className="works-back-button"
                onClick={() => router.back()}
              >
                <ArrowLeft className="works-back-icon" />
                <span className="small-description white">{isSpanish ? 'Volver' : 'Back'}</span>
              </button>
            </div>
          </div>

          {/* Hero Section - Same structure as WorksPageSection */}
          <div className="works-content-top">
            <div className="works-content-top-text">
              <div className="works-content-textbox">
                <div className="titlebox">
                  <div className="subpage-titlebox-gradient" />
                  <h1 className="headline white" ref={titleRef}>{project.name}</h1>
                </div>
                <p className="description grey opacity-blur" ref={descriptionRef}>{project.description}</p>
              </div>
              <div className="works-content-top-divider" ref={lineRef} />
            </div>
            
            {/* Hero Image */}
            <div className="works-hero-image" ref={heroImageRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} role="img" tabIndex={0}>
              <Image src={project.image} className="works-hero-image-content" width={1200} height={600} unoptimized loading="lazy" alt={`${project.name} project`} />
            </div>
          </div>

          {/* Project Info Section - Stack Animation */}
          <div className="about-sticky-container">
				<div className="about-sticky-item" ref={item1Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >{t.about.services[0].title}</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >{t.about.services[0].description}</p>
                        </div>
                        <h1 className="headline white" >(01)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src={t.about.services[0].image} className="about-sticky-item-right-image" alt={t.about.services[0].title} />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item2Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >{t.about.services[1].title}</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >{t.about.services[1].description}</p>
                        </div>
                        <h1 className="headline white" >(02)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src={t.about.services[1].image} className="about-sticky-item-right-image" alt={t.about.services[1].title} />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item3Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >{t.about.services[2].title}</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >{t.about.services[2].description}</p>
                        </div>
                        <h1 className="headline white" >(03)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src={t.about.services[2].image} className="about-sticky-item-right-image" alt={t.about.services[2].title} />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item4Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >{t.about.services[3].title}</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >{t.about.services[3].description}</p>
                        </div>
                        <h1 className="headline white" >(04)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src={t.about.services[3].image} className="about-sticky-item-right-image" alt={t.about.services[3].title} />
                        </div>
                    </div>
                </div>
			</div>

          {/* Features Section */}
          <div className="works-casestudies" ref={featuresRef}>
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur">
                <Zap className="subheadline-box-icon" />
                <h2 className="small-description grey">{isSpanish ? 'Características' : 'Features'}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white">{isSpanish ? 'Características principales del proyecto' : 'Main project features'}</h1>
              </div>
              <p className="description grey">{isSpanish ? 'Funcionalidades y características destacadas implementadas en el proyecto.' : 'Functionalities and outstanding features implemented in the project.'}</p>
            </div>
            
            <div className="works-features-grid">
              {project.features.map((feature, index) => (
                <div key={`feature-${project.id}-${index}`} className="works-feature-item">
                  <div className="works-feature-number">{index + 1}</div>
                  <p className="description grey">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="works-casestudies" ref={techRef}>
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur">
                <Zap className="subheadline-box-icon" />
                <h2 className="small-description grey">{isSpanish ? 'Tecnologías' : 'Technologies'}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white">{isSpanish ? 'Stack tecnológico utilizado' : 'Technology stack used'}</h1>
              </div>
              <p className="description grey">{isSpanish ? 'Herramientas y tecnologías implementadas en el desarrollo del proyecto.' : 'Tools and technologies implemented in the project development.'}</p>
            </div>
            
            <div className="works-tech-grid">
              {project.technologies.map((tech, index) => (
                <div key={`tech-${project.id}-${index}`} className="works-tech-item">
                  <Code className="works-tech-icon" />
                  <span className="small-description white">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="works-casestudies" ref={testimonialRef}>
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur">
                <Zap className="subheadline-box-icon" />
                <h2 className="small-description grey">{isSpanish ? 'Testimonio' : 'Testimonial'}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white">{isSpanish ? 'Lo que dice nuestro cliente' : 'What our client says'}</h1>
              </div>
              <p className="description grey">{isSpanish ? 'Feedback y experiencia del cliente con el proyecto desarrollado.' : 'Client feedback and experience with the developed project.'}</p>
            </div>
            
            <div className="works-testimonial">
              <div className="works-testimonial-content">
                <p className="description grey italic">&ldquo;{project.testimonial}&rdquo;</p>
                <div className="works-testimonial-author">
                  <span className="small-description white">{isSpanish ? 'Cliente' : 'Client'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="works-casestudies" ref={ctaRef}>
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur">
                <Zap className="subheadline-box-icon" />
                <h2 className="small-description grey">{isSpanish ? '¿Te gustó?' : 'Like it?'}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white">{isSpanish ? 'Creemos algo similar para vos' : 'Let\'s create something similar for you'}</h1>
              </div>
              <p className="description grey">{isSpanish ? 'Hablemos sobre cómo podemos desarrollar un proyecto similar para tu negocio.' : 'Let\'s talk about how we can develop a similar project for your business.'}</p>
            </div>
            
            <div className="works-cta">
              <div className="works-cta-content">
                <div className="contact-button-wrapper">
                  <button 
                    className="contact-button-white"
                    onClick={() => window.open(`https://${project.url}`, '_blank')}
                  >
                    <span>
                      <span className="contact-button-container-white">
                        <span className="contact-button-primary-white"></span>
                        <span className="contact-button-complimentary-white"></span>
                      </span>
                    </span>
                    <span className="description black">{isSpanish ? 'Ver Sitio' : 'View Site'}</span>
                  </button>
                </div>
                <div className="contact-button-wrapper">
                  <button 
                    className="contact-button-white"
                    onClick={() => router.push('/contacto')}
                  >
                    <span>
                      <span className="contact-button-container-white">
                        <span className="contact-button-primary-white"></span>
                        <span className="contact-button-complimentary-white"></span>
                      </span>
                    </span>
                    <span className="description black">{isSpanish ? 'Hablemos' : 'Let\'s talk'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hover-cursor" ref={cursor}>
          <p className="small-description white">{isSpanish ? 'Arrastrar' : 'Drag'}</p>
        </div>
      </section>
      <SectionFooter />
    </ReactLenis>
  );
}

ProjectDetail.propTypes = {
  projectId: PropTypes.string.isRequired,
};
