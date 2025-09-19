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

export default function PrivacyPage() {
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
                                {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="legal-body" ref={contentRef}>
                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '1. Información que Recopilamos' : '1. Information We Collect'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'AMS SYSTEMS recopila información personal cuando usted utiliza nuestros servicios, incluyendo nombre, dirección de correo electrónico, información de contacto y datos de navegación para mejorar la experiencia del usuario.'
                                    : 'AMS SYSTEMS collects personal information when you use our services, including name, email address, contact information, and browsing data to improve user experience.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '2. Uso de la Información' : '2. Use of Information'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, comunicarnos con los clientes, procesar transacciones y personalizar la experiencia del usuario en nuestro sitio web.'
                                    : 'We use the collected information to provide and improve our services, communicate with customers, process transactions, and personalize the user experience on our website.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '3. Compartir Información' : '3. Information Sharing'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'No vendemos, alquilamos ni compartimos información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.'
                                    : 'We do not sell, rent, or share personal information with third parties, except when necessary to provide our services or when required by law.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '4. Seguridad de los Datos' : '4. Data Security'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Implementamos medidas de seguridad técnicas y organizativas para proteger la información personal contra acceso no autorizado, alteración, divulgación o destrucción.'
                                    : 'We implement technical and organizational security measures to protect personal information against unauthorized access, alteration, disclosure, or destruction.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '5. Cookies y Tecnologías Similares' : '5. Cookies and Similar Technologies'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Utilizamos cookies y tecnologías similares para mejorar la funcionalidad del sitio web, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies.'
                                    : 'We use cookies and similar technologies to improve website functionality, analyze traffic, and personalize content. You can configure your browser to reject cookies.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '6. Derechos del Usuario' : '6. User Rights'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Los usuarios tienen derecho a acceder, rectificar, eliminar o portar sus datos personales. También pueden oponerse al procesamiento de sus datos o solicitar la limitación del mismo.'
                                    : 'Users have the right to access, rectify, delete, or port their personal data. They can also object to the processing of their data or request its limitation.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '7. Retención de Datos' : '7. Data Retention'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Conservamos la información personal solo durante el tiempo necesario para cumplir con los propósitos para los cuales fue recopilada, o según lo requiera la ley aplicable.'
                                    : 'We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '8. Transferencias Internacionales' : '8. International Transfers'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de Argentina. Aseguraremos que dichas transferencias cumplan con las leyes de protección de datos aplicables.'
                                    : 'Some of our service providers may be located outside Argentina. We will ensure that such transfers comply with applicable data protection laws.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '9. Menores de Edad' : '9. Minors'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores sin el consentimiento de sus padres o tutores.'
                                    : 'Our services are not directed to minors under 18 years of age. We do not knowingly collect personal information from minors without parental or guardian consent.'
                                }
                            </p>
                        </div>

                        <div className="legal-section">
                            <h2 className="subheadline white">
                                {isSpanish ? '10. Contacto' : '10. Contact'}
                            </h2>
                            <p className="description grey">
                                {isSpanish 
                                    ? 'Para consultas sobre esta política de privacidad o para ejercer sus derechos, contacte a nuestro Oficial de Protección de Datos en amssystems22@gmail.com'
                                    : 'For questions about this privacy policy or to exercise your rights, contact our Data Protection Officer at amssystems22@gmail.com'
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
