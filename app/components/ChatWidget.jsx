"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const chatWindowRef = useRef(null);
  const buttonRef = useRef(null);
  const chatContentRef = useRef(null); // <-- ref for chat content scrolling

  const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  const steps = [
    { key: 'name', prompt: '¿Cómo te llamas?', validate: (v) => v.trim().length > 1 || 'Decime tu nombre 😊' },
    { key: 'email', prompt: '¿Cuál es tu email?', validate: (v) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v) || 'Ingresá un email válido ✉️' },
    { key: 'company', prompt: '¿De qué empresa sos? (opcional)', optional: true },
    { key: 'message', prompt: 'Contame brevemente tu proyecto o necesidad.' }
  ];

  // Open/close animations with blur
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(chatWindowRef.current,
        { scale: 0.9, opacity: 0, y: 14, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.4)' }
      );
    }
  }, [isOpen]);

  const closeWithAnimation = () => {
    if (!chatWindowRef.current) return setIsOpen(false);
    gsap.to(chatWindowRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 14,
      filter: 'blur(8px)',
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false)
    });
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsMinimized(true);
      closeWithAnimation();
      setTimeout(() => setIsMinimized(false), 260);
    } else {
      setIsOpen(true);
      // Seed conversation on open
      setTimeout(() => {
        setMessages([
          { id: createId(), role: 'bot', text: '¡Hola! 👋 Soy Amsy, tu asistente de AMS Systems.' },
          { id: createId(), role: 'bot', text: steps[0].prompt }
        ]);
        setStepIndex(0);
        setCurrentInput('');
      }, 60);
    }
  };

  const appendBotMessage = (text) => setMessages((prev) => [...prev, { id: createId(), role: 'bot', text }]);
  const appendUserMessage = (text) => setMessages((prev) => [...prev, { id: createId(), role: 'user', text }]);

  const handleAdvance = async () => {
    const step = steps[stepIndex];
    const value = currentInput.trim();
    if (!step) return;

    if (step.validate) {
      const valid = step.validate(value);
      if (valid !== true) {
        appendBotMessage(typeof valid === 'string' ? valid : 'Dato inválido, intentemos otra vez.');
        return;
      }
    }

    appendUserMessage(value || (step.optional ? '—' : ''));
    setFormData((fd) => ({ ...fd, [step.key]: value }));
    setCurrentInput('');

    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setStepIndex(nextIndex);
      setTimeout(() => appendBotMessage(steps[nextIndex].prompt), 250);
    } else {
      // Submit
      setStepIndex(nextIndex);
      setIsSubmitting(true);
      appendBotMessage('Gracias, estoy enviando tu información...');
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name || value,
            email: formData.email,
            company: formData.company,
            message: formData.message || value
          })
        });
        if (response.ok) {
          setSubmitStatus('success');
          appendBotMessage('¡Listo! ✅ Te contactaremos muy pronto.');
        } else {
          setSubmitStatus('error');
          appendBotMessage('Hubo un error al enviar. Probemos de nuevo más tarde.');
        }
      } catch (err) {
        console.error('ChatWidget submit error:', err);
        setSubmitStatus('error');
        appendBotMessage('Hubo un error al enviar. Probemos de nuevo más tarde.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting && isOpen) handleAdvance();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const el = chatContentRef.current;
    if (!el) return;
    try { 
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); 
    } catch(e) { 
      console.warn('Scroll fallback used:', e);
      el.scrollTop = el.scrollHeight; 
    }
  }, [messages]);


  return (
    <>
      {/* Chat Button */}
      <button 
        ref={buttonRef}
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat con Amsy'}
        type="button"
      >
        {isOpen ? (
          <X className="chat-icon" />
        ) : (
          <div className="mascot-container">
            <Image 
              src="/models/mascota_ams.png" 
              alt="Amsy - AMS Systems Assistant" 
              width={40} 
              height={40}
              className="mascot-image"
            />
          </div>
        )}
        <span className="chat-tooltip">¡Hablá conmigo!</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className={`chat-window ${isMinimized ? 'minimized' : ''}`}
        >
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="mascot-avatar">
                <Image 
                  src="/models/mascota_ams.png" 
                  alt="Amsy" 
                  width={32} 
                  height={32}
                />
              </div>
              <div className="chat-title">
                <h3>Amsy</h3>
                <p>Asistente de AMS Systems</p>
              </div>
            </div>
            <button 
              className="close-button"
              onClick={toggleChat}
            >
              <X className="close-icon" />
            </button>
          </div>

          <div className="chat-content" ref={chatContentRef}>
            <div className="messages">
              {messages.map((m) => (
                <div key={m.id} className={`message-row ${m.role}`}>
                  <div className="message-bubble">
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
              {submitStatus === 'success' && (
                <div className="success-message">¡Mensaje enviado! Te contactaremos pronto.</div>
              )}
              {submitStatus === 'error' && (
                <div className="error-message">Error al enviar. Inténtalo de nuevo.</div>
              )}
            </div>

            {/* Input composer */}
            {stepIndex < steps.length && (
              <div className="composer">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribí tu respuesta y presioná Enter"
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  className="submit-button"
                  onClick={handleAdvance}
                  disabled={isSubmitting || currentInput.trim().length === 0}
                >
                  {isSubmitting ? <div className="loading-spinner" /> : (<><Send className="send-icon" /> Enviar</>)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default ChatWidget;