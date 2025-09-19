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

export default function CookiesPage() {
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
                                {isSpanish ? 'Política de Cookies' : 'Cookie Policy'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="legal-body" ref={contentRef}>
                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '1. ¿Qué son las Cookies?' : '1. What are Cookies?'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Estas cookies nos ayudan a mejorar su experiencia de navegación y a proporcionar servicios personalizados.'
                                    : 'Cookies are small text files that are stored on your device when you visit our website. These cookies help us improve your browsing experience and provide personalized services.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '2. Tipos de Cookies que Utilizamos' : '2. Types of Cookies We Use'}
                            </h2>
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">
                                    {isSpanish ? 'Cookies Esenciales' : 'Essential Cookies'}
                                </h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar. Incluyen cookies de sesión, autenticación y preferencias de idioma.'
                                        : 'These cookies are necessary for the basic functioning of the website and cannot be disabled. They include session cookies, authentication, and language preferences.'
                                    }
                                </p>
                            </div>
                            
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">
                                    {isSpanish ? 'Cookies de Rendimiento' : 'Performance Cookies'}
                                </h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Recopilan información sobre cómo utiliza nuestro sitio web, como las páginas más visitadas y los errores encontrados. Esta información nos ayuda a mejorar el rendimiento del sitio.'
                                        : 'They collect information about how you use our website, such as the most visited pages and errors encountered. This information helps us improve site performance.'
                                    }
                                </p>
                            </div>
                            
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">
                                    {isSpanish ? 'Cookies de Funcionalidad' : 'Functionality Cookies'}
                                </h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o región) y proporcionen características mejoradas y más personales.'
                                        : 'They allow the website to remember choices you make (such as your username, language, or region) and provide enhanced and more personal features.'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '3. Cookies de Terceros' : '3. Third-Party Cookies'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Utilizamos servicios de terceros como Google Analytics para analizar el tráfico del sitio web. Estos servicios pueden establecer sus propias cookies. Consulte las políticas de privacidad de estos servicios para obtener más información.'
                                    : 'We use third-party services such as Google Analytics to analyze website traffic. These services may set their own cookies. Please refer to these services\' privacy policies for more information.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '4. Gestión de Cookies' : '4. Cookie Management'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Puede controlar y eliminar cookies a través de la configuración de su navegador. Sin embargo, tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.'
                                    : 'You can control and delete cookies through your browser settings. However, please note that disabling certain cookies may affect website functionality.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '5. Configuración por Navegador' : '5. Browser Settings'}
                            </h2>
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">Chrome</h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Configuración > Privacidad y seguridad > Cookies y otros datos del sitio'
                                        : 'Settings > Privacy and security > Cookies and other site data'
                                    }
                                </p>
                            </div>
                            
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">Firefox</h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Opciones > Privacidad y seguridad > Cookies y datos del sitio'
                                        : 'Options > Privacy & Security > Cookies and Site Data'
                                    }
                                </p>
                            </div>
                            
                            <div className="legal-subsection">
                                <h3 className="small-subheadline white">Safari</h3>
                                <p className="description grey">
                                    {isSpanish 
                                        ? 'Preferencias > Privacidad > Cookies y datos de sitios web'
                                        : 'Preferences > Privacy > Cookies and website data'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '6. Consentimiento' : '6. Consent'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Al continuar utilizando nuestro sitio web, usted consiente el uso de cookies de acuerdo con esta política. Puede retirar su consentimiento en cualquier momento modificando la configuración de su navegador.'
                                    : 'By continuing to use our website, you consent to the use of cookies in accordance with this policy. You can withdraw your consent at any time by modifying your browser settings.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '7. Actualizaciones de la Política' : '7. Policy Updates'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Podemos actualizar esta política de cookies ocasionalmente. Le recomendamos revisar esta página periódicamente para estar informado sobre cualquier cambio.'
                                    : 'We may update this cookie policy occasionally. We recommend reviewing this page periodically to stay informed about any changes.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '8. Contacto' : '8. Contact'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Si tiene preguntas sobre nuestra política de cookies, puede contactarnos en amssystems22@gmail.com'
                                    : 'If you have questions about our cookie policy, you can contact us at amssystems22@gmail.com'
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
