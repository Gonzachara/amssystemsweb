/* eslint-disable react/jsx-key */
"use client";
import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Item3 } from "./HeroModel/Coins";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";
import { useRouter } from 'next/navigation';

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionHero = () => {
  const { isSpanish, mounted } = useLanguage();
  // Evitar mismatch SSR/CSR: usar ES en SSR y cambiar en cliente cuando mounted=true
  const t = (!mounted ? amsContent : (isSpanish ? amsContent : amsContentEn));
  const router = useRouter();

  // REFS 
  const titleRef = useRef()
  const descriptionRef = useRef()
  const buttonRef1 = useRef()
  const buttonCircleRef1 = useRef()
  const buttonRef2 = useRef()
  const logosWrapperRef = useRef()
  const cursor = useRef()
  const [showCursor, setShowCursor] = useState(false)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  // Animated titles with descriptions for AMS Systems
  const animatedContent = useMemo(() => isSpanish ? [
    { title: "Desarrollo Digital", description: "Creamos experiencias web únicas que conectan tu marca con el mundo digital" },
    { title: "Sistemas Inteligentes", description: "Implementamos soluciones tecnológicas avanzadas para optimizar tu negocio" },
    { title: "Innovación Tecnológica", description: "Transformamos ideas en realidades digitales con las últimas tecnologías" },
    { title: "Soluciones Creativas", description: "Diseñamos estrategias digitales que destacan tu marca en el mercado" },
    { title: "Futuro Digital", description: "Construimos el mañana digital con soluciones escalables y sostenibles" }
  ] : [
    { title: "Digital Development", description: "We create unique web experiences that connect your brand with the digital world" },
    { title: "Smart Systems", description: "We implement advanced technological solutions to optimize your business" },
    { title: "Tech Innovation", description: "We transform ideas into digital realities with cutting-edge technologies" },
    { title: "Creative Solutions", description: "We design digital strategies that make your brand stand out in the market" },
    { title: "Digital Future", description: "We build tomorrow's digital world with scalable and sustainable solutions" }
  ], [isSpanish])

  // Fixed word-based animation to prevent word breaking
  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current) return;

    const titleWords = titleRef.current.querySelectorAll('.word');
    const descWords = descriptionRef.current.querySelectorAll('.word');

    gsap.killTweensOf([titleWords, descWords]);

    // Animate in words instead of characters
    gsap.fromTo(titleWords,
      { opacity: 0, y: 20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.1, duration: 0.45, ease: 'power2.out' }
    );
    gsap.fromTo(descWords,
      { opacity: 0, y: 10, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );

    const outTimeout = setTimeout(() => {
      gsap.to([titleWords, descWords], {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        stagger: 0.08,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setCurrentTitleIndex((prev) => (prev + 1) % animatedContent.length)
      });
    }, 2000);

    return () => clearTimeout(outTimeout);
  }, [currentTitleIndex, animatedContent]);

  // GSAP ANIMATIONS
  useEffect(() => {
    // Check if refs exist before animating
    if (!buttonRef1.current || !buttonRef2.current) {
      return;
    }

    // Fixed button animations - start with opacity 1 and animate from transform only
    if (buttonRef1.current) {
      gsap.fromTo(buttonRef1.current,
        { 
          y: 20,
          scale: 0.9
        },
        { 
          y: 0,
          scale: 1,
          delay: 0.8, 
          duration: 0.5, 
          ease: "power2.out"
        }
      );
    }

    if (buttonRef2.current) {
      gsap.fromTo(buttonRef2.current,
        { 
          y: 20,
          scale: 0.9
        },
        { 
          y: 0,
          scale: 1,
          delay: 1.0, 
          duration: 0.5, 
          ease: "power2.out"
        }
      );
    }

    // Logos wrapper animation with safety check
    if (logosWrapperRef.current) {
      gsap.fromTo(logosWrapperRef.current,
        {
          opacity: 0,
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.6,
          ease: "power2.out"
        }
      );
    }

  }, []);

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
    if (!cursor.current) return;
    
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

  const handleButtonClick = (path) => {
    // Fast button click animation
    const button = path === '/contact' ? buttonRef1.current : buttonRef2.current;
    
    if (!button) return;
    
    const tl = gsap.timeline();
    
    tl.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out"
    })
    .to(button, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out"
    })
    .call(() => {
      router.push(path);
    });
  };

  // Helper function to split text into words
  const splitIntoWords = (text, keyPrefix) => {
    return text.split(' ').map((word, i) => (
      <span key={`${keyPrefix}-${currentTitleIndex}-${i}`} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
        {word}
      </span>
    ));
  };

  return (
    <section className="hero">
      <div className="hero-background-element-small" />
      <div className="hero-background-element-grid-small" />
      <div className="hero-content">
        <div className="hero-content-row">
          <div className="hero-content-left">
            <div className="hero-textbox">
              <div className="hero-titlebox">
                <div className="hero-titlebox-gradient" />
                <h1 className="headline hero-headline white" ref={titleRef} aria-live="polite" suppressHydrationWarning>
                  {splitIntoWords(
                    animatedContent[currentTitleIndex]?.title || (isSpanish ? "Desarrollo Digital" : "Digital Development"),
                    't'
                  )}
                </h1>
              </div>
              <p className="big-description grey" ref={descriptionRef} suppressHydrationWarning>
                {splitIntoWords(
                  animatedContent[currentTitleIndex]?.description || t.home.hero.description,
                  'd'
                )}
              </p>
            </div>
            <div className="hero-buttons-row">
              <button className="button button-transparent-border" ref={buttonRef1} onClick={() => handleButtonClick('/contact')} >
                <div className="button-content">
                  <span className="small-description">{t.home.hero.cta1}</span>
                  <span className="small-description">{t.home.hero.cta1}</span>
                </div>
                <div className="button-circle" ref={buttonCircleRef1} >
                  <ArrowUpRight className="button-icon button-icon-180" />
                </div>
              </button>
              <button className="button button-transparent-border" ref={buttonRef2} onClick={() => handleButtonClick('/works')} >
                <div className="button-content">
                  <span className="small-description">{t.home.hero.cta2}</span>
                  <span className="small-description">{t.home.hero.cta2}</span>
                </div>
                <div className="button-circle">
                  <ArrowUpRight className="button-icon" />
                </div>
              </button>
              </div>
          </div>
          <div 
            className="hero-content-right" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <Canvas 
              style={{ pointerEvents: 'auto', width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1 }} 
              camera={{ position: [ 2, 0, 10], fov: 35 }}
              aria-label="3D Interactive AMS Systems Logo"
            >
              <Suspense fallback >
                <Float rotationIntensity={0.5} floatIntensity={2} speed={2}>
                  <Item3 />
                </Float>
                <Environment preset="sunset" />
                <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} enableRotate={true} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
      <div className="hover-cursor" ref={cursor}>
        <p className="small-description white" >{isSpanish ? "Arrastrar" : "Drag"}</p>
      </div>
    </section>
  );
};