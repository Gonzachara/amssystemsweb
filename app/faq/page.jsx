"use client"
import { useEffect, useRef, useState } from "react"
import { ReactLenis } from "lenis/react"
import { StructuredData } from "../components/StructuredData"
import { SEOHead } from "../components/SEOHead"
import { ArrowUpRight, Plus, Minus } from "lucide-react"
import { SectionFooter } from "../Main/SectionFooter"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import amsContent from "../data/amsContent"
import "./faq.css"

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase)

const customEase = CustomEase.create("customEase", ".4,0,.1,1")

export default function FAQ() {
  // REFS FOR ANIMATIONS
  const titleRef = useRef()
  const subtitleRef = useRef()
  const faqItemsRef = useRef([])
  const ctaTitleRef = useRef()
  const ctaSubtitleRef = useRef()
  const ctaButtonRef = useRef()

  // FAQ STATE - All items closed by default to match SSR
  const [openItems, setOpenItems] = useState(new Set())
  const [isClient, setIsClient] = useState(false)

  // Only run on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // GSAP ANIMATIONS - Only run on client
  useEffect(() => {
    if (!isClient) return

    const timer = setTimeout(() => {
      // Title animation with SplitText
      if (titleRef.current) {
        // Set initial visibility
        gsap.set(titleRef.current, { opacity: 1 })
        const titleSplit = new SplitText(titleRef.current, { type: "chars" })
        gsap.fromTo(
          titleSplit.chars,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "power2.out", delay: 0.2 },
        )
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 },
        )
      }

      // FAQ items animation with stagger
      faqItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 100, scale: 0.8, rotationX: 15 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              delay: 0.6 + index * 0.1,
            },
          )
        }
      })

      // CTA section animation
      if (ctaTitleRef.current) {
        gsap.fromTo(
          ctaTitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 },
        )
      }

      if (ctaSubtitleRef.current) {
        gsap.fromTo(
          ctaSubtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.4 },
        )
      }

      if (ctaButtonRef.current) {
        gsap.fromTo(
          ctaButtonRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 1.6 },
        )
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isClient])

  // FAQ item click animation with enhanced blur transitions
  const handleFAQClick = (index) => {
    if (!isClient) return
  
    const item = faqItemsRef.current[index]
    if (!item) return
  
    const answer = item.querySelector(".faq-answer")
    const answerText = answer.querySelector("p")
    const icon = item.querySelector(".faq-icon")
  
    if (openItems.has(index)) {
      // 🔴 CERRAR
      const timeline = gsap.timeline({
        onComplete: () => {
          setOpenItems((prev) => {
            const newSet = new Set(prev)
            newSet.delete(index)
            return newSet
          })
        },
      })
  
      timeline
        .to(answerText, {
          filter: "blur(8px)",
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          answer,
          {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0.1
        )
        .to(
          icon,
          {
            rotation: 0,
            scale: 1,
            duration: 0.25,
            ease: "back.out(1.7)",
          },
          0
        )
    } else {
      // 🟢 ABRIR
      setOpenItems((prev) => new Set(prev).add(index))
  
      const timeline = gsap.timeline()
      gsap.set(answerText, { filter: "blur(12px)", opacity: 0 })
  
      timeline
        .fromTo(
          answer,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }
        )
        .to(
          answerText,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power2.out",
          },
          0.15
        )
        .to(
          icon,
          {
            rotation: 180,
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(2)",
          },
          0
        )
        .to(
          icon,
          {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          0.2
        )
    }
  }  

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <ReactLenis root>
        <SEOHead
          title="AMS SYSTEMS | Preguntas Frecuentes - Desarrollo Web en Argentina"
          description="Preguntas frecuentes sobre desarrollo web, e-commerce y sistemas a medida en Argentina. Respuestas a las dudas más comunes sobre nuestros servicios y procesos."
          keywords="preguntas frecuentes desarrollo web argentina, FAQ e-commerce, consultas sistemas a medida, AMS SYSTEMS preguntas"
          canonical="https://amssystems.com.ar/faq"
          ogImage="/images/ams-faq-og.webp"
          ogImageAlt="FAQ AMS SYSTEMS - Preguntas Frecuentes Desarrollo Web Argentina"
        />
        <StructuredData type="FAQPage" />

        <div className="faq-page">
          {/* Hero Section */}
          <section className="faq-hero">
            <div className="faq-hero-content">
              <div className="faq-hero-text">
                <div className="titlebox">
                  <div className="titlebox-gradient" />
                  <h1 className="headline white faq-title-ssr">
                    {amsContent.faq.title}
                  </h1>
                </div>
                <p className="big-description grey faq-subtitle-ssr">
                  Encontrá respuestas a las preguntas más comunes sobre nuestros servicios de desarrollo web, e-commerce y
                  sistemas a medida en Argentina.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Items - Server-side render with all items closed */}
          <section className="faq-content">
            <div className="faq-container">
              <div className="faq-grid">
                {amsContent.faq.items.map((item, index) => (
                  <div
                    key={`faq-${index}-${item.q.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`}
                    className="faq-item faq-item-ssr"
                  >
                    <button
                      className="faq-question"
                      aria-expanded={false}
                      aria-label={`Pregunta ${index + 1}: ${item.q}`}
                    >
                      <h3 className="subheadline white">{item.q}</h3>
                      <div className="faq-icon">
                        <Plus size={24} />
                      </div>
                    </button>
                    <div className="faq-answer" style={{ height: 0, opacity: 0 }}>
                      <p className="description grey">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="faq-cta">
            <div className="faq-cta-content">
              <div className="titlebox">
                <div className="titlebox-gradient" />
                <h2 className="subheadline white faq-cta-title-ssr">
                  ¿No encontraste tu respuesta?
                </h2>
              </div>
              <p className="description grey faq-cta-subtitle-ssr">
                Nuestro equipo está listo para resolver cualquier duda específica sobre tu proyecto.
              </p>
              <div className="faq-cta-buttons">
                <a href="/contacto" className="button button-transparent-border faq-cta-button-ssr">
                  <div className="button-content">
                    <span className="small-description">Contactar Ahora</span>
                    <span className="small-description">Contactar Ahora</span>
                  </div>
                  <div className="button-circle">
                    <ArrowUpRight className="button-icon button-icon-180" />
                  </div>
                </a>
              </div>
            </div>
          </section>

          <SectionFooter />
        </div>
      </ReactLenis>
    )
  }

  // Client-side render with dynamic functionality
  return (
    <ReactLenis root>
      <SEOHead
        title="AMS SYSTEMS | Preguntas Frecuentes - Desarrollo Web en Argentina"
        description="Preguntas frecuentes sobre desarrollo web, e-commerce y sistemas a medida en Argentina. Respuestas a las dudas más comunes sobre nuestros servicios y procesos."
        keywords="preguntas frecuentes desarrollo web argentina, FAQ e-commerce, consultas sistemas a medida, AMS SYSTEMS preguntas"
        canonical="https://amssystems.com.ar/faq"
        ogImage="/images/ams-faq-og.webp"
        ogImageAlt="FAQ AMS SYSTEMS - Preguntas Frecuentes Desarrollo Web Argentina"
      />
      <StructuredData type="FAQPage" />

      <div className="faq-page">
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="faq-hero-content">
            <div className="faq-hero-text">
              <div className="titlebox">
                <div className="titlebox-gradient" />
                <h1 className="headline white" ref={titleRef} style={{ opacity: 1 }}>
                  {amsContent.faq.title}
                </h1>
              </div>
              <p className="big-description grey faq-animate-initial" ref={subtitleRef}>
                Encontrá respuestas a las preguntas más comunes sobre nuestros servicios de desarrollo web, e-commerce y
                sistemas a medida en Argentina.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="faq-content">
          <div className="faq-container">
            <div className="faq-grid">
              {amsContent.faq.items.map((item, index) => {
                const isOpen = openItems.has(index)
                return (
                  <div
                    key={`faq-${index}-${item.q.slice(0, 10).replace(/\s+/g, "-").toLowerCase()}`}
                    className="faq-item"
                    ref={(el) => (faqItemsRef.current[index] = el)}
                  >
                    <button
                      className="faq-question"
                      onClick={() => handleFAQClick(index)}
                      aria-expanded={isOpen}
                      aria-label={`Pregunta ${index + 1}: ${item.q}`}
                    >
                      <h3 className="subheadline white">{item.q}</h3>
                      <div className="faq-icon">
                        {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                      </div>
                    </button>
                    <div 
                      className="faq-answer" 
                      style={{ 
                        height: isOpen ? "auto" : 0, 
                        opacity: isOpen ? 1 : 0,
                        filter: isOpen ? "blur(0px)" : "blur(8px)"
                      }}
                    >
                      <p className="description grey">{item.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="faq-cta">
          <div className="faq-cta-content">
            <div className="titlebox">
              <div className="titlebox-gradient" />
              <h2 className="subheadline white" ref={ctaTitleRef}>
                ¿No encontraste tu respuesta?
              </h2>
            </div>
            <p className="description grey" ref={ctaSubtitleRef}>
              Nuestro equipo está listo para resolver cualquier duda específica sobre tu proyecto.
            </p>
            <div className="faq-cta-buttons">
              <a href="/contacto" className="button button-transparent-border" ref={ctaButtonRef}>
                <div className="button-content">
                  <span className="small-description">Contactar Ahora</span>
                  <span className="small-description">Contactar Ahora</span>
                </div>
                <div className="button-circle">
                  <ArrowUpRight className="button-icon button-icon-180" />
                </div>
              </a>
            </div>
          </div>
          </section>

          <SectionFooter />
        </div>
      </ReactLenis>
    )
}