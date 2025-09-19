/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionFlower = () => {
    const { isSpanish } = useLanguage();
    const t = isSpanish ? amsContent : amsContentEn;

    useEffect(() => {
        let frameCount = 300,
        urls = new Array(frameCount).fill().map((o, i) => `/imageSequence/image${i + 1}.webp`);
        
    
        imageSequence({
          urls,
          canvas: "#image-sequence", 
          scrollTrigger: {
            trigger: ".flower",
            start: "top bottom",
            end: "bottom top", 
            scrub: true,
          }
        });
    
        function imageSequence(config) {
          let playhead = {frame: 0},
          canvas = gsap.utils.toArray(config.canvas)[0],
          ctx = canvas.getContext("2d"),
          curFrame = -1,
          onUpdate = config.onUpdate,
          images,
          updateImage = function() {
            let frame = Math.round(playhead.frame);
            if (frame !== curFrame) {
              config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
              curFrame = frame;
              onUpdate && onUpdate.call(this, frame, images[frame]);
            }
          };
          images = config.urls.map((url, i) => {
            let img = new Image();
            img.src = url;
            i || (img.onload = updateImage);
            return img;
          });
          return gsap.to(playhead, {
            frame: images.length - 1,
            ease: "none",
            onUpdate: updateImage,
            duration: images.length / (config.fps || 30),
            paused: !!config.paused,
            scrollTrigger: config.scrollTrigger
          });
        }
    })

    const imageRef1 = useRef();
    const imageRef2 = useRef();

    const textRef1 = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const textRef4 = useRef();
    const textRef5 = useRef();
    const textRef6 = useRef();
    const textRef7 = useRef();
    const textRef8 = useRef();
  
  useEffect(() => {
    // Check if all refs exist before animating
    if (!imageRef1.current || !imageRef2.current || !textRef1.current || !textRef2.current || 
        !textRef3.current || !textRef4.current || !textRef5.current || !textRef6.current || 
        !textRef7.current || !textRef8.current) {
      return;
    }
  
    gsap.fromTo(imageRef1.current, { width: 0, opacity: 0 }, { width: "5vw", opacity: 1, duration: 1, scrollTrigger: { trigger: imageRef1.current, start: "top 95%" } })
    gsap.fromTo(imageRef2.current, { width: 0, opacity: 0 }, { width: "5vw", opacity: 1, duration: 1, scrollTrigger: { trigger: imageRef2.current, start: "top 95%" } })

    const textRefSplit1 = new SplitText(textRef1.current, { type: "chars" });
    const textRefSplit2 = new SplitText(textRef2.current, { type: "chars" });
    const textRefSplit3 = new SplitText(textRef3.current, { type: "chars" });
    const textRefSplit4 = new SplitText(textRef4.current, { type: "chars" });
    const textRefSplit5 = new SplitText(textRef5.current, { type: "chars" });
    const textRefSplit6 = new SplitText(textRef6.current, { type: "chars" });
    const textRefSplit7 = new SplitText(textRef7.current, { type: "chars" });
    const textRefSplit8 = new SplitText(textRef8.current, { type: "chars" });

    gsap.fromTo(textRefSplit1.chars, { opacity: 0.25 }, { delay: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef1.current, start: "top 95%" } })
    gsap.fromTo(textRefSplit2.chars, { opacity: 0.25 }, { delay: 0.25, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef2.current, start: "top 95%" } })
    gsap.fromTo(textRefSplit3.chars, { opacity: 0.25 }, { delay: 0.5, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef3.current, start: "top 95%" } })

    gsap.fromTo(textRefSplit4.chars, { opacity: 0.25 }, { delay: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef4.current, start: "top 95%" } })
    gsap.fromTo(textRefSplit5.chars, { opacity: 0.25 }, { delay: 0.6, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef5.current, start: "top 95%" } })
    gsap.fromTo(textRefSplit6.chars, { opacity: 0.25 }, { delay: 0.85, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef6.current, start: "top 95%" } })

    gsap.fromTo(textRefSplit7.chars, { opacity: 0.25 }, { delay: 0, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef7.current, start: "top 95%" } })
    gsap.fromTo(textRefSplit8.chars, { opacity: 0.25 }, { delay: 0.25, opacity: 1, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: textRef8.current, start: "top 95%" } })
  
  }, [])

  return (
    <section className="flower">
      <div className="flower-content">
        <div className="projects-gradient-top" />
        <div className="projects-gradient-bottom" />
        <div className="flower-content-sequence">
          <canvas className="image-sequence-canvas" id="image-sequence" width="1920" height="1080" />
        </div>
        <div className="flower-content-textbox">
          <div className="flower-content-textbox-item" >
            <span>
              <h1 className="subheadline white" ref={textRef1} >{t.home.flower.text1}</h1>
            </span>
            <span>
              <h1 className="subheadline white" ref={textRef2} >{t.home.flower.text2}</h1>
            </span>
            <span>
              <h1 className="subheadline white" ref={textRef3} >{t.home.flower.text3}</h1>
            </span>
          </div>
          <div className="flower-content-textbox-item" >
            <span>
              <h1 className="subheadline white" ref={textRef4} >{t.home.flower.text4}</h1>
            </span>
            <span>
              <h1 className="subheadline white" ref={textRef5} >{t.home.flower.text5}</h1>
            </span>
            <span>
              <h1 className="subheadline white" ref={textRef6} >{t.home.flower.text6}</h1>
            </span>
          </div>
          <div className="flower-content-textbox-item" >
            <span>
              <h1 className="subheadline white" ref={textRef7} >{t.home.flower.text7}</h1>
            </span>
            <span>
              <h1 className="subheadline white" ref={textRef8} >{t.home.flower.text8}</h1>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};