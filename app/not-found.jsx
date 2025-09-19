"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText);

export default function NotFound() {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const titleSplit = new SplitText(titleRef.current, { type: "chars" });
    gsap.fromTo(titleSplit.chars, { opacity: 0, y: 40, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.02, ease: "power2.out" });
    gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, delay: 0.2, ease: "power2.out" });
  }, []);

  return (
    <section className="not-found" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="textbox" style={{ textAlign: 'center' }}>
        <div className="titlebox">
          <div className="titlebox-gradient" />
          <h1 className="headline white" ref={titleRef}>Ups — página no encontrada.</h1>
        </div>
        <p className="big-description grey" ref={subtitleRef} style={{ marginTop: '1rem' }}>
          Lo sentimos
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="button button-transparent-border" onClick={() => router.push('/')}>Volver al inicio</button>
          <button className="button button-transparent-border" onClick={() => router.push('/contact')}>Contactanos</button>
        </div>
      </div>
    </section>
  );
}


