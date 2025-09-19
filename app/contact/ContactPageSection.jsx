"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from 'lenis/react'
import "./contact.css";
import { SectionFooter } from "../Main/SectionFooter";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/CustomEase";
import { Mail, Phone, MapPin, ArrowUpRight, Zap, ChevronRight, ChevronLeft, X, Check, Video } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin, CustomEase);

const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export const ContactPageSection = () => {
  const { isSpanish } = useLanguage();
  const t = isSpanish ? amsContent : amsContentEn;

  // REFS FOR ANIMATIONS
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const formTitleRef = useRef();
  const contactCard1Ref = useRef();
  const contactCard2Ref = useRef();
  const contactCard3Ref = useRef();
  const formSectionRef = useRef();
  const logoRef = useRef();
  const calendlyOverlayRef = useRef();
  const calendlyWidgetRef = useRef();
  const calendlyButtonRef = useRef();

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    timeline: "",
    message: ""
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  // Generate randomized confetti only on client after success to avoid SSR mismatch
  const [confettiData, setConfettiData] = useState([]);
  
  const stepRefs = useRef([]);
  const progressRef = useRef();

  const totalSteps = 4;

  const steps = [
    {
      title: isSpanish ? "Información Personal" : "Personal Information",
      fields: ["name", "email", "company"]
    },
    {
      title: isSpanish ? "Detalles del Contacto" : "Contact Details", 
      fields: ["phone", "service"]
    },
    {
      title: isSpanish ? "Proyecto" : "Project Details",
      fields: ["timeline", "message"]
    },
    {
      title: isSpanish ? "Confirmación" : "Confirmation",
      fields: []
    }
  ];

  useEffect(() => {
    // Entrada inicial de elementos
    const timer = setTimeout(() => {
      // Subheadline box
      if (subheadlineBoxRef.current) {
        gsap.fromTo(subheadlineBoxRef.current, 
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", delay: 0.2 }
        );
      }

      // Title animation
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: "chars" });
        gsap.fromTo(titleSplit.chars, 
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.02, ease: "power2.out", delay: 0.4 }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, 
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: "power2.out", delay: 0.6 }
        );
      }

      // Contact cards animation
      const cards = [contactCard1Ref.current, contactCard2Ref.current, contactCard3Ref.current];
      gsap.fromTo(cards, 
        { opacity: 0, y: 100, scale: 0.8, rotationX: 15 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)", delay: 0.8 }
      );

      // Form section animation
      if (formSectionRef.current) {
        gsap.fromTo(formSectionRef.current,
          { opacity: 0, y: 100, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out", delay: 1.2 }
        );
      }

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { opacity: 0, scale: 0.5, rotationY: 180 },
          { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: "back.out(1.7)", delay: 1.6 }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax effect para logo
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let logoX = 0;
    let logoY = 0;
    const speed = 0.05;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 100 - 50;
      mouseY = (event.clientY / window.innerHeight) * 100 - 50;
    };
    
    const animate = () => {
      const distX = (mouseX * -1) - logoX;
      const distY = (mouseY * -1) - logoY;
      logoX += distX * speed;
      logoY += distY * speed;
    
      if (logoRef.current) {
        logoRef.current.style.transform = `translate3d(${logoX}px, ${logoY}px, 0) rotate(${logoX * 0.1}deg)`;
      }
    
      requestAnimationFrame(animate);
    };
    
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calendly script loading
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Step animation
  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === currentStep) {
        gsap.fromTo(el, 
          { opacity: 0, x: 50, filter: 'blur(8px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: customEase }
        );
      } else {
        gsap.set(el, { opacity: 0, x: -50 });
      }
    });

    // Update progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentStep + 1) / totalSteps) * 100}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentStep]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "", email: "", company: "", phone: "",
            service: "", timeline: "", message: ""
          });
          setCurrentStep(0);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCalendly = () => {
    if (!isCalendlyOpen) {
      gsap.to(calendlyOverlayRef.current, { 
        display: "flex", 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.fromTo(calendlyWidgetRef.current, 
        { yPercent: 10, rotate: 5, opacity: 0, scale: 0.9 },
        { yPercent: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.5, ease: customEase }
      );
      gsap.fromTo(calendlyButtonRef.current, 
        { opacity: 0, scale: 0.5, rotate: 180 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: customEase }
      );
    } else {
      gsap.to(calendlyWidgetRef.current, { 
        yPercent: 10, 
        rotate: 5, 
        opacity: 0, 
        scale: 0.9,
        duration: 0.5, 
        ease: customEase 
      });
      gsap.to(calendlyButtonRef.current, { 
        opacity: 0, 
        scale: 0.5, 
        rotate: 180,
        duration: 0.5, 
        ease: customEase 
      });
      gsap.to(calendlyOverlayRef.current, { 
        delay: 0.1, 
        opacity: 0, 
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => { 
          calendlyOverlayRef.current.style.display = "none"; 
        }
      });
    }
    setIsCalendlyOpen(!isCalendlyOpen);
  };

  // Create stable confetti data after hydration when submit succeeds
  useEffect(() => {
    if (submitStatus === 'success') {
      const colors = ['#4075f5', '#324ecb', '#22c55e', '#f59e0b', '#ef4444'];
      const now = Date.now();
      const data = Array.from({ length: 50 }, (_, i) => ({
        id: `${now}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfettiData(data);
    } else {
      if (confettiData.length) setConfettiData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="form-step" ref={el => stepRefs.current[0] = el}>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Nombre completo' : 'Full Name'} *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={isSpanish ? 'Ej: Juan Pérez' : 'e.g., John Doe'}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Email' : 'Email'} *
              </label>
              <input
                type="email"
                className="form-input"
                placeholder={isSpanish ? 'Ej: juan@empresa.com' : 'e.g., john@company.com'}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Empresa y Rubro' : 'Company and Industry'}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={isSpanish ? 'Ej: ACME S.A.' : 'e.g., ACME Inc.'}
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="form-step" ref={el => stepRefs.current[1] = el}>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Teléfono (opcional)' : 'Phone (optional)'}
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder={isSpanish ? '+54 9 11 1234 5678' : '+1 555 123 4567'}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Tipo de servicio' : 'Service Type'} *
              </label>
              <select
                className="form-input"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                required
              >
                <option value="">{isSpanish ? 'Selecciona un servicio' : 'Select a service'}</option>
                <option value="Desarrollo Web">{isSpanish ? 'Desarrollo Web' : 'Web Development'}</option>
                <option value="Ecommerce">{isSpanish ? 'E-commerce' : 'E-commerce'}</option>
                <option value="Sistema a Medida">{isSpanish ? 'Sistemas a Medida' : 'Custom Systems'}</option>
                <option value="Otro">{isSpanish ? 'Otro' : 'Other'}</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step" ref={el => stepRefs.current[2] = el}>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Plazos' : 'Timeline'}
              </label>
              <select
                className="form-input"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">{isSpanish ? 'Selecciona un plazo' : 'Select timeline'}</option>
                <option value="Asap">{isSpanish ? 'Lo antes posible' : 'ASAP'}</option>
                <option value="1 Mes">{isSpanish ? 'Dentro de 1 mes' : 'Within 1 month'}</option>
                <option value="3 Meses">{isSpanish ? 'Dentro de 3 meses' : 'Within 3 months'}</option>
                <option value="6 Meses">{isSpanish ? 'Dentro de 6 meses' : 'Within 6 months'}</option>
                <option value="9 Meses">{isSpanish ? 'Dentro de 9 meses' : 'Within 9 months'}</option>
                <option value="12 Meses">{isSpanish ? 'Dentro de 12 meses' : 'Within 12 months'}</option>
                <option value="Flexible">{isSpanish ? 'Flexible' : 'Flexible'}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="small-description grey">
                {isSpanish ? 'Mensaje' : 'Message'} *
              </label>
              <textarea
                className="form-textarea"
                rows={6}
                placeholder={isSpanish ? 'Contanos el proyecto, objetivos y plazos' : 'Tell us about the project, goals and timelines'}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step form-confirmation" ref={el => stepRefs.current[3] = el}>
            <div className="confirmation-header">
              <div className="confirmation-icon">
                <Check size={32} />
              </div>
              <h3 className="subheadline white">
                {isSpanish ? 'Confirma tus datos' : 'Confirm your details'}
              </h3>
            </div>
            <div className="confirmation-details">
              <div className="detail-item">
                <span className="small-description grey">{isSpanish ? 'Nombre:' : 'Name:'}</span>
                <span className="description white">{formData.name}</span>
              </div>
              <div className="detail-item">
                <span className="small-description grey">Email:</span>
                <span className="description white">{formData.email}</span>
              </div>
              {formData.company && (
                <div className="detail-item">
                  <span className="small-description grey">{isSpanish ? 'Empresa:' : 'Company:'}</span>
                  <span className="description white">{formData.company}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="small-description grey">{isSpanish ? 'Servicio:' : 'Service:'}</span>
                <span className="description white">{formData.service}</span>
              </div>
            </div>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                <Check size={20} />
                <span className="small-description">
                  {isSpanish ? '¡Mensaje enviado exitosamente!' : 'Message sent successfully!'}
                </span>
              </div>
            )}
            
            {submitStatus === 'success' && (
              <div className="confetti-container">
                {confettiData.map((c) => (
                  <div
                    key={c.id}
                    className="confetti"
                    style={{
                      left: `${c.left}%`,
                      animationDelay: `${c.delay}s`,
                      backgroundColor: c.color,
                    }}
                  />
                ))}
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                <X size={20} />
                <span className="small-description">
                  {isSpanish ? 'Error al enviar. Inténtalo nuevamente.' : 'Error sending. Please try again.'}
                </span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ReactLenis root>
      {/* Calendly Overlay */}
      <div className="calendly-overlay" ref={calendlyOverlayRef} style={{ display: "none", opacity: 0 }} onClick={toggleCalendly}>
        <div className="calendly-overlay-widget" ref={calendlyWidgetRef} onClick={(e) => e.stopPropagation()}>
          <div className="calendly-overlay-widget-border" />
          <div className="calendly-overlay-widget-scrollbar-hider" />
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/amssystems22/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=4075f5&locale=es"
          />
        </div>
        <div className="calendly-overlay-widget-button" ref={calendlyButtonRef} onClick={toggleCalendly}>
          <X className="calendly-overlay-widget-button-icon" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="titlebox">
            <div className="titlebox-gradient" />
            <h1 className="headline white" ref={titleRef}>
              {isSpanish ? 'Empezá tu proyecto' : 'Start your project'}
            </h1>
          </div>
          <p className="big-description grey" ref={subtitleRef}>
            {isSpanish 
              ? "Contanos lo que necesitás y te contactamos en 24 horas hábiles."
              : "Tell us what you need and we will contact you within 24 business hours."
            }
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" ref={formSectionRef}>
        <div className="contact-form-content">
          <div className="contact-form-container">
            {/* Progress Bar */}
            <div className="form-progress">
              <div className="form-progress-bar">
                <div className="form-progress-fill" ref={progressRef}></div>
              </div>
              <div className="form-progress-text">
                <span className="small-description grey">
                  {isSpanish ? `Paso ${currentStep + 1} de ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`}
                </span>
                <span className="small-description grey">{steps[currentStep].title}</span>
              </div>
            </div>

            {/* Form Steps */}
            <div className="form-steps-container">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 0 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="contact-button-transparent"
                >
                  <ChevronLeft size={20} />
                  <span className="description white">
                    {isSpanish ? 'Anterior' : 'Previous'}
                  </span>
                </button>
              )}

              <div style={{ marginLeft: 'auto' }}>
                {currentStep < totalSteps - 1 ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="contact-button-white"
                    disabled={
                      (currentStep === 0 && (!formData.name || !formData.email)) ||
                      (currentStep === 1 && !formData.service) ||
                      (currentStep === 2 && !formData.message)
                    }
                  >
                    <span>
                      <span className="contact-button-container-white">
                        <span className="contact-button-primary-white"></span>
                        <span className="contact-button-complimentary-white"></span>
                      </span>
                    </span>
                    <span className="description black">
                      {isSpanish ? 'Siguiente' : 'Next'}
                    </span>
                    <ChevronRight size={20} style={{ color: '#000' }} />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleSubmit}
                    className="contact-button-white"
                    disabled={isSubmitting || submitStatus === 'success'}
                  >
                    <span>
                      <span className="contact-button-container-white">
                        <span className="contact-button-primary-white"></span>
                        <span className="contact-button-complimentary-white"></span>
                      </span>
                    </span>
                    <span className="description black">
                      {isSubmitting 
                        ? (isSpanish ? 'Enviando…' : 'Sending…')
                        : submitStatus === 'success'
                        ? (isSpanish ? '¡Gracias! Te contactamos en 24h hábiles' : 'Thanks! We will contact you within 24h')
                        : (isSpanish ? 'Enviar consulta' : 'Send inquiry')
                      }
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="contact-cards">
        <div className="contact-cards-content">
          <div className="contact-cards-grid">
            {/* Email Card */}
            <div className="contact-card" ref={contactCard1Ref}>
              <div className="contact-card-icon">
                <Mail size={28} />
              </div>
              <h3 className="subheadline white">
                {isSpanish ? 'Envianos un email' : 'Send us an email'}
              </h3>
              <p className="description grey">amssystems22@gmail.com</p>
              <a href="mailto:amssystems22@gmail.com" className="contact-card-link">
                <span className="small-description">{isSpanish ? 'Enviar Email' : 'Send Email'}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Phone Card */}
            <div className="contact-card" ref={contactCard2Ref}>
              <div className="contact-card-icon">
                <Phone size={28} />
              </div>
              <h3 className="subheadline white">
                {isSpanish ? 'Llamanos' : 'Call us'}
              </h3>
              <p className="description grey">+54 9 11 5054 4776</p>
              <a href="tel:+5491150544776" className="contact-card-link">
                <span className="small-description">{isSpanish ? 'Llamar ahora' : 'Call Now'}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Video Call Card */}
            <div className="contact-card" ref={contactCard3Ref}>
              <div className="contact-card-icon">
                <Video size={28} />
              </div>
              <h3 className="subheadline white">
                {isSpanish ? 'Agendá una videollamada' : 'Schedule a video call'}
              </h3>
              <p className="description grey">
                {isSpanish ? 'Reunión gratuita de 30 minutos' : 'Free 30-minute meeting'}
              </p>
              <button onClick={toggleCalendly} className="contact-card-link">
                <span className="small-description">
                  {isSpanish ? 'Agendar ahora' : 'Schedule Now'}
                </span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="contact-logo">
        <div className="contact-logo-content">
          <div className="contact-logo-wrapper" ref={logoRef}>
            <picture>
              <source srcSet="/logos/ams-logo.webp" type="image/webp" />
              <img 
                src="/logos/ams-logo.png" 
                alt="AMS SYSTEMS" 
                className="contact-logo-image"
                width={200} 
                height={200} 
              />
            </picture>
          </div>
        </div>
      </section>

      <SectionFooter />
    </ReactLenis>
  );
};