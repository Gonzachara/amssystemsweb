"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis } from 'lenis/react'
import "./works.css";
import { PrevButton, NextButton, usePrevNextButtons} from "../Main/Carousel/EmblaCarouselArrowButtons"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowUpRight } from "lucide-react";
import { SectionFooter } from "../Main/SectionFooter";
import { useRouter } from 'next/navigation';
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const WorksPageSection = () => {
  const { isSpanish } = useLanguage();
  const t = isSpanish ? amsContent : amsContentEn;
  const router = useRouter();

  // ANIMATIONS
  const titleRef = useRef()
  const subtitleRef1 = useRef()
  const subtitleRef2 = useRef()
  const descriptionRef = useRef()
  const subdescriptionRef1 = useRef()
  const subdescriptionRef2 = useRef()
  const lineRef = useRef()
  const carouselWrapperRef = useRef()
  const worksItemRef1 = useRef()
  const industryImageRef1 = useRef()
  const industryImageRef2 = useRef()
  const industryImageRef3 = useRef()
  const industryImageRef4 = useRef()
  const subheadlineBoxRef1 = useRef()
  const subheadlineBoxRef2 = useRef()
  const cursor = useRef()
  const [showCursor, setShowCursor] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Conditional animation setup based on screen size
    const setupAnimations = () => {
      // headline text animation
      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      gsap.fromTo(titleSplit.chars, { 
        'will-change': 'opacity, transform', 
        filter: 'blur(8px)', 
        opacity: 0, 
        yPercent: isMobile ? 30 : 50 
      }, { 
        delay: 0.2, 
        opacity: 1, 
        filter: 'blur(0px)', 
        yPercent: 0, 
        stagger: isMobile ? 0.01 : 0.02, 
        duration: isMobile ? 0.5 : 0.75, 
        ease: "power1" 
      });

      // description text animation
      gsap.to(descriptionRef.current, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: isMobile ? 0.8 : 1, 
        delay: isMobile ? 0.4 : 0.6 
      })

      // line animation
      gsap.fromTo(lineRef.current, { 
        opacity: 0, 
        filter: 'blur(8px)' 
      }, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.5, 
        delay: isMobile ? 0.3 : 0.5 
      })

      // work carousel items animation - only on desktop
      if (!isMobile) {
        gsap.to(worksItemRef1.current, { delay: 0.4, opacity: 0, duration: 1, ease: 'power1' });
      }

      // industry images with responsive sizing
      const imageRefs = [industryImageRef1, industryImageRef2, industryImageRef3, industryImageRef4];
      imageRefs.forEach((ref, index) => {
        if (ref.current) {
          gsap.fromTo(ref.current, { width: 0 }, { 
            width: "100%", 
            scrollTrigger: { 
              trigger: ref.current, 
              start: isMobile ? "top 90%" : "top bottom", 
              end: "center center", 
              scrub: true 
            } 
          });
        }
      });

      // case studies wrapper animation
      gsap.to(carouselWrapperRef.current, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: isMobile ? 0.8 : 1, 
        ease: 'power1', 
        scrollTrigger: { 
          trigger: carouselWrapperRef.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        } 
      });

      // subheadline box animation
      gsap.to(subheadlineBoxRef1.current, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.5, 
        ease: 'power1', 
        scrollTrigger: { 
          trigger: subheadlineBoxRef1.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        }
      });
      gsap.to(subheadlineBoxRef2.current, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.5, 
        ease: 'power1', 
        scrollTrigger: { 
          trigger: subheadlineBoxRef2.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        }
      });

      // subtitle text animation with mobile considerations
      const subtitleSplit1 = new SplitText(subtitleRef1.current, { type: "words" });
      const subtitleSplit2 = new SplitText(subtitleRef2.current, { type: "words" });
      gsap.fromTo(subtitleSplit1.words, { 
        'will-change': 'opacity, transform', 
        filter: 'blur(8px)', 
        opacity: 0, 
        yPercent: isMobile ? 30 : 50 
      }, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        yPercent: 0, 
        stagger: isMobile ? 0.03 : 0.05, 
        duration: isMobile ? 0.5 : 0.75, 
        ease: "power2", 
        scrollTrigger: { 
          trigger: subtitleRef1.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        } 
      });
      gsap.fromTo(subtitleSplit2.words, { 
        'will-change': 'opacity, transform', 
        filter: 'blur(8px)', 
        opacity: 0, 
        yPercent: isMobile ? 30 : 50 
      }, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        yPercent: 0, 
        stagger: isMobile ? 0.03 : 0.05, 
        duration: isMobile ? 0.5 : 0.75, 
        ease: "power2", 
        scrollTrigger: { 
          trigger: subtitleRef2.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        } 
      });

      // description text animation
      const subdescriptionSplit1 = new SplitText(subdescriptionRef1.current, { type: "words" });
      const subdescriptionSplit2 = new SplitText(subdescriptionRef2.current, { type: "words" });
      gsap.fromTo(subdescriptionSplit1.words, { 
        filter: 'blur(8px)', 
        opacity: 0 
      }, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        stagger: isMobile ? 0.02 : 0.025, 
        ease: 'sine', 
        scrollTrigger: { 
          trigger: subdescriptionRef1.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        } 
      });
      gsap.fromTo(subdescriptionSplit2.words, { 
        filter: 'blur(8px)', 
        opacity: 0 
      }, { 
        opacity: 1, 
        filter: 'blur(0px)', 
        stagger: isMobile ? 0.02 : 0.025, 
        ease: 'sine', 
        scrollTrigger: { 
          trigger: subdescriptionRef2.current, 
          start: isMobile ? "top 90%" : "top 95%" 
        } 
      });
    };

    setupAnimations();
  }, [isMobile])

  // FOLLOWING CURSOR - disabled on mobile
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    
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
  }, [showCursor, isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) setShowCursor(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowCursor(false);
  };

  // EMBLA CAROUSEL with responsive options
  const carouselOptions = {
    dragFree: true,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(max-width: 768px)': {
        dragFree: true,
        align: 'center',
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
      }
    }
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
  const [emblaRef2, emblaApi2] = useEmblaCarousel(carouselOptions);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollProgress2, setScrollProgress2] = useState(0);
  
  const {
    prevBtnDisabled: prevBtnDisabled1,
    nextBtnDisabled: nextBtnDisabled1,
    onPrevButtonClick: onPrevButtonClick1,
    onNextButtonClick: onNextButtonClick1,
  } = usePrevNextButtons(emblaApi);
  
  const {
    prevBtnDisabled: prevBtnDisabled2,
    nextBtnDisabled: nextBtnDisabled2,
    onPrevButtonClick: onPrevButtonClick2,
    onNextButtonClick: onNextButtonClick2,
  } = usePrevNextButtons(emblaApi2);
  
  const onScroll = useCallback((emblaApi, setProgress) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setProgress(progress * 100);
  }, []);
  
  useEffect(() => {
    if (!emblaApi) return;
  
    const handleScroll = () => onScroll(emblaApi, setScrollProgress);
    handleScroll();
    emblaApi.on("reInit", handleScroll).on("scroll", handleScroll).on("slideFocus", handleScroll);
  
    return () => emblaApi.off("reInit", handleScroll).off("scroll", handleScroll).off("slideFocus", handleScroll);
  }, [emblaApi, onScroll]);
  
  useEffect(() => {
    if (!emblaApi2) return;
  
    const handleScroll = () => onScroll(emblaApi2, setScrollProgress2);
    handleScroll();
    emblaApi2.on("reInit", handleScroll).on("scroll", handleScroll).on("slideFocus", handleScroll);
  
    return () => emblaApi2.off("reInit", handleScroll).off("scroll", handleScroll).off("slideFocus", handleScroll);
  }, [emblaApi2, onScroll]);

  const handleProjectClick = (projectId) => {
    router.push(`/works/${projectId}`);
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <ReactLenis root>
      <section className="works" >
        <div className="works-content" >
          <div className="works-content-top">
            <div className="works-content-top-text">
              <div className="works-content-textbox">
                <div className="titlebox">
                  <div className="subpage-titlebox-gradient" />
                  <h1 className="headline white" ref={titleRef} >{t.works.title}</h1>
                </div>
                <p className="description grey opacity-blur" ref={descriptionRef} >{t.works.description}</p>
              </div>
              <div className="works-content-top-divider" ref={lineRef} />
            </div>
            <div 
              className="works-carousel-wrapper" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              {!isMobile && <div className="works-carousel-wrapper-overlay" ref={worksItemRef1} />}
              <div className="works-carousel" ref={emblaRef2} >
                <div className="works-carousel-row">
                  <div className="works-item-padding" />
                  {t.works.projects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="works-item" 
                      onClick={() => handleProjectClick(project.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleProjectClick(project.id);
                        }
                      }}
                      aria-label={`View ${project.name} project`}
                    >
                      <div className="works-item-content" >
                        <div className="works-item-content-textbox">
                          <h2 className="subheadline white" >{project.name}</h2>
                          <div className="works-item-content-textbox-row">
                            <div className="works-item-content-textbox-button">
                              <p className="small-description white" >{project.type}</p>
                            </div>
                            <div className="works-item-content-textbox-button">
                              <p className="small-description white" >{project.industry}</p>
                            </div>
                          </div>
                        </div>
                        <Image 
                          src={project.image} 
                          className="works-item-content-image" 
                          width={750} 
                          height={750} 
                          unoptimized 
                          loading="lazy" 
                          alt={`${project.name} project`}
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 40vw"
                        />
                        <div className="works-item-content-image-overlay" />
                      </div>
                      <div className="works-item-border" />
                    </div>
                  ))}
                  <div className="works-item" >
                    <div className="works-item-last-content" >
                      <p className="description white" >{t.works.lastItem.title}</p>
                      <h2 className="subheadline white" >{t.works.lastItem.subtitle}</h2>
                      <div className="contact-button-wrapper">
                        <button 
                          className="contact-button-white" 
                          onClick={handleContactClick}
                          aria-label="Go to contact page"
                        >
                          <span>
                            <span className="contact-button-container-white">
                              <span className="contact-button-primary-white"></span>
                              <span className="contact-button-complimentary-white"></span>
                            </span>
                          </span>
                          <span className="description black" >{t.works.ctaLast}</span>
                        </button>
                      </div>
                    </div>
                    <div className="works-item-border" />
                  </div>
                  <div className="works-item-padding" />
                </div>
              </div>
              <div className="casestudies-carousel-bottom">
                <div className="casestudies-carousel-bottom-buttons">
                  <PrevButton onClick={onPrevButtonClick2} disabled={prevBtnDisabled2} />
                  <NextButton onClick={onNextButtonClick2} disabled={nextBtnDisabled2} />
                </div>
                <div className="embla__progress">
                  <div className="embla__progress__bar" style={{ transform: `translate3d(${scrollProgress2}%,0px,0px)` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="works-industries">
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef1} >
                <h2 className="small-description grey" >{t.works.industries.title}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white" ref={subtitleRef1} >{t.works.industries.subtitle}</h1>
              </div>
              <p className="description grey" ref={subdescriptionRef1} >{t.works.industries.description}</p>
            </div>
            <div className="works-industries-container">
              <div className="works-industries-divider" />
              {t.works.industries.items.map((industry, index) => (
                <React.Fragment key={index}>
                  <div className="works-industries-item">
                    <div className="works-industries-item-left">
                      <h2 className="small-subheadline white" >{industry.name}</h2>
                    </div>
                    <div className="works-industries-item-right">
                      <div 
                        className="works-industries-item-right-imagebox" 
                        ref={index === 0 ? industryImageRef1 : 
                             index === 1 ? industryImageRef2 : 
                             index === 2 ? industryImageRef3 : 
                             industryImageRef4}
                      >
                        <img 
                          src={industry.image} 
                          className="works-industries-item-right-image" 
                          alt={industry.name}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="works-industries-divider" />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="works-casestudies">
            <div className="works-subtextbox">
              <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef2} >
                <h2 className="small-description grey" >{t.works.caseStudies.title}</h2>
              </div>
              <div className="titlebox">
                <div className="titlebox-medium-gradient" />
                <h1 className="subheadline white" ref={subtitleRef2} >{t.works.caseStudies.subtitle}</h1>
              </div>
              <p className="description grey" ref={subdescriptionRef2} >{t.works.caseStudies.description}</p>
            </div>
            <div 
              className="casestudies-carousel-wrapper opacity-blur" 
              ref={carouselWrapperRef} 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <div className="casestudies-carousel" ref={emblaRef} >
                <div className="casestudies-carousel-row">
                  <div className="casestudies-item-padding" />
                  {t.works.projects.slice(0, 4).map((project, index) => (
                    <div 
                      key={project.id} 
                      className="casestudies-item" 
                      onClick={() => handleProjectClick(project.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleProjectClick(project.id);
                        }
                      }}
                      aria-label={`View ${project.name} case study`}
                    >
                      <div className="casestudies-item-content">
                        <div className="casestudies-item-content-textbox">
                          <div className="subheadline-box" >
                            <h2 className="small-description grey" >{project.type}</h2>
                          </div>
                          <h3 className="small-subheadline white" >{project.name}</h3>
                          <p className="description grey" >{project.description}</p>
                        </div>
                        <div className="casestudies-item-content-imagebox" >
                          <div className="button casestudies-item-content-imagebox-button" >
                            <div className="button-content">
                              <span className="small-description white">{t.works.cta}</span>
                              <span className="small-description white">{t.works.cta}</span>
                            </div>
                            <ArrowUpRight className="casestudies-item-content-imagebox-button-icon" />
                          </div>
                          <img 
                            src={project.image} 
                            className="casestudies-item-content-image" 
                            alt={`${project.name} project`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="casestudies-item-padding" />
                </div>
              </div>
              <div className="casestudies-carousel-bottom">
                <div className="casestudies-carousel-bottom-buttons">
                  <PrevButton onClick={onPrevButtonClick1} disabled={prevBtnDisabled1} />
                  <NextButton onClick={onNextButtonClick1} disabled={nextBtnDisabled1} />
                </div>
                <div className="embla__progress">
                  <div className="embla__progress__bar" style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="hover-cursor" ref={cursor}>
            <p className="small-description white" >{isSpanish ? "Arrastrar" : "Drag"}</p>
          </div>
        )}

      </section>

      {/* FAQ Section */}
      <section className="works-faq-section">
        <div className="works-faq-content">
          <div className="works-faq-text">
            <div className="titlebox">
              <div className="titlebox-gradient" />
              <h2 className="subheadline white">
                {isSpanish ? "¿Tenés dudas? Despejalas" : "Have questions? Clear them up"}
              </h2>
            </div>
            <p className="description grey">
              {isSpanish 
                ? "Encontrá respuestas a las preguntas más comunes sobre nuestros servicios y procesos."
                : "Find answers to the most common questions about our services and processes."
              }
            </p>
            <div className="works-faq-button">
              <button 
                className="button button-transparent-border" 
                onClick={() => router.push('/faq')}
              >
                <div className="button-content">
                  <span className="small-description">
                    {isSpanish ? "Ver FAQ's" : "View FAQ's"}
                  </span>
                  <span className="small-description">
                    {isSpanish ? "Ver FAQ's" : "View FAQ's"}
                  </span>
                </div>
                <div className="button-circle">
                  <ArrowUpRight className="button-icon" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionFooter />
    </ReactLenis>
  );
};