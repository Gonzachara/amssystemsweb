"use client";
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import SplitText from "gsap/src/SplitText";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cone, Globe, Send, User, Zap } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";
import Marquee from "react-fast-marquee";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionKPI = () => {
    const { isSpanish } = useLanguage();
    const t = isSpanish ? amsContent : amsContentEn;
    const shortLabel = isSpanish ? "Resultados" : "Results";
    const shortTitle = isSpanish ? "Números que importan" : "Numbers that matter";

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const bentoBoxRef1 = useRef()
    const bentoBoxRef2 = useRef()
    const bentoBoxRef3 = useRef()
    // const bentoBoxRef4 = useRef()

    useEffect(() => {

        // subheadline box animation
        gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});
    
        // headline text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 100 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.085, duration: 1, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });
    
        // bento grid boxes animations
        gsap.fromTo(bentoBoxRef1.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef1.current, start: "top bottom" }});
        gsap.fromTo(bentoBoxRef2.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.2, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef2.current, start: "top bottom" }});
        gsap.fromTo(bentoBoxRef3.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.4, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef3.current, start: "top bottom" } });
    
    }, [])

    return (
        <section className="kpi">
            <div className="kpi-content">
                <div className="textbox">
                    <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                        <Zap className="subheadline-box-icon" />
                        <h2 className="small-description grey" >{shortLabel}</h2>
                    </div>
                    <div className="titlebox">
                        <div className="titlebox-gradient" />
                        <h1 className="subheadline white" ref={titleRef} >{shortTitle}</h1>
                    </div>
                </div>
                <div className="kpi-content-row">
                    <div className="kpi-content-item" ref={bentoBoxRef1} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >{t.home.kpi.items[0].number}</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >{t.home.kpi.items[0].unit}</h3>
                            </div>
                            <p className="description grey" >{t.home.kpi.items[0].description}</p>
                        </div>
                        <div className="kpi-item-button" >
                            <Globe className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                    <div className="kpi-content-item" ref={bentoBoxRef2} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >{t.home.kpi.items[1].number}</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >{t.home.kpi.items[1].unit}</h3>
                            </div>
                            <p className="description grey" >{t.home.kpi.items[1].description}</p>
                        </div>
                        <div className="kpi-item-button" >
                            <User className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                    <div className="kpi-content-item" ref={bentoBoxRef3} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >{t.home.kpi.items[2].number}</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >{t.home.kpi.items[2].unit}</h3>
                            </div>
                            <p className="description grey" >{t.home.kpi.items[2].description}</p>
                        </div>
                        <div className="kpi-item-button" >
                            <Cone className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                </div>
            </div>
        </section>
    );
};







