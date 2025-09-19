"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./services.css";

gsap.registerPlugin(ScrollTrigger);

const ServiciosPage = () => {
  const wrapper1Ref = useRef(null);
  const wrapper2Ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Split per-character for both blocks
    const text1 = new SplitType(".split-text", { types: "chars" });
    const text2 = new SplitType(".split-text-2", { types: "chars" });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".text-container .char", {
      filter: "blur(15px)",
      willchange: "filter",
      scaleY: 0.1,
      transformOrigin: "50% 100%",
      stagger: 0.07,
      scrollTrigger: {
        trigger: wrapper1Ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: wrapper1Ref.current,
      },
    });

    const tlGhost = gsap.timeline({ defaults: { ease: "power4.out" } });
    tlGhost.from(".text-container-2 .char", {
      filter: "blur(20px)",
      willchange: "filter",
      stagger: 0.07,
      scrollTrigger: {
        trigger: wrapper2Ref.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: wrapper2Ref.current,
      },
    });

    // Sticky cards scale effect (similar a ejemplo GSAP)
    if (listRef.current) {
      const items = Array.from(listRef.current.querySelectorAll(".item"));
      items.forEach((item, index) => {
        const previous = items[index - 1];
        if (!previous) return;
        const tlCards = gsap.timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "top top",
            scrub: 1,
          },
        });
        tlCards.to(previous, { scale: 0.9 });
        tlCards.to(item, { boxShadow: "0rem -4rem 10rem 0rem rgba(0,0,0,0.25)" }, 0);
      });
    }

    return () => {
      tl.kill();
      tlGhost.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="services-page">
      <section className="wrapper-text" ref={wrapper1Ref}>
        <div className="text-container">
          <p className="split-text">
            Ofrecemos desarrollo web moderno, branding sólido, y sistemas a medida que escalan con tu negocio. Convertimos ideas en productos digitales de alto rendimiento.
          </p>
        </div>
      </section>

      <section className="wrapper-text" ref={wrapper2Ref}>
        <div className="text-container text-container-2">
          <p className="split-text-2">
            Diseño UX/UI, e‑commerce, sitios corporativos, integraciones, performance, animación avanzada y experiencias 3D. Nos enfocamos en resultados reales.
          </p>
        </div>
      </section>

      <section className="cards-section">
        <ul className="list" ref={listRef}>
          <li className="item"><h2>Desarrollo Web</h2></li>
          <li className="item"><h2>Branding & Identidad</h2></li>
          <li className="item"><h2>E‑commerce</h2></li>
          <li className="item"><h2>Integraciones & Sistemas</h2></li>
        </ul>
      </section>
    </main>
  );
};

export default ServiciosPage;


