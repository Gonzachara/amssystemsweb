"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from 'lenis/react'
import "./about.css";
import { SectionFooter } from "../Main/SectionFooter";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText, ScrollTrigger } from "gsap/all";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";
import { Target, Lightbulb, Heart, UsersRound, ArrowUpRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
 

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

// Client-only wrapper to prevent hydration issues
const ClientOnlyAboutPage = () => {
    const { isSpanish, mounted } = useLanguage();
    const router = useRouter();
    const [animationsReady, setAnimationsReady] = useState(false);
    
    // Always use Spanish content for SSR consistency
    const getContent = () => {
        if (!mounted) return amsContent;
        return isSpanish ? amsContent : amsContentEn;
    };
    const t = getContent();
    
    // Refs
    const heroTitleRef = useRef(null);
    const heroDescriptionRef = useRef(null);
    const heroImageRef = useRef(null);
    const statsRef = useRef(null);
    const valuesRef = useRef(null);
    const valuesGroupRef = useRef(null);
    const valueCardsRef = useRef([]);
    const processRef = useRef(null);
    const ctaRef = useRef(null);
    const sectionRefs = useRef([]);
    const cardRefs = useRef([]);
    const loopingWordsRef = useRef(null);
    const wordListRef = useRef(null);
    const edgeElementRef = useRef(null);

    // Client-side check
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationsReady(true);
            // Refresh ScrollTrigger after animations are ready
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    // Ensure body can scroll on About page
    useEffect(() => {
        document.body.classList.add('about-page');
        
        // Force enable scrolling as fallback
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        return () => {
            document.body.classList.remove('about-page');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    // Data with proper translation support - always return same structure
    const getStats = () => {
        const spanishStats = [
            { number: "30", suffix: "+", label: "Proyectos completados" },
            { number: "5", suffix: " años", label: "De experiencia en el mercado" },
            { number: "100", suffix: "%", label: "Clientes satisfechos" }
        ];
        
        const englishStats = [
            { number: "30", suffix: "+", label: "Completed projects" },
            { number: "5", suffix: " years", label: "Market experience" },
            { number: "100", suffix: "%", label: "Satisfied clients" }
        ];
        
        return (!mounted || isSpanish) ? spanishStats : englishStats;
    };

    const getValues = () => {
        const spanishValues = [
            {
                key: 'results',
                icon: <Target className="value-icon" />,
                title: "Enfoque en Resultados",
                description: "Cada proyecto está diseñado para generar valor real y medible para tu negocio.",
                image: "/images/opcion_3.jpg"
            },
            {
                key: 'innovation',
                icon: <Lightbulb className="value-icon" />,
                title: "Innovación Constante",
                description: "Utilizamos las últimas tecnologías y metodologías para mantenerte a la vanguardia.",
                image: "/images/opcion_3.jpg"
            },
            {
                key: 'excellence',
                icon: <Heart className="value-icon" />,
                title: "Pasión por la Excelencia",
                description: "No nos conformamos con lo bueno, siempre buscamos la excelencia en cada detalle.",
                image: "/images/opcion_3.jpg"
            },
            {
                key: 'teamwork',
                icon: <UsersRound className="value-icon" />,
                title: "Trabajo en Equipo",
                description: "Creemos en la colaboración y en construir relaciones duraderas con nuestros clientes.",
                image: "/images/opcion_3.jpg"
            }
        ];

        const englishValues = [
            {
                key: 'results',
                icon: <Target className="value-icon" />,
                title: "Results Focused",
                description: "Every project is designed to generate real and measurable value for your business.",
                image: "/images/mockup11.webp"
            },
            {
                key: 'innovation',
                icon: <Lightbulb className="value-icon" />,
                title: "Constant Innovation",
                description: "We use the latest technologies and methodologies to keep you at the forefront.",
                image: "/images/mockup12.webp"
            },
            {
                key: 'excellence',
                icon: <Heart className="value-icon" />,
                title: "Passion for Excellence",
                description: "We don't settle for good, we always seek excellence in every detail.",
                image: "/images/mockup3.webp"
            },
            {
                key: 'teamwork',
                icon: <UsersRound className="value-icon" />,
                title: "Teamwork",
                description: "We believe in collaboration and building lasting relationships with our clients.",
                image: "/images/mockup4.webp"
            }
        ];

        return (!mounted || isSpanish) ? spanishValues : englishValues;
    };

    const getProcess = () => {
        const spanishProcess = [
            {
                step: "01",
                title: "Descubrimiento",
                description: "Entendemos tu negocio, objetivos y desafíos para crear la estrategia perfecta."
            },
            {
                step: "02", 
                title: "Diseño",
                description: "Creamos soluciones visuales y funcionales que conectan con tu audiencia."
            },
            {
                step: "03",
                title: "Desarrollo",
                description: "Construimos tu proyecto con código limpio, escalable y optimizado."
            },
            {
                step: "04",
                title: "Lanzamiento",
                description: "Desplegamos tu proyecto y te acompañamos en el crecimiento sostenible."
            }
        ];
        
        const englishProcess = [
            {
                step: "01",
                title: "Discovery",
                description: "We understand your business, goals and challenges to create the perfect strategy."
            },
            {
                step: "02", 
                title: "Design",
                description: "We create visual and functional solutions that connect with your audience."
            },
            {
                step: "03",
                title: "Development",
                description: "We build your project with clean, scalable and optimized code."
            },
            {
                step: "04",
                title: "Launch",
                description: "We deploy your project and accompany you in sustainable growth."
            }
        ];
        
        return (!mounted || isSpanish) ? spanishProcess : englishProcess;
    };

    const getTexts = () => {
        return {
            heroTitle: (!mounted || isSpanish) ? "Conocenos" : "Meet us",
            valuesTitle: (!mounted || isSpanish) ? "Nuestros Valores" : "Our Values",
            valuesDescription: (!mounted || isSpanish) 
                ? "Los principios que guían cada decisión y cada proyecto que desarrollamos."
                : "The principles that guide every decision and every project we develop.",
            processTitle: (!mounted || isSpanish) ? "Nuestro Proceso" : "Our Process",
            processDescription: (!mounted || isSpanish)
                ? "Una metodología probada que garantiza resultados excepcionales en cada proyecto."
                : "A proven methodology that guarantees exceptional results in every project.",
            ctaTitle1: (!mounted || isSpanish) ? "¿Listo para trabajar" : "Ready to work",
            ctaTitle2: (!mounted || isSpanish) ? " juntos?" : " together?",
            ctaDescription: (!mounted || isSpanish)
                ? "Hablemos sobre cómo podemos llevar tu proyecto al siguiente nivel."
                : "Let's talk about how we can take your project to the next level.",
            startProject: (!mounted || isSpanish) ? "Iniciar Proyecto" : "Start Project",
            viewWork: (!mounted || isSpanish) ? "Ver Trabajos" : "View Work"
        };
    };

    const stats = getStats();
    const values = getValues();
    const process = getProcess();
    const texts = getTexts();

    // (Removed mini-rotator covers)

    // Hero animations
    useEffect(() => {
        if (!animationsReady) return;

        const tl = gsap.timeline();
        
        if (heroTitleRef.current) {
            try {
                if (typeof SplitText !== 'undefined') {
                    const titleSplit = new SplitText(heroTitleRef.current, { type: "chars" });
                    tl.fromTo(titleSplit.chars, 
                        { opacity: 0, y: 100, filter: "blur(10px)" },
                        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.02, ease: "power3.out" }
                    );
                } else {
                    tl.fromTo(heroTitleRef.current,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                    );
                }
            } catch (error) {
                console.warn('SplitText animation failed:', error);
                tl.fromTo(heroTitleRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                );
            }
        }

        if (heroDescriptionRef.current) {
            tl.fromTo(heroDescriptionRef.current,
                { opacity: 0, y: 30, filter: "blur(5px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
                "-=0.3"
            );
        }

        if (heroImageRef.current) {
            tl.fromTo(heroImageRef.current,
                { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
                "-=0.2"
            );
        }

        return () => {
            tl.kill();
        };
    }, [animationsReady]);

    // Values expanding cards (inspired by idea 1)
    useEffect(() => {
        if (!animationsReady || !valuesGroupRef.current) return;
        const cards = valueCardsRef.current.filter(Boolean);
        if (!cards.length) return;

        cards.forEach((card) => {
            card.clicked = false;
            card.classList.remove('expanded');
        });

        const expand = (clickedCard) => {
            cards.forEach((c) => {
                if (c !== clickedCard) {
                    c.clicked = false;
                    c.classList.remove('expanded');
                }
            });

            gsap.to(cards, {
                width: clickedCard.clicked ? '15vw' : '8vw',
                duration: 1.2,
                ease: 'elastic(1, .6)'
            });

            clickedCard.clicked = !clickedCard.clicked;
            clickedCard.classList.toggle('expanded', clickedCard.clicked);

            gsap.to(clickedCard, {
                width: clickedCard.clicked ? '42vw' : '15vw',
                duration: 1.5,
                ease: 'elastic(1, .3)'
            });
        };

        const handlers = cards.map((card) => {
            const onClick = () => expand(card);
            card.addEventListener('click', onClick);
            return () => card.removeEventListener('click', onClick);
        });

        // Responsive: reset widths on small screens
        const mq = window.matchMedia('(max-width: 768px)');
        const resetMobile = () => {
            if (mq.matches) {
                // On mobile, make cards full-width and show content
                gsap.set(cards, { clearProps: 'width' });
                cards.forEach((c) => {
                    c.clicked = true;
                    c.classList.add('expanded');
                });
            } else {
                // On desktop, collapse all
                cards.forEach((c) => {
                    c.clicked = false;
                    c.classList.remove('expanded');
                });
                gsap.set(cards, { width: '15vw' });
            }
        };
        resetMobile();
        mq.addEventListener?.('change', resetMobile);

        return () => {
            handlers.forEach((off) => off());
            mq.removeEventListener?.('change', resetMobile);
        };
    }, [animationsReady, values]);

    // (Removed mini-rotator behavior)

    // Stats counter animation
    useEffect(() => {
        if (!animationsReady || !statsRef.current) return;

        const numbers = statsRef.current.querySelectorAll('.stat-number');
        const animations = [];
        
        numbers.forEach((number) => {
            const finalValue = number.getAttribute('data-value');
            if (!finalValue) return;
            
            const animation = gsap.fromTo(number, 
                { textContent: 0 },
                {
                    textContent: finalValue,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: number,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            animations.push(animation);
        });

        return () => {
            animations.forEach(animation => animation.kill());
        };
    }, [animationsReady]);

    // Section scroll animations
    useEffect(() => {
        if (!animationsReady) return;

        const animations = [];

        sectionRefs.current.forEach((section) => {
            if (section) {
                const animation = gsap.fromTo(section,
                    { opacity: 0, y: 100, filter: "blur(10px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                animations.push(animation);
            }
        });

        return () => {
            animations.forEach(animation => animation.kill());
        };
    }, [animationsReady]);

    // Card animations
    useEffect(() => {
        if (!animationsReady) return;

        const animations = [];

        cardRefs.current.forEach((card, index) => {
            if (card) {
                const animation = gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power2.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "bottom 10%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
                animations.push(animation);
            }
        });

        return () => {
            animations.forEach(animation => animation.kill());
        };
    }, [animationsReady]);

    // Looping words animation
    useEffect(() => {
        if (!animationsReady || !wordListRef.current || !edgeElementRef.current) return;

        const wordList = wordListRef.current;
        const words = Array.from(wordList.children);
        const totalWords = words.length;
        const wordHeight = 100 / totalWords;
        const edgeElement = edgeElementRef.current;
        let currentIndex = 0;
        let timeline;

        const updateEdgeWidth = () => {
            const centerIndex = (currentIndex + 1) % totalWords;
            const centerWord = words[centerIndex];
            if (!centerWord || !wordList) return;
            
            const centerWordWidth = centerWord.getBoundingClientRect().width;
            const listWidth = wordList.getBoundingClientRect().width;
            
            if (listWidth > 0) {
                const percentageWidth = (centerWordWidth / listWidth) * 100;
                
                gsap.to(edgeElement, {
                    width: `${percentageWidth}%`,
                    duration: 0.5,
                    ease: 'expo.out',
                });
            }
        };

        const moveWords = () => {
            currentIndex++;
            gsap.to(wordList, {
                yPercent: -wordHeight * currentIndex,
                duration: 1.2,
                ease: 'elastic.out(1, 0.85)',
                onStart: updateEdgeWidth,
                onComplete: function() {
                    if (currentIndex >= totalWords - 3) {
                        wordList.appendChild(wordList.children[0]);
                        currentIndex--;
                        gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
                        words.push(words.shift());
                    }
                }
            });
        };

        setTimeout(() => {
            if (wordList && edgeElement) {
                updateEdgeWidth();
                timeline = gsap.timeline({ repeat: -1, delay: 1 });
                timeline.call(moveWords).to({}, { duration: 2 }).repeat(-1);
            }
        }, 500);

        return () => {
            if (timeline) timeline.kill();
        };
    }, [animationsReady]);

    // Gallery parallax animation
    useEffect(() => {
        if (!animationsReady) return;

        const galleryWrapper = document.querySelector('.about-gallery-wrapper');
        if (!galleryWrapper) return;

        const animation = gsap.to(galleryWrapper, {
            x: () => -(galleryWrapper.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-gallery',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        return () => {
            animation.kill();
        };
    }, [animationsReady]);

    // Add navigation handlers
    const handleNavigate = (path) => {
        router.push(path);
    };

    // Cleanup ScrollTrigger on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);
    
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, orientation: 'vertical', gestureOrientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 2 }}>
            <section className="about-modern">
                {/* Hero Section */}
                <div className="about-hero">
                    <div className="about-hero-content">
                            <div className="about-hero-text">
                                <div className="hero-titlebox">
                                    <div className="hero-titlebox-gradient" />
                                        <h1 className="headline hero-headline white" ref={heroTitleRef}>
                                            {texts.heroTitle}
                                        </h1>
                                    </div>
                                    <p className="big-description grey opacity-blur" ref={heroDescriptionRef}>
                                        {t.home?.hero?.description || "Desarrollo y sistemas digitales"}
                                    </p>
                            </div>
                        <div className="about-hero-image" ref={heroImageRef}>
                            <Image 
                                src="/models/mascota_ams.png" 
                                alt="AMS Systems Team" 
                                priority
                                width={500} 
                                height={500}
                            />
                        </div>
                    </div>
                </div>

                {/* Looping Words Section */}
                <div className="about-looping-words" ref={loopingWordsRef}>
                    <div className="looping-words">
                        <div className="looping-words__containers">
                            <ul ref={wordListRef} className="looping-words__list">
                                <li className="looping-words__item">
                                    <p className="looping-words__p">Desarrollo</p>
                                </li>
                                <li className="looping-words__item">
                                    <p className="looping-words__p">E-commerce</p>
                                </li>
                                <li className="looping-words__item">
                                    <p className="looping-words__p">Sistemas</p>
                                </li>
                                <li className="looping-words__item">
                                    <p className="looping-words__p">Innovación</p>
                                </li>
                                <li className="looping-words__item">
                                    <p className="looping-words__p">Resultados</p>
                                </li>
                            </ul>
                        </div>
                        <div className="looping-words__fade"></div>
                        <div ref={edgeElementRef} className="looping-words__selector">
                            <div className="looping-words__edge"></div>
                            <div className="looping-words__edge is--2"></div>
                            <div className="looping-words__edge is--3"></div>
                            <div className="looping-words__edge is--4"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="about-stats" ref={statsRef}>
                    <div className="about-stats-grid">
                        {stats.map((stat, index) => (
                            <div key={`stat-${stat.number}-${index}`} className="about-stat-item" ref={el => cardRefs.current[index] = el}>
                                <div className="about-stat-number">
                                    <span className="stat-number" data-value={stat.number}>{stat.number}</span>
                                    <span className="stat-suffix">{stat.suffix}</span>
                                </div>
                                <p className="about-stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section (reimagined) */}
                <div className="about-values" ref={valuesRef}>
                    <div className="about-section-header" ref={el => sectionRefs.current[0] = el}>
                        <div className="titlebox">
                            <div className="titlebox-medium-gradient" />
                            <h2 className="subheadline white">
                                {texts.valuesTitle}
                            </h2>
                        </div>
                        <p className="about-values-description">
                            {texts.valuesDescription}
                        </p>
                    </div>

                    {/* Expanding cards gallery */}
                    <div className="values-gallery" ref={valuesGroupRef}>
                        <div className="values-group">
                            {values.map((value, index) => (
                                <div
                                    key={`value-card-${value.key}-${index}`}
                                    className="value-card"
                                    ref={el => (valueCardsRef.current[index] = el)}
                                    style={{ backgroundImage: `url(${value.image})` }}
                                >
                                    <div className="value-card-overlay">
                                        <div className="value-card-content">
                                            <div className="value-card-icon">{value.icon}</div>
                                            <h3 className="value-card-title">{value.title}</h3>
                                        </div>
                                        <div className="value-card-texts">
                                            <p className="value-card-desc">{value.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Portfolio Photo Section */}
                <div className="about-portfolio" ref={el => sectionRefs.current[3] = el}>
                    <div className="portfolio-photo-wrapper">
                        <div className="portfolio-photo">
                            {/* Dark mode photo (default) */}
                            <Image
                                src="/images/gonza_portfolio_oscuro.png"
                                alt="Gonzalo — Portfolio"
                                loading="lazy"
                                fill
                                sizes="(max-width: 768px) 80vw, 40vw"
                                className="portfolio-img portfolio-img--dark"
                                style={{ objectFit: 'cover' }}
                            />
                            {/* Light mode photo */}
                            <Image
                                src="/images/gonza_portfolio_claro.png"
                                alt="Gonzalo — Portfolio (Light)"
                                loading="lazy"
                                fill
                                sizes="(max-width: 768px) 80vw, 40vw"
                                className="portfolio-img portfolio-img--light"
                                style={{ objectFit: 'cover' }}
                            />

                            <div className="portfolio-name">
                                <h3>GONZALO CHIARADIA</h3>
                                <p>Desarrollador Web</p>
                            </div>

                            <div className="portfolio-socials">
                                <a href="https://www.linkedin.com/in/gonzalochiaradia/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="portfolio-social">
                                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                        <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.34 8.98h4.79v2.05h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 5.99 3.33 5.99 7.66V24h-5v-6.74c0-1.61-.03-3.69-2.25-3.69-2.25 0-2.6 1.76-2.6 3.58V24h-5V8.98z"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/gonzaachara" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="portfolio-social">
                                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                        <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.36 1.23-3.19-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.29 1.22a11.4 11.4 0 0 1 6 0C16.3 5.7 17.3 6.02 17.3 6.02c.65 1.64.24 2.86.12 3.16.76.83 1.23 1.9 1.23 3.19 0 4.58-2.81 5.59-5.49 5.89.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5"/>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/gonzaachara" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="portfolio-social">
                                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                        <path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.9.25 2.3.42.6.24 1 .53 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.42-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.9.42-2.3.24-.6.53-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4.1.6c-.8.3-1.5.7-2.1 1.3C1.3 2.5.9 3.2.6 4c-.3.7-.5 1.6-.5 2.9C0 8.2 0 8.7 0 12c0 3.3 0 3.8.1 5.1.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.3 2.1.6.6 1.3 1 2.1 1.3.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5.1.1s3.8 0 5.1-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.1-1.3.6-.6 1-1.3 1.3-2.1.3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5.1s0-3.8-.1-5.1c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.3-2.1-.6-.6-1.3-1-2.1-1.3-.7-.3-1.6-.5-2.9-.6C15.8 0 15.3 0 12 0z"/>
                                        <path fill="currentColor" d="M12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 1 0 12 5.8m0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                                        <circle cx="18.4" cy="5.6" r="1.2" fill="currentColor"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section with Parallax */}
                <div className="about-gallery">
                    <div className="about-gallery-wrapper">
                        <div className="about-gallery-item">
                            <Image 
                                src="/images/mockup11.webp" 
                                alt="Proyecto 1" 
                                loading="lazy" 
                                width={800} 
                                height={600}
                            />
                        </div>
                        <div className="about-gallery-item">
                            <Image 
                                src="/images/mockup12.webp" 
                                alt="Proyecto 2" 
                                loading="lazy" 
                                width={800} 
                                height={600}
                            />
                        </div>
                        <div className="about-gallery-item">
                            <Image 
                                src="/images/mockup3.webp" 
                                alt="Proyecto 3" 
                                loading="lazy" 
                                width={800} 
                                height={600}
                            />
                        </div>
                        <div className="about-gallery-item">
                            <Image 
                                src="/images/mockup4.webp" 
                                alt="Proyecto 4" 
                                loading="lazy" 
                                width={800} 
                                height={600}
                            />
                        </div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="about-process" ref={processRef}>
                    <div className="about-section-header" ref={el => sectionRefs.current[1] = el}>
                        <div className="titlebox">
                            <div className="titlebox-medium-gradient" />
                            <h2 className="subheadline white">
                                {texts.processTitle}
                            </h2>
                        </div>
                        <p className="description grey" style={{textAlign: "left"}}>
                            {texts.processDescription}
                        </p>
                    </div>
                    <div className="about-process-timeline">
                        {process.map((step, index) => (
                            <div key={`process-${step.step}-${index}`} className="about-process-step" ref={el => cardRefs.current[index + 8] = el}>
                                <div className="about-process-number">{step.step}</div>
                                <div className="about-process-content">
                                    <h3 className="small-subheadline white">{step.title}</h3>
                                    <p className="description grey">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="about-cta" ref={ctaRef}>
                    <div className="about-cta-content" ref={el => sectionRefs.current[2] = el}>
                        <div className="about-cta-title">
                            <h2 className="about-cta-headline">
                                <span className="about-cta-text-white">
                                    {texts.ctaTitle1}
                                </span>
                                <span className="about-cta-text-grey">
                                    {texts.ctaTitle2}
                                </span>
                            </h2>
                        </div>
                        <p className="about-cta-description">
                            {texts.ctaDescription}
                        </p>
                        <div className="about-cta-buttons">
                            <button className="button button-transparent-border" onClick={() => handleNavigate('/contacto')}>
                                <div className="button-content">
                                    <span className="small-description">{texts.startProject}</span>
                                    <span className="small-description">{texts.startProject}</span>
                                </div>
                                <div className="button-circle">
                                    <ArrowUpRight className="button-icon button-icon-180" />
                                </div>
                            </button>
                            <button className="button button-transparent-border" onClick={() => handleNavigate('/trabajos')}>
                                <div className="button-content">
                                    <span className="small-description">{texts.viewWork}</span>
                                    <span className="small-description">{texts.viewWork}</span>
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

export const AboutPageSection = ClientOnlyAboutPage;
export default AboutPageSection;