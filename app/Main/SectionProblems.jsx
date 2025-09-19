"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import { 
  ShoppingCart, 
  Gauge, 
  Wrench, 
  EyeOff, 
  ShieldAlert, 
  Rocket, 
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  TrendingDown,
  AlertCircle,
  Target,
  Zap,
  Phone,
  AlertTriangle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const SectionProblems = () => {
  const { isSpanish } = useLanguage();
  const horizontalContainerRef = useRef();
  const horizontalWrapperRef = useRef();
  const horizontalScrollerRef = useRef();
  const subheadlineBoxRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    // Animaciones del header
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

    const descriptionSplit = new SplitText(descriptionRef.current, { type: "words" });
    gsap.fromTo(descriptionSplit.words, 
      { 
        filter: 'blur(8px)', 
        opacity: 0 
      }, 
      { 
        opacity: 1, 
        filter: 'blur(0px)', 
        stagger: 0.025, 
        ease: 'sine', 
        scrollTrigger: { 
          trigger: descriptionRef.current, 
          start: "top 95%" 
        } 
      }
    );

    // Scroll horizontal
    const ctx = gsap.context(() => {
      if (horizontalScrollerRef.current) {
        const container = horizontalScrollerRef.current;
        const containerWidth = container.scrollWidth - document.documentElement.clientWidth;

        gsap.to(container, {
          x: () => -containerWidth,
          scrollTrigger: {
            markers: false,
            trigger: horizontalWrapperRef.current,
            start: 'top top',
            scrub: 0.5,
            pin: horizontalContainerRef.current,
            end: () => "+=" + containerWidth,
            invalidateOnRefresh: true,
          }
        });
      }
    }, horizontalContainerRef);

    return () => ctx.revert();
  }, []);

  const headerContent = isSpanish 
    ? {
        label: "Problemas Reales",
        title: "¿Te sentís identificado?",
        description: "Estos son los problemas más comunes que enfrentan las empresas hoy. Si te identificas con alguno, tenemos la solución perfecta para ti."
      }
    : {
        label: "Real Problems", 
        title: "Do you feel identified?",
        description: "These are the most common problems businesses face today. If you identify with any of them, we have the perfect solution for you."
      };

  const problems = isSpanish
    ? [
        { 
          icon: <ShoppingCart size={24} />, 
          text: "Tu competencia te está robando clientes online",
          link: "Ver solución"
        },
        { 
          icon: <Gauge size={24} />, 
          text: "Pierdes ventas porque no tienes un sistema que convierte",
          big: true
        },
        { 
          icon: <Wrench size={24} />, 
          text: "Gastas en marketing pero no tienes donde aterrizarlos",
          link: "Conocer más"
        },
        { 
          icon: <EyeOff size={24} />, 
          text: "Tu página actual parece de 2015 y da desconfianza",
          big: true
        },
        { 
          icon: <ShieldAlert size={24} />, 
          text: "No sabes cuántos clientes podrías estar ganando",
          link: "Descubrir"
        },
        { 
          icon: <Rocket size={24} />, 
          text: "AMS Systems lo resuelve TODO",
          big: true
        },
        {
          icon: <Clock size={24} />,
          text: "Trabajas más horas pero no generas más ingresos",
          link: "Solucionar"
        },
        {
          icon: <DollarSign size={24} />,
          text: "Tu negocio depende 100% de ti y no escala solo",
          big: true
        },
        {
          icon: <Users size={24} />,
          text: "Los clientes no te encuentran cuando te buscan",
          link: "Cambiar esto"
        },
        {
          icon: <TrendingDown size={24} />,
          text: "Tus ventas son inconsistentes mes a mes",
          big: true
        },
        {
          icon: <AlertCircle size={24} />,
          text: "No tienes un proceso claro para cerrar ventas",
          link: "Ver proceso"
        },
        {
          icon: <Target size={24} />,
          text: "Tu mensaje no conecta con tu cliente ideal",
          big: true
        },
        {
          icon: <Zap size={24} />,
          text: "Necesitas resultados rápidos pero no sabes cómo",
          link: "Obtener resultados"
        },
        {
          icon: <Phone size={24} />,
          text: "Pierdes el tiempo con clientes que no van a comprar",
          big: true
        }
      ]
    : [
        { 
          icon: <ShoppingCart size={24} />, 
          text: "Your competition is stealing online clients",
          link: "See solution"
        },
        { 
          icon: <Gauge size={24} />, 
          text: "You lose sales because you don't have a converting system",
          big: true
        },
        { 
          icon: <Wrench size={24} />, 
          text: "You spend on marketing but have nowhere to land them",
          link: "Learn more"
        },
        { 
          icon: <EyeOff size={24} />, 
          text: "Your current page looks like 2015 and creates distrust",
          big: true
        },
        { 
          icon: <ShieldAlert size={24} />, 
          text: "You don't know how many clients you could be gaining",
          link: "Discover"
        },
        { 
          icon: <Rocket size={24} />, 
          text: "AMS Systems solves EVERYTHING",
          big: true
        },
        {
          icon: <Clock size={24} />,
          text: "You work more hours but don't generate more income",
          link: "Fix this"
        },
        {
          icon: <DollarSign size={24} />,
          text: "Your business depends 100% on you and doesn't scale alone",
          big: true
        },
        {
          icon: <Users size={24} />,
          text: "Clients can't find you when they search for you",
          link: "Change this"
        },
        {
          icon: <TrendingDown size={24} />,
          text: "Your sales are inconsistent month to month",
          big: true
        },
        {
          icon: <AlertCircle size={24} />,
          text: "You don't have a clear process to close sales",
          link: "See process"
        },
        {
          icon: <Target size={24} />,
          text: "Your message doesn't connect with your ideal client",
          big: true
        },
        {
          icon: <Zap size={24} />,
          text: "You need fast results but don't know how",
          link: "Get results"
        },
        {
          icon: <Phone size={24} />,
          text: "You waste time with clients who won't buy",
          big: true
        }
      ];

  // Dividir las cards en filas de manera más equilibrada
  const getRowsDistribution = () => {
    const totalCards = problems.length;
    const cardsPerRow = Math.ceil(totalCards / 2);
    
    return [
      problems.slice(0, cardsPerRow),
      problems.slice(cardsPerRow)
    ];
  };

  const [firstRow, secondRow] = getRowsDistribution();

  return (
    <section className="problems-horizontal" ref={horizontalContainerRef}>
      {/* Header Section */}
      <div className="problems-textbox">
        <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
          <AlertTriangle className="subheadline-box-icon" />
          <h2 className="small-description grey">{headerContent.label}</h2>
        </div>
        <div className="titlebox">
          <div className="titlebox-big-gradient" />
          <h1 className="subheadline white" ref={titleRef} suppressHydrationWarning>
            {headerContent.title}
          </h1>
        </div>
        <p className="description grey" ref={descriptionRef} suppressHydrationWarning>
          {headerContent.description}
        </p>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="horizontal-wrapper" ref={horizontalWrapperRef}>
        <div className="horizontal-scroller" ref={horizontalScrollerRef}>
          <div className="row">
            {firstRow.map((problem, index) => (
              <div 
                key={`problem-row1-${index}`}
                className={`item ${problem.big ? 'big' : ''} ${problem.link ? 'filled' : ''}`}
              >
                <div className="item-icon">{problem.icon}</div>
                <p>{problem.text}</p>
                {problem.link && (
                  <button className="button button-transparent-border" type="button">
                    <div className="button-content">
                      <span className="small-description problems-description">{problem.link}</span>
                      <span className="small-description problems-description">{problem.link}</span>
                    </div>
                    <div className="button-circle">
                      <ArrowRight className="button-icon" />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="row">
            {secondRow.map((problem, index) => (
              <div 
                key={`problem-row2-${index}`}
                className={`item ${problem.big ? 'big' : ''} ${problem.link ? 'filled' : ''}`}
              >
                <div className="item-icon">{problem.icon}</div>
                <p>{problem.text}</p>
                {problem.link && (
                  <button className="button button-transparent-border" type="button">
                    <div className="button-content">
                      <span className="small-description problems-description">{problem.link}</span>
                      <span className="small-description problems-description">{problem.link}</span>
                    </div>
                    <div className="button-circle">
                      <ArrowRight className="button-icon" />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProblems;