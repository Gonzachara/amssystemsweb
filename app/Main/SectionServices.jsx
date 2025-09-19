"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Zap } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionServices = () => {
  const { isSpanish } = useLanguage();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  
  const cardsRef = useRef();
  const overlayRef = useRef();
  const overlayWidgetRef = useRef();
  const overlayWidgetButtonRef = useRef();
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const t = isSpanish ? amsContent : amsContentEn;

  // Define translations for the section
  const sectionContent = {
    spanish: {
      shortLabel: "Nuestros Servicios",
      shortTitle: "Soluciones Web que Impulsan tu Negocio",
      description: "Desarrollamos sitios web y sistemas personalizados que convierten visitantes en clientes y optimizan tus procesos de negocio."
    },
    english: {
      shortLabel: "Our Services",
      shortTitle: "Web Solutions that Drive Your Business",
      description: "We develop websites and custom systems that convert visitors into customers and optimize your business processes."
    }
  };

  const currentContent = isSpanish ? sectionContent.spanish : sectionContent.english;
  const { shortLabel, shortTitle } = currentContent;

  const services = isSpanish
    ? [
        {
          title: "LANDING PAGES",
          description: "Páginas de alta conversión que transforman visitantes en clientes.",
          details: [
            "Diseño optimizado para conversión",
            "A/B testing integrado",
            "Formularios inteligentes",
            "Analytics en tiempo real"
          ],
          image: "/images/mockup11.webp",
          altImage: "/images/mockup12.webp"
        },
        {
          title: "E-COMMERCE",
          description: "Tiendas online que venden 24/7 con la mejor experiencia de usuario.",
          details: [
            "Catálogo ilimitado de productos",
            "Procesamiento de pagos seguro",
            "Gestión de inventario automática",
            "Optimización SEO avanzada"
          ],
          image: "/images/mockup3.webp",
          altImage: "/images/mockup4.webp"
        },
        {
          title: "SISTEMAS A MEDIDA",
          description: "Soluciones personalizadas que se adaptan perfectamente a tu negocio.",
          details: [
            "Desarrollo desde cero",
            "Integración con tus herramientas",
            "Escalabilidad garantizada",
            "Soporte técnico dedicado"
          ],
          image: "/images/mockup7.webp",
          altImage: "/images/mockup11.webp"
        }
      ]
    : [
        {
          title: "LANDING PAGES",
          description: "High-converting pages that transform visitors into customers.",
          details: [
            "Conversion-optimized design",
            "Integrated A/B testing",
            "Smart forms",
            "Real-time analytics"
          ],
          image: "/images/mockup11.webp",
          altImage: "/images/mockup12.webp"
        },
        {
          title: "E-COMMERCE",
          description: "Online stores that sell 24/7 with the best user experience.",
          details: [
            "Unlimited product catalog",
            "Secure payment processing",
            "Automatic inventory management",
            "Advanced SEO optimization"
          ],
          image: "/images/mockup3.webp",
          altImage: "/images/mockup4.webp"
        },
        {
          title: "CUSTOM SYSTEMS",
          description: "Personalized solutions that perfectly adapt to your business.",
          details: [
            "Development from scratch",
            "Integration with your tools",
            "Guaranteed scalability",
            "Dedicated technical support"
          ],
          image: "/images/mockup7.webp",
          altImage: "/images/mockup11.webp"
        }
      ];

  const ctaText = isSpanish ? "EMPEZAR PROYECTO" : "START PROJECT";

  useEffect(() => {
    // Subheadline box animation
    gsap.to(subheadlineBoxRef.current, { 
      opacity: 1, 
      filter: 'blur(0px)', 
      duration: 0.5, 
      ease: 'power1', 
      scrollTrigger: { 
        trigger: subheadlineBoxRef.current, 
        start: "top 95%" 
      }
    });

    // Title text animation (same as SectionProjects)
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.fromTo(titleSplit.words, 
      { 
        'will-change': 'opacity, transform', 
        filter: 'blur(8px)', 
        opacity: 0, 
        yPercent: 50 
      }, 
      { 
        opacity: 1, 
        filter: 'blur(0px)', 
        yPercent: 0, 
        stagger: 0.05, 
        duration: 0.75, 
        ease: "power2", 
        scrollTrigger: { 
          trigger: titleRef.current, 
          start: "top 95%" 
        } 
      }
    );

    // Description text animation
    gsap.to(descriptionRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      ease: 'power2.out', 
      scrollTrigger: { 
        trigger: descriptionRef.current, 
        start: "top 95%" 
      }
    });
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    const cardTexts = cards?.querySelectorAll('.cards-text');
    const images = cards?.querySelectorAll('.cards-image');
    const cta = cards?.querySelector('.cards-cta');

    const handleScroll = () => {
      if (!cards || !cardTexts || !images || !cta) return;

      const windowHeight = window.innerHeight;
      const cardsTop = cards.getBoundingClientRect().top;
      const cardsBottom = cards.getBoundingClientRect().bottom;

      if (cardsTop <= 0 && cardsBottom >= windowHeight) {
        images.forEach((image) => {
          image.classList.add('fixed');
        });
        cta.classList.add('fixed');
      } else {
        images.forEach((image) => {
          image.classList.remove('fixed');
        });
        cta.classList.remove('fixed');
      }

      cardTexts.forEach((cardText, index) => {
        const cardTextTop = cardText.getBoundingClientRect().top;
        const cardTextBottom = cardText.getBoundingClientRect().bottom;

        // Show image when the card text is in the center of the viewport
        if (cardTextTop <= windowHeight / 2 && cardTextBottom >= windowHeight / 2) {
          if (images[index]) {
            images[index].style.opacity = '1';
            images[index].style.display = 'flex';
          }
        } else {
          if (images[index]) {
            images[index].style.opacity = '0';
            images[index].style.display = 'none';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Dynamically load the Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.id = 'calendly-script';
    
    // Check if script already exists
    if (!document.getElementById('calendly-script')) {
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById('calendly-script');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const toggleOverlay = () => {
    if (!isOverlayVisible) {
      gsap.to(overlayRef.current, { display: "flex", opacity: 1, duration: 0.3 });
      gsap.fromTo(overlayWidgetRef.current, { yPercent: 10, rotate: 5, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(overlayWidgetButtonRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(overlayWidgetRef.current, { yPercent: 10, rotate: 5, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(overlayWidgetButtonRef.current, { opacity: 0, scale: 0.5, duration: 0.5, ease: "power2.out" });
      gsap.to(overlayRef.current, { delay: 0.1, opacity: 0, duration: 0.5, onComplete: () => { overlayRef.current.style.display = "none"; } });
    }
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <section className="services">
      <div className="calendly-overlay" ref={overlayRef} style={{ display: "none", opacity: 0 }} onClick={toggleOverlay}>
        <div className="calendly-overlay-widget" ref={overlayWidgetRef}>
          <div className="calendly-overlay-widget-border" />
          <div className="calendly-overlay-widget-scrollbar-hider" />
          <div className="calendly-inline-widget" data-url={`https://calendly.com/amssystems22/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=4075f5&locale=${isSpanish ? 'es' : 'en'}`}/>
        </div>
        <button className="calendly-overlay-widget-button" ref={overlayWidgetButtonRef} onClick={toggleOverlay} type="button">
          <X className="calendly-overlay-widget-button-icon" />
        </button>
      </div>

      <div className="services-content">
        <div className="textbox">
          <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
            <Zap className="subheadline-box-icon" />
            <h2 className="small-description grey">{shortLabel}</h2>
          </div>
          <div className="titlebox">
            <div className="titlebox-gradient" />
            <h1 className="subheadline white" ref={titleRef} suppressHydrationWarning>{shortTitle}</h1>
          </div>
          <p className="description grey" ref={descriptionRef} suppressHydrationWarning>{currentContent.description}</p>
        </div>
      </div>

      <div className="cards-container">
        <div className="cards" ref={cardsRef}>
          <div className="cards-text-container">
            {services.map((service, index) => (
              <div key={`service-${service.title}`} className="cards-text">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <div className="service-details">
                  {service.details.map((detail, detailIndex) => (
                    <p key={`${service.title}-detail-${detailIndex}`}>• {detail}</p>
                  ))}
                </div>
              </div>
            ))}
            <button className="cards-cta" onClick={toggleOverlay} type="button">
              {ctaText}
            </button>
          </div>
          <div className="cards-image-container">
            {services.map((service, index) => (
              <div key={`image-${service.title}`} className="cards-image">
                <Image 
                  className="image" 
                  src={service.image} 
                  alt={service.title}
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <Image 
                  className="alt" 
                  src={service.altImage} 
                  alt={service.title}
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionServices;