/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons"
import { DotButton, useDotButton } from './Carousel/EmblaCarouselDotButton'
import Fade from 'embla-carousel-fade'
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionProjects = () => {
  const { isSpanish, mounted } = useLanguage();
  
  // Always use Spanish content for SSR consistency, then switch on client
  const getContent = () => {
    if (!mounted) return amsContent;
    return isSpanish ? amsContent : amsContentEn;
  };
  const t = getContent();

  const subheadlineBoxRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const contentRef = useRef();
  const imageContainerRef = useRef();
  const cursor = useRef()
  const projectsGridRef = useRef()
  const carouselRef = useRef()
  const [showCursor, setShowCursor] = useState(false)

  // GSAP ANIMATIONS

  useEffect(() => {

    // subheadline box animation
    gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

    // headline text animation
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.05, duration: 0.75, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

    // description text animation
    const descriptionSplit = new SplitText(descriptionRef.current, { type: "words" });
    gsap.fromTo(descriptionSplit.words, { filter: 'blur(8px)', opacity: 0 }, { opacity: 1, filter: 'blur(0px)', stagger: 0.025, ease: 'sine', scrollTrigger: { trigger: descriptionRef.current, start: "top 95%" } });

    // image parallax effect
    if (imageContainerRef.current) {
      gsap.fromTo(imageContainerRef.current, { yPercent: 7.5 }, { yPercent: -7.5, scrollTrigger: { trigger: ".projects", start: "top bottom", end: "bottom top", scrub: true} })
    }

    // Projects grid animation with magnetic effect
    if (projectsGridRef.current?.children && projectsGridRef.current.children.length > 0) {
      gsap.fromTo(projectsGridRef.current.children, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationY: 15
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: {
            amount: 0.8,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: { 
            trigger: projectsGridRef.current, 
            start: "top 85%" 
          }
        }
      );
    }

    // Carousel floating animation
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Magnetic hover effect for project items
    if (projectsGridRef.current?.children) {
      Array.from(projectsGridRef.current.children).forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            y: -15,
            rotationY: 5,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    }
  }, [])

  // EMBLA CAROUSEL

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const {
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // FOLLOWING CURSOR
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

  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };
  

  return (
    <section className="projects projects-desktop">
      <div className="textbox">
        <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
          <Star className="subheadline-box-icon" />
          <h2 className="small-description grey" >{t.home.projects.label}</h2>
        </div>
        <div className="titlebox">
          <div className="titlebox-big-gradient" />
          {/* Evita desajustes entre SSR y CSR cuando el contenido puede variar por idioma */}
          <h1 className="subheadline white" ref={titleRef} suppressHydrationWarning>{t.home.projects.title}</h1>
        </div>
        <p className="description grey" ref={descriptionRef} suppressHydrationWarning>{t.home.projects.description}</p>
      </div>
      <div 
        className="projects-content" 
        ref={contentRef} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        onClick={onNextButtonClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNextButtonClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Next project"
      >
        <div className="projects-gradient-top" />
        <div className="projects-gradient-bottom" />
          <div className="project-content-wrapper" ref={imageContainerRef} >
          <div className="projects-carousel" ref={emblaRef} >
            <div className="projects-carousel-row" ref={carouselRef}>
              <div className="projects-carousel-item" ref={projectsGridRef}>
                <Image src="/mockups/heave.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="Heavecorp project" />
              </div>
              <div className="projects-carousel-item">
                <Image src="/mockups/essentia.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="" />
              </div>
              <div className="projects-carousel-item">
                <Image src="/mockups/kinimatic.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="" />
              </div>
              <div className="projects-carousel-item">
                <Image src="/mockups/peak.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="" />
              </div>
              <div className="projects-carousel-item">
                <Image src="/mockups/vitalenta.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="" />
              </div>
              <div className="projects-carousel-item">
                <Image src="/mockups/rev.webp" width={1920} height={1080} unoptimized className="projects-carousel-item-image" alt="" />
              </div>
            </div>
          </div>
          </div>
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={`dot-${index}`}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        </div>
        <div className="hover-cursor" ref={cursor}>
          <p className="small-description white" >{t.home.projects.cursor}</p>
        </div>
    </section>
  );
};