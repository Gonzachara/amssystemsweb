"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from 'lenis/react'
import { SectionFooter } from "../../Main/SectionFooter";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useLanguage } from "../../contexts/LanguageContext";
import amsContent from "../../data/amsContent";
import amsContentEn from "../../data/amsContentEn";
import "../legal.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TermsPage() {
    const { isSpanish } = useLanguage();
    const t = isSpanish ? amsContent : amsContentEn;
    
    const titleRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        // Title animation
        const titleSplit = new SplitText(titleRef.current, { type: "chars" });
        gsap.fromTo(titleSplit.chars, { 
            'will-change': 'opacity, transform', 
            filter: 'blur(8px)', 
            opacity: 0, 
            yPercent: 50 
        }, { 
            delay: 0.2, 
            opacity: 1, 
            filter: 'blur(0px)', 
            yPercent: 0, 
            stagger: 0.02, 
            duration: 0.75, 
            ease: "power1" 
        });

        // Content animation
        gsap.fromTo(contentRef.current, { 
            opacity: 0, 
            filter: 'blur(8px)' 
        }, { 
            opacity: 1, 
            filter: 'blur(0px)', 
            duration: 1, 
            delay: 0.6 
        });
    }, []);

    return (
        <ReactLenis root>
            <section className="legal-page">
                <div className="legal-content">
                    <div className="legal-header">
                        <div className="titlebox">
                            <div className="titlebox-gradient" />
                            <h1 className="headline white" ref={titleRef}>
                                {isSpanish ? 'Términos y Condiciones' : 'Terms and Conditions'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="legal-body" ref={contentRef}>
                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '1. Información de la Empresa' : '1. Company Information'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'AMS SYSTEMS es una empresa de desarrollo de software y diseño digital con sede en Argentina, especializada en soluciones tecnológicas innovadoras para empresas de diversos sectores industriales.'
                                    : 'AMS SYSTEMS is a software development and digital design company based in Argentina, specializing in innovative technological solutions for companies in various industrial sectors.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '2. Servicios Ofrecidos' : '2. Services Offered'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Nuestros servicios incluyen desarrollo de aplicaciones web y móviles, diseño de interfaces de usuario, consultoría tecnológica, integración de sistemas, y soluciones de automatización empresarial.'
                                    : 'Our services include web and mobile application development, user interface design, technology consulting, system integration, and business automation solutions.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '3. Uso del Sitio Web' : '3. Website Usage'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos y condiciones. El uso del sitio está sujeto a las leyes argentinas y a nuestras políticas de privacidad.'
                                    : 'By accessing and using this website, you agree to comply with these terms and conditions. The use of the site is subject to Argentine laws and our privacy policies.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '4. Propiedad Intelectual' : '4. Intellectual Property'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos, y código fuente, es propiedad de AMS SYSTEMS y está protegido por las leyes de propiedad intelectual argentinas e internacionales.'
                                    : 'All content on this website, including texts, images, logos, and source code, is the property of AMS SYSTEMS and is protected by Argentine and international intellectual property laws.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '5. Limitación de Responsabilidad' : '5. Limitation of Liability'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'AMS SYSTEMS no se hace responsable por daños directos o indirectos que puedan resultar del uso de este sitio web o de los servicios ofrecidos. Los usuarios utilizan el sitio bajo su propio riesgo.'
                                    : 'AMS SYSTEMS is not responsible for direct or indirect damages that may result from the use of this website or the services offered. Users use the site at their own risk.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '6. Modificaciones' : '6. Modifications'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio web.'
                                    : 'We reserve the right to modify these terms and conditions at any time. Modifications will take effect immediately after their publication on this website.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '7. Contacto' : '7. Contact'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Para cualquier consulta relacionada con estos términos y condiciones, puede contactarnos a través de nuestro formulario de contacto o enviando un email a amssystems22@gmail.com'
                                    : 'For any questions related to these terms and conditions, you can contact us through our contact form or by sending an email to amssystems22@gmail.com'
                                }
                            </p>
                        </div>

                        <div className="legal-footer">
                            <p className="small-description grey">
                                {isSpanish 
                                    ? 'Última actualización: Diciembre 2024'
                                    : 'Last updated: December 2024'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <SectionFooter />
        </ReactLenis>
    );
}
