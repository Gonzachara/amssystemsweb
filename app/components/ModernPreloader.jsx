"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export const ModernPreloader = ({ onComplete }) => {
  const { isDarkMode } = useTheme();
  const [progress, setProgress] = useState(0);
  const logoRef = useRef();
  const progressRef = useRef();
  const backgroundRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    // Create floating particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
      particle.style.pointerEvents = 'none';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = '0';
      backgroundRef.current?.appendChild(particle);
      particles.push(particle);
    }
    particlesRef.current = particles;

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        opacity: 1,
        duration: 0.5,
        delay: i * 0.1,
        ease: "power2.out"
      });
      
      gsap.to(particle, {
        y: -20,
        x: Math.random() * 40 - 20,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    });

    // Logo animation
    const tl = gsap.timeline();
    
    tl.to(logoRef.current, {
      scale: 1.1,
      rotation: 5,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(logoRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.4")
    .to(logoRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.2")
    .to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.1");

    // Progress animation
    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(progressInterval);
        
        // Complete animation
        setTimeout(() => {
          const endTl = gsap.timeline({ onComplete: () => onComplete?.() });
          endTl
            .to(logoRef.current, { scale: 1.15, duration: 0.35, ease: 'power2.out' })
            .to(backgroundRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.15');
        }, 350);
      }
      setProgress(progressValue);
    }, 100);

    return () => {
      clearInterval(progressInterval);
      particles.forEach(particle => particle.remove());
    };
  }, [isDarkMode, onComplete]);

  return (
    <div 
      ref={backgroundRef}
      className="modern-preloader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: isDarkMode ? 'radial-gradient(120% 100% at 50% 20%, rgba(255,255,255,0.08), transparent 45%), #010101' : 'radial-gradient(120% 100% at 50% 20%, rgba(0,0,0,0.06), transparent 45%), #ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Logo Container */}
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <div
          ref={logoRef}
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <picture>
            <source srcSet="/logos/ams-logo.webp" type="image/webp" />
            <Image
              src="/logos/ams-logo.png"
              alt="AMS SYSTEMS"
              width={120}
              height={120}
              style={{
                filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) invert(0)',
                transition: 'filter 0.3s ease'
              }}
            />
          </picture>
        </div>
        
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(64,117,245,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(64,117,245,0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: -1
          }}
        />
      </div>

      {/* Progress Bar */}
      <div style={{ width: '200px', marginBottom: '1rem' }}>
        <div
          style={{
            width: '100%',
            height: '2px',
            background: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            borderRadius: '1px',
            overflow: 'hidden'
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4075f5 0%, #324ecb 100%)',
              borderRadius: '1px',
              transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)'
            }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <p
        style={{
          color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          fontSize: '0.9rem',
          fontWeight: '400',
          margin: 0,
          fontFamily: '"Causten Regular", sans-serif'
        }}
      >
        Cargando…
      </p>
    </div>
  );
};
