"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faXTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionFooter = () => {
  const { isSpanish } = useLanguage();
  const t = isSpanish ? amsContent : amsContentEn;
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topRef1 = useRef();
  const topRef2 = useRef();
  const topRef3 = useRef();
  const centerRef1 = useRef();
  const bottomRef1 = useRef();
  const bottomRef2 = useRef();
  const backToTopRef = useRef();

  useEffect(() => {
    gsap.fromTo(topRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(topRef2.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(topRef3.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.4, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(centerRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: centerRef1.current, start: "top 95%" }});
    gsap.fromTo(bottomRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: bottomRef1.current, start: "top 95%" }});
    gsap.fromTo(backToTopRef.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: backToTopRef.current, start: "top 95%" }});
    gsap.fromTo(bottomRef2.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: bottomRef2.current, start: "top 95%" }});
  }, [])

  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-content-left" ref={topRef1} >
        <picture>
          {/* Logo blanco (para dark mode) */}
          <img 
            src="/logos/isotipo.png" 
            className="footer-logo logo-dark" 
            alt="AMS SYSTEMS" 
          />
          
          {/* Logo negro (para light mode) */}
          <img 
            src="/logos/isotipo_oscuro.png" 
            className="footer-logo logo-light" 
            alt="AMS SYSTEMS" 
          />
        </picture>
          <p className="small-description grey" style={{ marginTop: '0.5rem' }}>
            {t.home.footer.quickContact}
          </p>
        </div>
        <div className="footer-content-right" ref={topRef2} >
          <div className="footer-content-right-column">
            <h2 className="description white" >{t.home.footer.company}</h2>
            <div className="footer-column-contents">
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>{t.home.footer.links.home}</p>
              </div>
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/about')} style={{ cursor: 'pointer' }}>{t.home.footer.links.about}</p>
              </div>
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/works')} style={{ cursor: 'pointer' }}>{t.home.footer.links.projects}</p>
              </div>
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/contact')} style={{ cursor: 'pointer' }}>{t.home.footer.links.contact}</p>
              </div>
            </div>
          </div>
          <div className="footer-content-right-column" ref={topRef3} >
            <h2 className="description white" >{t.home.footer.legal}</h2>
            <div className="footer-column-contents">
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/legal/terms')} style={{ cursor: 'pointer' }}>{t.home.footer.links.terms}</p>
              </div>
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/legal/privacy')} style={{ cursor: 'pointer' }}>{t.home.footer.links.privacy}</p>
              </div>
              <div className="footer-column-contents-item">
                <p className="description grey hover-text-grey" onClick={() => handleNavigation('/legal/cookies')} style={{ cursor: 'pointer' }}>{t.home.footer.links.cookies}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-divider" ref={centerRef1} />
      <div className="footer-content-bottom">
        <p className="small-description grey" ref={bottomRef1} >© {new Date().getFullYear()} AMS SYSTEMS | {t.home.footer.copyright}</p>
        <div className="footer-bottom-right">
          <div className="back-to-top" ref={backToTopRef} onClick={scrollToTop} style={{ cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <p className="small-description grey hover-text-grey" style={{ margin: 0 }}>
              {isSpanish ? 'Volver arriba' : 'Back to top'}
            </p>
            <ArrowUpRight className="back-to-top-icon" style={{ color: '#999', fontSize: '0.8rem', transition: 'color 0.3s ease' }} />
          </div>
          <div className="footer-socials" ref={bottomRef2} >
            <a href="https://instagram.com/amssystems" target="_blank" rel="noopener noreferrer" aria-label="Instagram AMS SYSTEMS">
              <FontAwesomeIcon icon={faInstagram} className="footer-socials-icon" />
            </a>
            <a href="https://x.com/ams__systems" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) AMS SYSTEMS">
              <FontAwesomeIcon icon={faXTwitter} className="footer-socials-icon" />
            </a>
            <a href="https://www.tiktok.com/@amssystems?_t=8cc9VjDe9uY&_r=I" target="_blank" rel="noopener noreferrer" aria-label="TikTok AMS SYSTEMS">
              <FontAwesomeIcon icon={faTiktok} className="footer-socials-icon" />
            </a>
            <a href="https://www.linkedin.com/company/amssystems/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn AMS SYSTEMS">
              <FontAwesomeIcon icon={faLinkedin} className="footer-socials-icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};