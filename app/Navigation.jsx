"use client";
import { ArrowUpRight, Sun, Moon, X } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from "./contexts/LanguageContext";
import { useTheme } from "./contexts/ThemeContext";

gsap.registerPlugin(CustomEase);

import amsContent from "./data/amsContent";
import amsContentEn from "./data/amsContentEn";

const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export const Navigation = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    // ANIMATIONS
    const navigationBar = useRef()
    const navigationBarCenter = useRef()
    const navigationBarCenterRef1 = useRef()
    const navigationBarCenterRef2 = useRef()
    const navigationBarCenterRef3 = useRef()
    const navigationBarCenterRef4 = useRef()
    const navigationBarCenterRef5 = useRef()
    const themeButtonRef = useRef()
    const languageButtonRef = useRef()
    const logoRef = useRef()
    const calendlyOverlayRef = useRef()
    const calendlyWidgetRef = useRef()
    const calendlyButtonRef = useRef()

    // CALENDLY STATE
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useLayoutEffect(() => {
        // Ensure navigation is visible by default
        if (navigationBar.current) {
            gsap.set(navigationBar.current, { 
                opacity: 1, 
                rotateY: "0deg", 
                scale: "1", 
                rotateX: "0deg", 
                translateY: "0vh" 
            });
        }
        
        // Fallback: Ensure navigation is visible even if GSAP fails
        const fallbackTimer = setTimeout(() => {
            if (navigationBar.current) {
                navigationBar.current.style.opacity = '1';
                navigationBar.current.style.transform = 'rotateY(0deg) scale(1) rotateX(0deg) translateY(0vh)';
            }
            if (navigationBarCenter.current) {
                navigationBarCenter.current.style.display = 'flex';
                navigationBarCenter.current.style.opacity = '1';
            }
            // Ensure all navigation items are visible
            [navigationBarCenterRef1, navigationBarCenterRef2, navigationBarCenterRef3, navigationBarCenterRef4, navigationBarCenterRef5].forEach(ref => {
                if (ref.current) {
                    ref.current.style.opacity = '1';
                }
            });
        }, 100);
        
        // Check if all refs exist before animating
        if (!navigationBar.current || !navigationBarCenter.current || !navigationBarCenterRef1.current || 
            !navigationBarCenterRef2.current || !navigationBarCenterRef3.current || 
            !navigationBarCenterRef4.current || !navigationBarCenterRef5.current) {
            return () => clearTimeout(fallbackTimer);
        }
        
        // Create a timeline for better control
        const tl = gsap.timeline({
            onComplete: () => clearTimeout(fallbackTimer)
        });
        
        // Start with navigation visible and animate the center elements
        tl.fromTo(navigationBarCenter.current, 
            { display: "flex" }, 
            { display: "flex", duration: 0.01, delay: 0.1 }
        )
        .set(navigationBarCenterRef1.current, { opacity: 1 }, 0.1)
        .set(navigationBarCenterRef2.current, { opacity: 1 }, 0.1)
        .set(navigationBarCenterRef3.current, { opacity: 1 }, 0.1)
        .set(navigationBarCenterRef4.current, { opacity: 1 }, 0.1)
        .set(navigationBarCenterRef5.current, { opacity: 1 }, 0.1);
        
        return () => clearTimeout(fallbackTimer);
    }, [])

    // NAVIGATION
    const router = useRouter();
    const { isSpanish, toggleLanguage, isAnimating, mounted } = useLanguage();
    
    // Use default Spanish content during SSR to prevent hydration mismatch
    const getContent = () => {
        if (!mounted) return amsContent;
        return isSpanish ? amsContent : amsContentEn;
    };
    const t = getContent();
  
    const handleNavigate = (path) => {
        router.push(path);
    };

    // CALENDLY FUNCTIONS
    useEffect(() => {
        // Dynamically load the Calendly script only if it doesn't exist
        if (!document.querySelector('script[src*="calendly"]')) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, []);

    // Initialize Calendly widget when overlay opens
    useEffect(() => {
        if (isCalendlyOpen && window.Calendly) {
            const calendarElement = calendlyWidgetRef.current?.querySelector('.calendly-inline-widget');
            if (calendarElement) {
                window.Calendly.initInlineWidget({
                    url: 'https://calendly.com/amssystems22/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=4075f5&locale=es',
                    parentElement: calendarElement
                });
            }
        }
    }, [isCalendlyOpen]);

    const toggleCalendly = () => {
        if (!isCalendlyOpen) {
            // Show overlay
            setIsCalendlyOpen(true);
            gsap.set(calendlyOverlayRef.current, { display: "flex" });
            gsap.to(calendlyOverlayRef.current, { 
                opacity: 1, 
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.fromTo(calendlyWidgetRef.current, 
                { yPercent: 10, rotate: 5, opacity: 0, scale: 0.9 },
                { yPercent: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.5, ease: customEase, delay: 0.1 }
            );
            gsap.fromTo(calendlyButtonRef.current, 
                { opacity: 0, scale: 0.5, rotate: 180 },
                { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: customEase, delay: 0.2 }
            );
        } else {
            // Hide overlay
            gsap.to(calendlyWidgetRef.current, { 
                yPercent: 10, 
                rotate: 5, 
                opacity: 0, 
                scale: 0.9,
                duration: 0.3, 
                ease: customEase 
            });
            gsap.to(calendlyButtonRef.current, { 
                opacity: 0, 
                scale: 0.5, 
                rotate: 180,
                duration: 0.3, 
                ease: customEase 
            });
            gsap.to(calendlyOverlayRef.current, { 
                delay: 0.1, 
                opacity: 0, 
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => { 
                    gsap.set(calendlyOverlayRef.current, { display: "none" });
                    setIsCalendlyOpen(false);
                }
            });
        }
    };

    const handleThemeToggle = () => {
        // Create page-wide explosion effect
        const explosion = document.createElement('div');
        explosion.style.position = 'fixed';
        explosion.style.top = '0';
        explosion.style.left = '0';
        explosion.style.width = '100vw';
        explosion.style.height = '100vh';
        explosion.style.background = isDarkMode 
            ? 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, transparent 70%)';
        explosion.style.zIndex = '9998';
        explosion.style.pointerEvents = 'none';
        explosion.style.opacity = '0';
        explosion.style.transform = 'scale(0)';
        document.body.appendChild(explosion);

        // Create floating particles across the page with smoother appearance
        const particles = [];
        const particleCount = 60; // Increased for more visual impact
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 12 + 6 + 'px'; // Slightly larger particles
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = isDarkMode ? '#ffffff' : '#000000';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.opacity = '0';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.boxShadow = `0 0 ${Math.random() * 30 + 15}px ${isDarkMode ? '#ffffff' : '#000000'}`;
            particle.style.filter = 'blur(0.5px)'; // Add subtle blur for smoother look
            document.body.appendChild(particle);
            particles.push(particle);
        }

        // Create animation timeline with smoother transitions
        const tl = gsap.timeline({
            onComplete: () => {
                explosion.remove();
                particles.forEach(particle => particle.remove());
            }
        });

        // Page explosion animation - smoother and more fluid
        tl.to(explosion, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
        }, 0)
        // Particles appear with smoother stagger
        .to(particles, {
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: {
                amount: 0.3,
                from: "random"
            }
        }, 0.1)
        // Change theme with smoother timing
        .call(() => {
            toggleTheme();
        }, null, 0.4)
        // Particles float and fade with more fluid motion
        .to(particles, {
            y: -80,
            x: (i) => (Math.random() - 0.5) * 150,
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: {
                amount: 0.4,
                from: "random"
            }
        }, 0.5)
        // Explosion fade out with smoother transition
        .to(explosion, {
            opacity: 0,
            scale: 1.1,
            duration: 0.6,
            ease: "power3.inOut"
        }, 0.8);
    };


    const handleLogoHover = () => {
        const tl = gsap.timeline({ defaults: { transformOrigin: "center center" } });
        
            tl.to(logoRef.current, {
            scale: 1.15,
            rotation: 8,
            duration: 0.18,
            ease: "back.out(2)" // entrada con rebote suave
            })
            .to(logoRef.current, {
            scale: 1.05,
            rotation: -4,
            duration: 0.14,
            ease: "power2.inOut"
            })
            .to(logoRef.current, {
            scale: 1.12,
            rotation: 2,
            duration: 0.16,
            ease: "elastic.out(1, 0.5)" // rebote elástico
            });
        };      

    const handleLogoLeave = () => {
        gsap.to(logoRef.current, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)"
        });
    };

    // Cambiar título cuando el usuario cambia de pestaña
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = "¡Volvé! Mira esto... 🚀";
            } else {
                document.title = isSpanish ? "AMS SYSTEMS | Desarrollo web, e-commerce y sistemas a medida" : "AMS SYSTEMS | Web development, e-commerce and custom systems";
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isSpanish]);

  return (
    <>
        <div className="navigation-wrapper">
            <div className="navigation-inside" ref={navigationBar} >
                <div className="navigation-inside-left">
                    <a href="/" aria-label="AMS Systems Home" onMouseEnter={handleLogoHover} onMouseLeave={handleLogoLeave}>
                        <Image 
                            ref={logoRef} 
                            src="/logos/ams-logo.png" 
                            className="navigation-inside-left-image logo-invert" 
                            alt="AMS SYSTEMS - Desarrollo Web Profesional en Argentina" 
                            width={300} 
                            height={300}
                            priority
                            style={{ height: '4.5vh', transition: 'all 0.3s ease', zIndex: 10000 }}
                        />
                    </a>
                </div>
                <div className="navigation-inside-big" ref={navigationBarCenter} style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
                    <button className="nav-pill opacity" ref={navigationBarCenterRef1} onClick={() => handleNavigate('/')} aria-label={t.nav.home} style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}><span>{t.nav.home}</span></button>
                    <button className="nav-pill opacity" ref={navigationBarCenterRef2} onClick={() => handleNavigate('/nosotros')} aria-label={t.nav.about} style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}><span>{t.nav.about}</span></button>
                    <button className="nav-pill opacity" ref={navigationBarCenterRef4} onClick={() => handleNavigate('/trabajos')} aria-label={t.nav.works} style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}><span>{t.nav.works}</span></button>
                    <button className="nav-pill opacity" ref={navigationBarCenterRef5} onClick={() => handleNavigate('/contacto')} aria-label={t.nav.contact} style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}><span>{t.nav.contact}</span></button>
                </div>
                <div className="navigation-inside-right">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <button 
                            ref={themeButtonRef}
                            aria-label="Toggle theme" 
                            className="button button-navigation button-transparent-border theme-toggle-button" 
                            onClick={handleThemeToggle}
                            style={{
                                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase'
                            }}
                        >
                            <div className="button-content">
                                <span className="small-description">{isDarkMode ? (isSpanish ? 'Modo Claro' : 'Light Mode') : (isSpanish ? 'Modo Oscuro' : 'Dark Mode')}</span>
                                <span className="small-description">{isDarkMode ? (isSpanish ? 'Modo Claro' : 'Light Mode') : (isSpanish ? 'Modo Oscuro' : 'Dark Mode')}</span>
                            </div>
                            <div className="button-circle button-circle-white theme-icon-container">
                                {isDarkMode ? <Sun className="button-icon" /> : <Moon className="button-icon" />}
                            </div>
                        </button>
                        <button 
                            ref={languageButtonRef}
                            aria-label="Toggle language" 
                            className="button button-navigation button-transparent-border" 
                            onClick={() => toggleLanguage(languageButtonRef)}
                            disabled={isAnimating}
                            style={{
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase'
                            }}
                        >
                            <div className="button-content">
                                <span className="small-description">{t.nav.toggleLabel}</span>
                                <span className="small-description">{t.nav.toggleLabel}</span>
                            </div>
                            <div className="button-circle button-circle-white">
                                <ArrowUpRight className="button-icon" />
                            </div>
                        </button>
                        <button className="button button-navigation button-primary" onClick={toggleCalendly}>
                            <div className="button-content">
                                <span className="small-description">{t.nav.cta}</span>
                                <span className="small-description">{t.nav.cta}</span>
                            </div>
                            <div className="button-circle" style={{ backgroundColor: 'white' }}>
                                <ArrowUpRight className="button-icon" style={{ color: '#324ecb' }} />
                            </div>
                        </button>
                    </div>
                </div>
                <MobileMenu 
                    t={t} 
                    onNavigate={handleNavigate} 
                    onToggleCalendly={toggleCalendly}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    isSpanish={isSpanish}
                    toggleLanguage={toggleLanguage}
                    isAnimating={isAnimating}
                />
            </div>
        </div>

        {/* Calendly Overlay - Moved outside navigation wrapper */}
        <div 
            className="calendly-overlay" 
            ref={calendlyOverlayRef} 
            style={{ 
                display: "none", 
                opacity: 0,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                zIndex: 9999,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2.5vh',
                padding: '2rem',
                cursor: 'pointer'
            }} 
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    toggleCalendly();
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    toggleCalendly();
                }
            }}
            tabIndex={-1}
            aria-label="Calendly overlay"
            role="dialog"
        >
            <div 
                className="calendly-overlay-widget" 
                ref={calendlyWidgetRef} 
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                style={{
                    height: '70vh',
                    maxWidth: '500px',
                    maxHeight: '600px',
                    minWidth: '320px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '25px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    width: '90%'
                }}
                tabIndex={-1}
                aria-label="Calendly widget"
                role="dialog"
            >
            <div 
                className="calendly-overlay-widget-border"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '25px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    pointerEvents: 'none',
                    boxShadow: 'inset 0 0 0 calc(1px + 0px) rgba(255, 255, 255, 0.075), inset 0 0 5vw rgba(255, 255, 255, 0.05)'
                }}
                role="none"
            />
                <div 
                    className="calendly-overlay-widget-scrollbar-hider"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '25px',
                        backgroundColor: '#1a1a1a',
                        zIndex: 99,
                        pointerEvents: 'none'
                    }}
                    role="none"
                />
                <div 
                    className="calendly-inline-widget" 
                    data-url="https://calendly.com/amssystems22/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=4075f5&locale=es"
                    style={{
                        height: '70vh',
                        minWidth: '320px',
                        maxWidth: '500px',
                        maxHeight: '600px',
                        width: '100%'
                    }}
                    role="none"
                />
            </div>
            <button 
                className="calendly-overlay-widget-button" 
                ref={calendlyButtonRef} 
                onClick={toggleCalendly}
                style={{
                    width: '3vw',
                    height: '3vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '100%',
                    backgroundColor: '#1a1a1a',
                    boxShadow: 'inset 0 0 0 calc(1px + 0px) rgba(255, 255, 255, 0.075), inset 0 0 2.5vw rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'background-color 0.5s ease',
                    minWidth: '48px',
                    minHeight: '48px',
                    border: 'none'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#222222';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1a1a1a';
                }}
                aria-label="Cerrar Calendly"
            >
                <X 
                    style={{
                        width: '1vw',
                        height: '1vw',
                        color: 'white',
                        transition: '0.5s ease',
                        minWidth: '16px',
                        minHeight: '16px'
                    }}
                />
            </button>
        </div>
    </>
  );
};

const MobileMenu = ({ t, onNavigate, onToggleCalendly, isDarkMode, toggleTheme, isSpanish, toggleLanguage, isAnimating }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const backgroundRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Menu animations
    useEffect(() => {
        if (isOpen) {
            // Show menu
            gsap.set(menuRef.current, { display: 'flex' });
            
            const tl = gsap.timeline();
            tl.to(backgroundRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            })
            .fromTo(menuItemsRef.current, {
                opacity: 0,
                y: 80,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.2)"
            }, "-=0.2")
            .fromTo(menuRef.current.querySelectorAll('.mobile-menu-toggle-button'), {
                opacity: 0,
                y: 20,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.2)"
            }, "-=0.3");
        } else {
            // Hide menu
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(menuRef.current, { display: 'none' });
                }
            });
            
            tl.to(menuItemsRef.current, {
                opacity: 0,
                y: 80,
                scale: 0.8,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            })
            .to(menuRef.current.querySelectorAll('.mobile-menu-toggle-button'), {
                opacity: 0,
                y: 20,
                scale: 0.9,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.in"
            }, "-=0.1")
            .to(backgroundRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            }, "-=0.1");
        }
    }, [isOpen]);

    const handleMenuItemClick = (action) => {
        setIsOpen(false);
        // Small delay to let the menu close animation start
        setTimeout(() => {
            action();
        }, 150);
    };

    const menuItems = [
        { 
            label: t.nav.home, 
            action: () => onNavigate('/')
        },
        { 
            label: t.nav.about, 
            action: () => onNavigate('/nosotros')
        },
        { 
            label: t.nav.works, 
            action: () => onNavigate('/trabajos')
        },
        { 
            label: t.nav.contact, 
            action: () => onNavigate('/contacto')
        },
        { 
            label: t.nav.cta, 
            action: onToggleCalendly,
            isHighlighted: true
        }
    ];

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="navigation-inside-right-mobile">
                <button 
                    ref={hamburgerRef}
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isOpen}
                    className="mobile-menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ zIndex: 10000 }}
                >
                    <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
                    <span className={`hamburger-line ${isOpen ? 'open' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                ref={menuRef}
                className="mobile-menu-overlay"
                style={{ zIndex: 9998 }}
            >
                {/* Background */}
                <button 
                    ref={backgroundRef}
                    className="mobile-menu-background"
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(30px)',
                        opacity: 0,
                        zIndex: -1,
                        border: 'none',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer'
                    }}
                />

                {/* Menu Content */}
                <div className="mobile-menu-content">
                    {menuItems.map((item, index) => (
                        <button
                            key={`menu-item-${item.label}-${index}`}
                            ref={el => menuItemsRef.current[index] = el}
                            onClick={() => handleMenuItemClick(item.action)}
                            className={`mobile-menu-item ${item.isHighlighted ? 'highlighted' : ''}`}
                            style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}
                        >
                            <span className="mobile-menu-item-label" style={{ fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}>{item.label}</span>
                        </button>
                    ))}
                    
                    {/* Toggle Buttons */}
                    <div className="mobile-menu-toggle-buttons">
                        <button 
                            className="mobile-menu-toggle-button"
                            onClick={() => handleMenuItemClick(toggleTheme)}
                            style={{
                                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)'
                            }}
                        >
                            <div className="mobile-menu-toggle-icon">
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </div>
                            <span className="mobile-menu-toggle-label">
                                {isDarkMode ? (isSpanish ? 'MODO CLARO' : 'LIGHT MODE') : (isSpanish ? 'MODO OSCURO' : 'DARK MODE')}
                            </span>
                        </button>
                        
                        <button 
                            className="mobile-menu-toggle-button"
                            onClick={() => handleMenuItemClick(() => toggleLanguage(hamburgerRef))}
                            disabled={isAnimating}
                            style={{
                                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)'
                            }}
                        >
                            <div className="mobile-menu-toggle-icon">
                                <ArrowUpRight size={20} />
                            </div>
                            <span className="mobile-menu-toggle-label">
                                {t.nav.toggleLabel}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

MobileMenu.propTypes = {
    t: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    onToggleCalendly: PropTypes.func.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    isSpanish: PropTypes.bool.isRequired,
    toggleLanguage: PropTypes.func.isRequired,
    isAnimating: PropTypes.bool.isRequired
};