/* eslint-disable react/jsx-key */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PrevButton, NextButton, usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons"
import useEmblaCarousel from "embla-carousel-react"
import { Send, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionTestimonials = () => {
    const { isSpanish } = useLanguage();
    const t = isSpanish ? amsContent : amsContentEn;

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const emblaWrapperRef = useRef()
    
    // CALENDLY STATE
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const calendlyOverlayRef = useRef();
    const calendlyWidgetRef = useRef();
    const calendlyButtonRef = useRef();

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
                { yPercent: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
            );
            gsap.fromTo(calendlyButtonRef.current, 
                { opacity: 0, scale: 0.5, rotate: 180 },
                { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
            );
        } else {
            // Hide overlay
            gsap.to(calendlyWidgetRef.current, { 
                yPercent: 10, 
                rotate: 5, 
                opacity: 0, 
                scale: 0.9,
                duration: 0.3, 
                ease: "power2.in" 
            });
            gsap.to(calendlyButtonRef.current, { 
                opacity: 0, 
                scale: 0.5, 
                rotate: 180,
                duration: 0.3, 
                ease: "power2.in" 
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

    // GSAP ANIMATIONS

    useEffect(() => {

        // subheadline box animation
        gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

        // headline text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.05, duration: 0.75, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

        // embla wrapper animation
        gsap.to(emblaWrapperRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: emblaWrapperRef.current, start: "top 95%" }});

    }, [])

    // EMBLA CAROUSEL

    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true})
    const [scrollProgress, setScrollProgress] = useState(0)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const onScroll = useCallback((emblaApi) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
        setScrollProgress(progress * 100)
    }, [])

    useEffect(() => {
        if (!emblaApi) return
    
        onScroll(emblaApi)
        emblaApi
          .on("reInit", onScroll)
          .on("scroll", onScroll)
          .on("slideFocus", onScroll)
    }, [emblaApi, onScroll])

  return (
    <section className="testimonials">
    <div className="testimonials-content">
        <div className="textbox testimonials-content-textbox">
            <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                <Send className="subheadline-box-icon" />
                <h2 className="small-description grey" >{t.home.testimonials.label}</h2>
            </div>
            <div className="titlebox">
                <div className="titlebox-big-gradient" />
                <h1 className="subheadline white" ref={titleRef} >{t.home.testimonials.title}</h1>
            </div>
        </div>
        <div className="opacity-blur" ref={emblaWrapperRef} >
            <div className="testimonials-carousel" ref={emblaRef} >
                <div className="testimonials-carousel-row">
                    <div className="testimonials-item-padding" />
                    {t.home.testimonials.items.map((testimonial, index) => (
                        <div key={`testimonial-${testimonial.name}-${index}`} className="testimonials-item" >
                            <div className="testimonials-item-content">
                                <div className="testimonials-item-profile">
                                    <img src="/images/icono_user.png" alt={testimonial.name} />
                                </div>
                                <div className="testimonials-item-center">
                                    <p className="big-description white" >{testimonial.name}</p>
                                    <p className="description grey" >{testimonial.role}</p>
                                </div>
                                <p className="description white" >{testimonial.testimonial}</p>
                            </div>
                            <div className="testimonials-item-grid" />
                        </div>
                    ))}
                    <div className="testimonials-item testimonials-item-last" >
                        <div className="testimonials-item-content testimonials-item-content-last">
                            <div className="testimonials-item-last-top">
                                <p className="description white" >{t.home.testimonials.lastItem.title}</p>
                            </div>
                            <p className="small-subheadline white" >{t.home.testimonials.lastItem.subtitle}</p>
                            <div className="contact-button-wrapper">
                                <button className="contact-button-white" onClick={toggleCalendly}>
                                    <span>
                                        <span className="contact-button-container-white">
                                            <span className="contact-button-primary-white"></span>
                                            <span className="contact-button-complimentary-white"></span>
                                        </span>
                                    </span>
                                    <span className="description black" >{t.home.testimonials.cta}</span>
                                </button>
                            </div>
                        </div>
                        <div className="background-gradient-circle-3" />
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item-padding" />
                </div>
            </div>
        </div>

        <div className="testimonials-content-bottom">
            <div className="testimonials-content-bottom-buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
            <div className="embla__progress">
                <div
                    className="embla__progress__bar"
                    style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                />
            </div>
        </div>
    </div>

    {/* Calendly Overlay */}
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
</section>
  );
};