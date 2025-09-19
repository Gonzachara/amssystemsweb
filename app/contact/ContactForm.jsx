"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

const ContactForm = () => {
  const { isSpanish } = useLanguage();
  const t = isSpanish ? amsContent : amsContentEn;
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "", service: "" });
  const [status, setStatus] = useState("idle");
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const stepsRef = useRef([]);

  useEffect(() => {
    // ensure only active step is visible
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      if (i === step) {
        gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
      } else {
        gsap.set(el, { autoAlpha: 0, y: 30 });
      }
    });
  }, [step]);

  useEffect(() => {
    if (showConfetti) {
      // Create confetti animation
      const colors = ['#4075f5', '#324ecb', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: -10px;
          left: ${Math.random() * 100}vw;
          z-index: 9999;
          pointer-events: none;
          border-radius: 2px;
        `;
        document.body.appendChild(confetti);
        
        // Animate confetti
        gsap.to(confetti, {
          y: window.innerHeight + 100,
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 720,
          duration: 3 + Math.random() * 2,
          ease: "power2.out",
          onComplete: () => {
            if (confetti.parentNode) {
              confetti.parentNode.removeChild(confetti);
            }
          }
        });
      }
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [showConfetti]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) {
        setStatus("success");
        setShowConfetti(true);
        setForm({ name: "", email: "", company: "", phone: "", message: "", service: "" });
        setStep(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact" aria-label="Formulario de Contacto">
      <div className="contact-content">
        <form onSubmit={submit} className="contact-form" style={{ overflow: 'hidden' }}>
          <div ref={(el) => (stepsRef.current[0] = el)}>
            <label className="small-description grey">
              {t.contact.form.name}
              <input
                className="contact-input"
                placeholder="Ej: Juan Pérez"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="small-description grey">
              {t.contact.form.email}
              <input
                className="contact-input"
                placeholder="Ej: juan@empresa.com"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="small-description grey">
              Empresa y Rubro
              <input
                className="contact-input"
                placeholder="Ej: ACME S.A."
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>
            <div className="contact-button-wrapper">
              <button type="button" className="contact-button-white" onClick={() => setStep(1)}>
                <span><span className="contact-button-container-white"><span className="contact-button-primary-white"></span><span className="contact-button-complimentary-white"></span></span></span>
                <span className="description black">Siguiente</span>
              </button>
            </div>
          </div>

          <div ref={(el) => (stepsRef.current[1] = el)}>
            <label className="small-description grey">
              Teléfono (opcional)
              <input
                className="contact-input"
                placeholder="Ej: +54 9 11 1234 5678"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="small-description grey">
              Tipo de servicio (Selecciona uno)
              <select
                className="contact-input"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option value="">Selecciona un servicio</option>
                <option>Desarrollo Web</option>
                <option>E-commerce</option>
                <option>Sistemas a Medida</option>
                <option>Otro</option>
              </select>
            </label>
            <div className="contact-button-wrapper" style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" className="contact-button-white" onClick={() => setStep(0)}>
                <span><span className="contact-button-container-white"><span className="contact-button-primary-white"></span><span className="contact-button-complimentary-white"></span></span></span>
                <span className="description black">Atrás</span>
              </button>
              <button type="button" className="contact-button-white" onClick={() => setStep(2)}>
                <span><span className="contact-button-container-white"><span className="contact-button-primary-white"></span><span className="contact-button-complimentary-white"></span></span></span>
                <span className="description black">Siguiente</span>
              </button>
            </div>
          </div>

          <div ref={(el) => (stepsRef.current[2] = el)}>
            <label className="small-description grey">
              {t.contact.form.message}
              <textarea className="contact-textarea" placeholder="Contanos el proyecto, objetivos y plazos" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <div className="contact-button-wrapper" style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" className="contact-button-white" onClick={() => setStep(1)}>
                <span><span className="contact-button-container-white"><span className="contact-button-primary-white"></span><span className="contact-button-complimentary-white"></span></span></span>
                <span className="description black">Atrás</span>
              </button>
              <button type="submit" className="contact-button-white" disabled={status === 'sending'}>
                <span><span className="contact-button-container-white"><span className="contact-button-primary-white"></span><span className="contact-button-complimentary-white"></span></span></span>
                <span className="description black">{status === 'sending' ? 'Enviando…' : 'Enviar consulta'}</span>
              </button>
            </div>
          </div>

          {status !== 'idle' && (() => {
            const getStatusBackground = () => {
              if (status === 'success') return 'rgba(34, 197, 94, 0.95)';
              if (status === 'error') return 'rgba(239, 68, 68, 0.95)';
              return 'rgba(64, 117, 245, 0.95)';
            };

            const getStatusIcon = () => {
              if (status === 'success') return '🎉';
              if (status === 'error') return '❌';
              return '⏳';
            };

            const getStatusMessage = () => {
              if (status === 'success') return '¡Gracias! Recibimos tu consulta. Te contactamos en 24 horas hábiles para coordinar una llamada.';
              if (status === 'error') return 'Ups — hubo un problema al enviar tu consulta. Por favor intentá de nuevo o escribinos a amssystems22@gmail.com';
              return 'Enviando…';
            };

            return (
              <div className={`contact-form-status ${status}`} role="alert" aria-live="polite" style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
                background: getStatusBackground(),
                color: 'white',
                padding: '2rem 3rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
                maxWidth: '90vw',
                width: '500px',
                animation: status === 'success' ? 'successPulse 0.6s ease-out' : 'fadeIn 0.3s ease-out'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {getStatusIcon()}
                </div>
                <p className="small-description white" style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.4' }}>
                  {getStatusMessage()}
                </p>
              {status === 'success' && (
                <button 
                  onClick={() => setStatus('idle')} 
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem 2rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '30px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cerrar
                </button>
              )}
              </div>
            );
          })()}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;


