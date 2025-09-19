"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import gsap from "gsap";

const LanguageContext = createContext({
  language: "es",
  isSpanish: true,
  isEnglish: false,
  toggleLanguage: () => {},
  isAnimating: false,
  mounted: false,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // hydrate from localStorage without FOUC
  useEffect(() => {
    setMounted(true);
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("ams-language") : null;
      if (stored === "es" || stored === "en") setLanguage(stored);
    } catch {}
  }, []);

  const toggleLanguage = (buttonRef) => {
    if (isAnimating) return;
  
    setIsAnimating(true);
  
    // Create blur overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.backdropFilter = "blur(20px)";
    overlay.style.zIndex = "9998";
    overlay.style.opacity = "0";
    document.body.appendChild(overlay);
  
    // Create centered language display
    const languageDisplay = document.createElement("div");
    languageDisplay.style.position = "fixed";
    languageDisplay.style.top = "50%";
    languageDisplay.style.left = "50%";
    languageDisplay.style.transform = "translate(-50%, -50%)";
    languageDisplay.style.zIndex = "9999";
    languageDisplay.style.pointerEvents = "none";
    languageDisplay.style.opacity = "0";
    languageDisplay.style.display = "flex";
    languageDisplay.style.flexDirection = "column";
    languageDisplay.style.alignItems = "center";
    languageDisplay.style.gap = "1rem";
  
    // Create flag image - show the language we're switching TO
    const flag = document.createElement("img");
    flag.src = language === "es" ? "/flags/usa.png" : "/flags/argentina.png";
    flag.alt = language === "es" ? "Flag of USA" : "Bandera de Argentina";
    flag.style.width = "80px";
    flag.style.height = "60px";
    flag.style.objectFit = "cover";
    flag.style.borderRadius = "8px";
    flag.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    flag.style.transform = "scale(0)";

    // Create text element - show the language we're switching TO
    const textEl = document.createElement("div");
    textEl.textContent = language === "es" ? "ENGLISH" : "ESPAÑOL";
    textEl.style.fontSize = "2rem";
    textEl.style.fontWeight = "bold";
    textEl.style.color = "#fff";
    textEl.style.textShadow = "0 2px 10px rgba(0,0,0,0.3)";
    textEl.style.transform = "scale(0)";
  
    languageDisplay.appendChild(flag);
    languageDisplay.appendChild(textEl);
    document.body.appendChild(languageDisplay);
  
    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up
        overlay.remove();
        languageDisplay.remove();
        setIsAnimating(false);
      },
    });
  
    // Animate overlay
    tl.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
    // Show language display
    .to(languageDisplay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    }, 0.1)
    // Animate flag and text
    .to([flag, textEl], {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, 0.2)
    // Change language
    .call(() => {
      setLanguage((prev) => {
        const next = prev === "es" ? "en" : "es";
        try { window.localStorage.setItem("ams-language", next); } catch {}
        return next;
      });
    }, null, 0.8)
    // Animate out
    .to([flag, textEl], {
      scale: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 1.0)
    .to(languageDisplay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 1.0)
    // Fade out overlay
    .to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 1.2);
  };

  const value = useMemo(() => ({
    language,
    isSpanish: language === "es",
    isEnglish: language === "en",
    toggleLanguage,
    isAnimating,
    mounted,
  }), [language, isAnimating, mounted, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


