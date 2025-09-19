"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

export const CalendlyPopup = ({ isOpen, onClose }) => {
  const overlayRef = useRef();
  const widgetRef = useRef();
  const closeButtonRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Load Calendly script if not already loaded
      if (!window.Calendly) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(link);
      }

      // Animate in
      const tl = gsap.timeline();
      tl.set([overlayRef.current, widgetRef.current], { opacity: 0, scale: 0.8 })
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(widgetRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, "-=0.2");
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    
    tl.to(widgetRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="calendly-overlay" 
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div 
        ref={widgetRef}
        className="calendly-overlay-widget" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '600px',
          background: '#1a1a1a',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="calendly-overlay-widget-border" />
        <div className="calendly-overlay-widget-scrollbar-hider" />
        <div 
          ref={closeButtonRef}
          className="calendly-overlay-widget-button" 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <X size={20} color="white" />
        </div>
        
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/amssystems22/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=9b92a2&locale=es"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '20px'
          }}
        />
      </div>
    </div>
  );
};
