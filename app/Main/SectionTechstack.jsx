/* eslint-disable react/jsx-key */
"use client";
/* eslint-disable react/no-unknown-property, react/prop-types */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Layers } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons"
import { DotButton, useDotButton } from './Carousel/EmblaCarouselDotButton'
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { useLanguage } from "../contexts/LanguageContext";
import amsContent from "../data/amsContent";
import amsContentEn from "../data/amsContentEn";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TWEEN_FACTOR_BASE = 0.25

const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max)

export const SectionTechstack = () => {
    const { isSpanish } = useLanguage();
    const t = isSpanish ? amsContent : amsContentEn;
    const shortLabel = isSpanish ? "Tecnología" : "Technology";
    const shortTitle = isSpanish ? "Stack para crecer" : "Stack to scale";

    // GSAP ANIMATIONS

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const bentoBoxRef1 = useRef()
    const bentoBoxRef2 = useRef()
    const bentoBoxRef3 = useRef()
    const techCardsRef = useRef()
    const carouselRef = useRef()

    useEffect(() => {

    // subheadline box animation
    gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

    // headline text animation
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.05, duration: 0.75, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

    // description text animation
    const descriptionSplit = new SplitText(descriptionRef.current, { type: "words" });
    gsap.fromTo(descriptionSplit.words, { filter: 'blur(8px)', opacity: 0 }, { opacity: 1, filter: 'blur(0px)', stagger: 0.025, ease: 'sine', scrollTrigger: { trigger: descriptionRef.current, start: "top 95%" } });

    // bento grid boxes animations
    gsap.fromTo(bentoBoxRef1.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef1.current, start: "top bottom" }});
    gsap.fromTo(bentoBoxRef2.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef2.current, start: "top bottom" }});

    // Tech cards animation with wave effect
    if (techCardsRef.current?.children && techCardsRef.current.children.length > 0) {
      gsap.fromTo(techCardsRef.current.children, 
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.8,
          rotationX: 20
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "back.out(1.7)",
          scrollTrigger: { 
            trigger: techCardsRef.current, 
            start: "top 85%" 
          }
        }
      );
    }

    // Carousel parallax effect
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        y: -30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    // Hover animations for tech cards
    if (techCardsRef.current?.children) {
      Array.from(techCardsRef.current.children).forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
    const addClassnames = () => {
        const cards = document.querySelectorAll(".techstack-item-card");
        cards.forEach((card, index) => {
            card.classList.add(`techstack-item-card-animated-${index + 1}`);
        });
        setTimeout(() => {
            cards.forEach((card) => {
            card.classList.add("techstack-item-card-animated-hover");
        });
        }, 1250);
    };
    gsap.fromTo(bentoBoxRef3.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.2, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef3.current, start: "top bottom" }, onComplete: addClassnames });

    }, [])

    // VIDEO
    const videoRef = useRef(null);

    const handleVideoButtonClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    // EMBLA CAROUSEL

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

    const tweenFactor = useRef(0);
    const tweenNodes = useRef([]);
    
    const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
    
    const setTweenNodes = useCallback((emblaApi) => {
      tweenNodes.current = emblaApi
        .slideNodes()
        .map((slideNode) =>
          slideNode.querySelector('.techstack-item-content-column-slider-item-child')
        );
    }, []);
    
    const setTweenFactor = useCallback((emblaApi) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);
    
    const tweenEffects = useCallback((emblaApi, eventName) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';
    
      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];
    
        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;
    
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
    
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
    
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }
    
          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
    
          // Apply scale effect
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
    
          // Apply opacity effect
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    }, []);
    
    useEffect(() => {
      if (!emblaApi) return;
    
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenEffects(emblaApi);
    
      emblaApi
        .on('reInit', setTweenNodes)
        .on('reInit', setTweenFactor)
        .on('reInit', tweenEffects)
        .on('scroll', tweenEffects)
        .on('slideFocus', tweenEffects);
    }, [emblaApi, setTweenNodes, setTweenFactor, tweenEffects]);

    const slideDescriptions = [
        "We create stunning 3D models, animations, and realistic environments for immersive experiences.",
        "Dynamic motion graphics and cinematic visual effects brought to life with seamless precision.",
        "Precision-crafted designs and visuals with unmatched detail for polished, professional results.",
        "Professional-grade video editing and vibrant color grading for high-quality storytelling impact.",
        "Complex simulations and breathtaking VFX for cutting-edge creativity in every project.",
    ];

    // 3D Tech Stack Canvas (lightweight, no new deps beyond existing @react-three/*)
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

function useLogoMaterials() {
  return useMemo(() => {
    const loader = new THREE.TextureLoader();
    return imageUrls.map((url) => {
      const tex = loader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: new THREE.Color(1, 1, 1),
        emissiveMap: tex,
        emissiveIntensity: 0.25,
        metalness: 0.4,
        roughness: 0.9,
        clearcoat: 0.1,
      });
    });
  }, []);
}

const logos = new Array(16).fill(0).map((_, i) => ({
  key: `logo-${i}`,
  scale: 0.6 + (i % 5) * 0.1,
  rx: Math.random() * Math.PI,
  ry: Math.random() * Math.PI,
}));

function FloatingLogo({ material, scale = 1, rx = 0, ry = 0 }) {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = rx + Math.sin(t * 0.6) * 0.4;
    ref.current.rotation.y = ry + Math.cos(t * 0.4) * 0.4;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} geometry={sphereGeometry} material={material} scale={scale} />
    </Float>
  );
}

function TechStackScene() {
  const materials = useLogoMaterials();
  const [hover, setHover] = useState(false);
  useFrame((state) => {
    state.gl.toneMappingExposure = hover ? 1.8 : 1.4;
  });
  return (
    <group onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      {/* ring of floating spheres */}
      {logos.map((l, i) => (
        <group key={l.key} position={[Math.sin((i / logos.length) * Math.PI * 2) * 6, Math.cos((i / logos.length) * Math.PI * 2) * 2, Math.cos((i / logos.length) * Math.PI * 2) * 6]}>
          <FloatingLogo material={materials[i % materials.length]} scale={l.scale} rx={l.rx} ry={l.ry} />
        </group>
      ))}
    </group>
  );
}

function TechStackCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 18], fov: 35, near: 1, far: 100 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} />
      <TechStackScene />
      <Environment preset="city" environmentIntensity={0.35} />
      <EffectComposer enableNormalPass={false}>
        <N8AO aoRadius={1.6} intensity={1.1} color="#0f002c" />
      </EffectComposer>
    </Canvas>
  );
}

  return (
    <section className="techstack">
        <div className="techstack-content">
            <div className="textbox">
                <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                    <Layers className="subheadline-box-icon" />
                    <h2 className="small-description grey" >{shortLabel}</h2>
                </div>
                <div className="titlebox">
                    <div className="titlebox-big-gradient" />
                    <h1 className="subheadline white" ref={titleRef} >{shortTitle}</h1>
                </div>
                <p className="description grey" ref={descriptionRef} >{t.home.techstack.description}</p>
            </div>
            <div className="techstack-container">
                <div className="techstack-item-big techstack-item-no-padding" ref={bentoBoxRef1} >
                    <div className="techstack-item-content">
                        <div className="techstack-item-content-center">
                            <div className="textbox">
                                <h2 className="small-subheadline white hide-on-mobile" >{t.home.techstack.description}</h2>
                                <button className="button hero-button button-transparent-border" onClick={handleVideoButtonClick} >
                                    <div className="button-content">
                                        <span className="small-description">{t.home.techstack.cta}</span>
                                        <span className="small-description">{t.home.techstack.cta}</span>
                                    </div>
                                    <div className="button-circle button-circle-white">
                                        <ArrowUpRight className="button-icon button-icon-180" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/* Interactive 3D tech stack preview */}
                        <div style={{ width: '100%', height: '280px', position: 'relative' }}>
                          <TechStackCanvas />
                        </div>
                        <video className="techstack-item-content-video" ref={videoRef} src="/videos/logos.mp4" alt="Duotone" muted playsInline={true} data-wf-ignore="true" loop  />
                    </div>
                    <div className="background-gradient-circle" />
                    <div className="techstack-item-no-padding-border" />
                </div>
                <div className="techstack-item-small techstack-item-small-mobile-big" ref={bentoBoxRef2} >
                    <div className="techstack-item-content">
                        <div className="techstack-item-content-column">
                            <div className="techstack-item-content-column-slider">
                                <img src="/images/abs.webp" className="techstack-item-content-column-slider-image" alt="" />
                                <div className="techstack-item-content-column-slider-carousel" ref={emblaRef} >
                                    <div className="techstack-item-content-column-slider-carousel-row">
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/blenderwhite.svg" className="techstack-item-content-column-slider-item-image" alt="" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/ae.svg" className="techstack-item-content-column-slider-item-image" alt="" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/photoshop.svg" className="techstack-item-content-column-slider-item-image" alt="" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/davinciresolvewhite.svg" className="techstack-item-content-column-slider-item-image" alt="" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/houdini.png" className="techstack-item-content-column-slider-item-image" alt="Houdini" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="techstack-item-content-column-textbox">
                                <h2 className="small-subheadline white" >{t.home.techstack.cards.title}</h2>
                                <motion.p
                                    key={selectedIndex}
                                    className="description grey"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {slideDescriptions[selectedIndex]}
                                </motion.p>
                            </div>
                            <div className="techstack-item-content-column-border" />
                            <div className="techstack-item-content-column-bottom">
                                <div className="techstack-item-content-column-bottom-left">
                                    <button className=" button techstack-item-content-column-bottom-button" onClick={onPrevButtonClick} >
                                        <div className="button-content">
                                            <span className="small-description">Previous</span>
                                            <span className="small-description">Previous</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="techstack-item-content-column-bottom-center">
                                    <div className="embla__dots-small">
                                        {scrollSnaps.map((_, index) => (
                                            <DotButton
                                                key={`dot-${index}`}
                                                onClick={() => onDotButtonClick(index)}
                                                className={'embla__dot-small'.concat(
                                                    index === selectedIndex ? ' embla__dot--selected-small' : ''
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="techstack-item-content-column-bottom-right">
                                    <button className="button techstack-item-content-column-bottom-button" onClick={onNextButtonClick} >
                                        <div className="button-content">
                                            <span className="small-description">Continue</span>
                                            <span className="small-description">Continue</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="background-gradient-circle" />
                </div>
                <div className="techstack-item-small bentoBoxRef3" ref={bentoBoxRef3} >
                    <div className="techstack-item-content-cards">
                        <div className="techstack-item-content-textbox">
                            <h2 className="small-subheadline white" >{t.home.techstack.cards.title}</h2>
                            <p className="description grey" >{t.home.techstack.cards.description}</p>
                        </div>
                        <div className="techstack-item-cards" ref={techCardsRef}>
                            <div className="techstack-item-card techstack-item-card-1" >
                                <div className="techstack-item-card-content techstack-item-card-content-1">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >Slack</p>
                                        <img src="/logos/slack.png" className="techstack-item-card-content-top-image" alt="" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >Content draft progress at 75%. Feedback incorporated, updates shared.</p>
                                    </div>
                                    <p className="small-description grey" >Nov 5</p>
                                </div>
                            </div>
                            <div className="techstack-item-card techstack-item-card-2" >
                                <div className="techstack-item-card-content techstack-item-card-content-2">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >Gmail</p>
                                        <img src="/logos/gmail.png" className="techstack-item-card-content-top-image" alt="" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >Development is now 90% complete. Testing schedule shared with all stakeholders.</p>
                                    </div>
                                    <p className="small-description grey" >Nov 6</p>
                                </div>
                            </div>
                            <div className="techstack-item-card techstack-item-card-3" >
                                <div className="techstack-item-card-content">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >Notion</p>
                                        <img src="/logos/notion.png" className="techstack-item-card-content-top-image" alt="" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >Design phase completed successfully. Tasks updated and prepared for review.</p>
                                    </div>
                                    <p className="small-description grey" >Nov 7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background-gradient-circle-2" />
                </div>
            </div>
        </div>
    </section>
  );
};