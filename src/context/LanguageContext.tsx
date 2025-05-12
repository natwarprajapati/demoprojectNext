'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'hi' | 'gu';

interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    currentLanguage: 'en',
    setLanguage: () => { },
    t: () => '',
});

// Default translations
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.getStarted': 'Get Started',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'We create stunning websites and powerful web applications.',
        'footer.quickLinks': 'Quick Links',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.webDev': 'Web Development',
        'footer.mobileDev': 'Mobile Development',
        'footer.uiux': 'UI/UX Design',
        'footer.marketing': 'Digital Marketing',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 Business Street',
        'footer.location': 'City, Country',
        'footer.rights': 'All rights reserved.',

        // Contact Form
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Have a question or want to work together? We\'d love to hear from you.',
        'contact.getInTouch': 'Get in Touch',
        'contact.sendMessage': 'Send Us a Message',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Thank you for your message! We will get back to you soon.',
        'contact.error': 'There was an error submitting your form. Please try again.',

        // Home Page
        'home.hero.title': 'Transform Your Digital Presence',
        'home.hero.subtitle': 'We create stunning websites and powerful web applications that drive business growth.',
        'home.hero.cta': 'Get Started',
        'home.services.title': 'Our Services',
        'home.services.subtitle': 'Comprehensive web solutions for your business',
        'home.about.title': 'About Us',
        'home.about.subtitle': 'We are a team of passionate developers and designers',
        'home.about.description': 'With years of experience in web development, we deliver exceptional digital solutions that drive business growth.',

        // About Page
        'about.title': 'About Us',
        'about.subtitle': 'Learn more about our company and mission',
        'about.mission': 'Our Mission',
        'about.mission.text': 'To deliver exceptional digital solutions that drive business growth and success.',
        'about.vision': 'Our Vision',
        'about.vision.text': 'To be the leading web development company, known for innovation and quality.',
        'about.values': 'Our Values',
        'about.values.quality': 'Quality',
        'about.values.innovation': 'Innovation',
        'about.values.integrity': 'Integrity',
        'about.values.collaboration': 'Collaboration',

        // Services Page
        'services.title': 'Our Services',
        'services.subtitle': 'Comprehensive web solutions for your business',
        'services.webdev.title': 'Web Development',
        'services.webdev.description': 'Custom websites and web applications built with the latest technologies.',
        'services.mobiledev.title': 'Mobile Development',
        'services.mobiledev.description': 'Native and cross-platform mobile applications for iOS and Android.',
        'services.uiux.title': 'UI/UX Design',
        'services.uiux.description': 'Beautiful and intuitive user interfaces with exceptional user experience.',
        'services.marketing.title': 'Digital Marketing',
        'services.marketing.description': 'Strategic digital marketing solutions to grow your online presence.',

        // Portfolio Page
        'portfolio.title': 'Our Portfolio',
        'portfolio.subtitle': 'Check out some of our recent projects',
        'portfolio.viewProject': 'View Project',

        // Blog Page
        'blog.title': 'Our Blog',
        'blog.subtitle': 'Latest insights and updates from our team',
        'blog.readMore': 'Read more',
        'blog.categories.webDevelopment': 'Web Development',
        'blog.categories.mobileDevelopment': 'Mobile Development',
        'blog.categories.uiUxDesign': 'UI/UX Design',
        'blog.posts.webDev.title': 'The Future of Web Development',
        'blog.posts.webDev.description': 'Exploring the latest trends and technologies in web development.',
        'blog.posts.webDev.date': 'March 15, 2024',
        'blog.posts.webDev.readTime': '5 min read',
        'blog.posts.mobileDev.title': 'Mobile App Development Best Practices',
        'blog.posts.mobileDev.description': 'Learn the essential practices for building successful mobile applications.',
        'blog.posts.mobileDev.date': 'March 10, 2024',
        'blog.posts.mobileDev.readTime': '4 min read',
        'blog.posts.uiUx.title': 'Designing for User Experience',
        'blog.posts.uiUx.description': 'Key principles and strategies for creating exceptional user experiences.',
        'blog.posts.uiUx.date': 'March 5, 2024',
        'blog.posts.uiUx.readTime': '6 min read',
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Nosotros',
        'nav.services': 'Servicios',
        'nav.portfolio': 'Portafolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contacto',
        'nav.getStarted': 'Comenzar',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'Creamos sitios web impresionantes y aplicaciones web potentes.',
        'footer.quickLinks': 'Enlaces Rápidos',
        'footer.services': 'Servicios',
        'footer.contact': 'Contacto',
        'footer.webDev': 'Desarrollo Web',
        'footer.mobileDev': 'Desarrollo Móvil',
        'footer.uiux': 'Diseño UI/UX',
        'footer.marketing': 'Marketing Digital',
        'footer.email': 'contacto@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 Calle Empresarial',
        'footer.location': 'Ciudad, País',
        'footer.rights': 'Todos los derechos reservados.',

        // Contact Form
        'contact.title': 'Contáctanos',
        'contact.subtitle': '¿Tienes una pregunta o quieres trabajar juntos? Nos encantaría escucharte.',
        'contact.getInTouch': 'Ponte en Contacto',
        'contact.sendMessage': 'Envíanos un Mensaje',
        'contact.name': 'Nombre',
        'contact.email': 'Correo Electrónico',
        'contact.subject': 'Asunto',
        'contact.message': 'Mensaje',
        'contact.send': 'Enviar Mensaje',
        'contact.sending': 'Enviando...',
        'contact.success': '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
        'contact.error': 'Hubo un error al enviar tu formulario. Por favor, inténtalo de nuevo.',

        // Home Page
        'home.hero.title': 'Transforma tu Presencia Digital',
        'home.hero.subtitle': 'Creamos sitios web impresionantes y aplicaciones web potentes que impulsan el crecimiento empresarial.',
        'home.hero.cta': 'Comenzar',
        'home.services.title': 'Nuestros Servicios',
        'home.services.subtitle': 'Soluciones web integrales para tu negocio',
        'home.about.title': 'Sobre Nosotros',
        'home.about.subtitle': 'Somos un equipo de desarrolladores y diseñadores apasionados',
        'home.about.description': 'Con años de experiencia en desarrollo web, entregamos soluciones digitales excepcionales que impulsan el crecimiento empresarial.',

        // About Page
        'about.title': 'Sobre Nosotros',
        'about.subtitle': 'Conoce más sobre nuestra empresa y misión',
        'about.mission': 'Nuestra Misión',
        'about.mission.text': 'Entregar soluciones digitales excepcionales que impulsen el crecimiento y éxito empresarial.',
        'about.vision': 'Nuestra Visión',
        'about.vision.text': 'Ser la empresa líder en desarrollo web, conocida por la innovación y calidad.',
        'about.values': 'Nuestros Valores',
        'about.values.quality': 'Calidad',
        'about.values.innovation': 'Innovación',
        'about.values.integrity': 'Integridad',
        'about.values.collaboration': 'Colaboración',

        // Services Page
        'services.title': 'Nuestros Servicios',
        'services.subtitle': 'Soluciones web integrales para tu negocio',
        'services.webdev.title': 'Desarrollo Web',
        'services.webdev.description': 'Sitios web y aplicaciones web personalizadas construidas con las últimas tecnologías.',
        'services.mobiledev.title': 'Desarrollo Móvil',
        'services.mobiledev.description': 'Aplicaciones móviles nativas y multiplataforma para iOS y Android.',
        'services.uiux.title': 'Diseño UI/UX',
        'services.uiux.description': 'Interfaces de usuario hermosas e intuitivas con una experiencia de usuario excepcional.',
        'services.marketing.title': 'Marketing Digital',
        'services.marketing.description': 'Soluciones estratégicas de marketing digital para aumentar tu presencia en línea.',

        // Portfolio Page
        'portfolio.title': 'Nuestro Portafolio',
        'portfolio.subtitle': 'Echa un vistazo a algunos de nuestros proyectos recientes',
        'portfolio.viewProject': 'Ver Proyecto',

        // Blog Page
        'blog.title': 'Nuestro Blog',
        'blog.subtitle': 'Últimas noticias y actualizaciones de nuestro equipo',
        'blog.readMore': 'Leer más',
        'blog.categories.webDevelopment': 'Desarrollo Web',
        'blog.categories.mobileDevelopment': 'Desarrollo Móvil',
        'blog.categories.uiUxDesign': 'Diseño UI/UX',
        'blog.posts.webDev.title': 'El Futuro del Desarrollo Web',
        'blog.posts.webDev.description': 'Explorando las últimas tendencias y tecnologías en desarrollo web.',
        'blog.posts.webDev.date': '15 de marzo, 2024',
        'blog.posts.webDev.readTime': '5 min de lectura',
        'blog.posts.mobileDev.title': 'Mejores Prácticas de Desarrollo de Aplicaciones Móviles',
        'blog.posts.mobileDev.description': 'Aprende las prácticas esenciales para construir aplicaciones móviles exitosas.',
        'blog.posts.mobileDev.date': '10 de marzo, 2024',
        'blog.posts.mobileDev.readTime': '4 min de lectura',
        'blog.posts.uiUx.title': 'Diseñando para la Experiencia de Usuario',
        'blog.posts.uiUx.description': 'Principios clave y estrategias para crear experiencias de usuario excepcionales.',
        'blog.posts.uiUx.date': '5 de marzo, 2024',
        'blog.posts.uiUx.readTime': '6 min de lectura',
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À Propos',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.getStarted': 'Commencer',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'Nous créons des sites web impressionnants et des applications web puissantes.',
        'footer.quickLinks': 'Liens Rapides',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.webDev': 'Développement Web',
        'footer.mobileDev': 'Développement Mobile',
        'footer.uiux': 'Design UI/UX',
        'footer.marketing': 'Marketing Digital',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 Rue des Affaires',
        'footer.location': 'Ville, Pays',
        'footer.rights': 'Tous droits réservés.',

        // Contact Form
        'contact.title': 'Contactez-nous',
        'contact.subtitle': 'Vous avez une question ou souhaitez travailler ensemble ? Nous aimerions vous entendre.',
        'contact.getInTouch': 'Contactez-nous',
        'contact.sendMessage': 'Envoyez-nous un Message',
        'contact.name': 'Nom',
        'contact.email': 'Email',
        'contact.subject': 'Sujet',
        'contact.message': 'Message',
        'contact.send': 'Envoyer le Message',
        'contact.sending': 'Envoi en cours...',
        'contact.success': 'Merci pour votre message ! Nous vous répondrons bientôt.',
        'contact.error': 'Une erreur s\'est produite lors de l\'envoi de votre formulaire. Veuillez réessayer.',

        // Home Page
        'home.hero.title': 'Transformez Votre Présence Numérique',
        'home.hero.subtitle': 'Nous créons des sites web impressionnants et des applications web puissantes qui stimulent la croissance des entreprises.',
        'home.hero.cta': 'Commencer',
        'home.services.title': 'Nos Services',
        'home.services.subtitle': 'Solutions web complètes pour votre entreprise',
        'home.about.title': 'À Propos de Nous',
        'home.about.subtitle': 'Nous sommes une équipe de développeurs et de designers passionnés',
        'home.about.description': 'Avec des années d\'expérience dans le développement web, nous fournissons des solutions numériques exceptionnelles qui stimulent la croissance des entreprises.',

        // About Page
        'about.title': 'À Propos de Nous',
        'about.subtitle': 'En savoir plus sur notre entreprise et notre mission',
        'about.mission': 'Notre Mission',
        'about.mission.text': 'Fournir des solutions numériques exceptionnelles qui stimulent la croissance et le succès des entreprises.',
        'about.vision': 'Notre Vision',
        'about.vision.text': 'Être la principale entreprise de développement web, connue pour l\'innovation et la qualité.',
        'about.values': 'Nos Valeurs',
        'about.values.quality': 'Qualité',
        'about.values.innovation': 'Innovation',
        'about.values.integrity': 'Intégrité',
        'about.values.collaboration': 'Collaboration',

        // Services Page
        'services.title': 'Nos Services',
        'services.subtitle': 'Solutions web complètes pour votre entreprise',
        'services.webdev.title': 'Développement Web',
        'services.webdev.description': 'Sites web et applications web personnalisés construits avec les dernières technologies.',
        'services.mobiledev.title': 'Développement Mobile',
        'services.mobiledev.description': 'Applications mobiles natives et multiplateformes pour iOS et Android.',
        'services.uiux.title': 'Design UI/UX',
        'services.uiux.description': 'Interfaces utilisateur belles et intuitives avec une expérience utilisateur exceptionnelle.',
        'services.marketing.title': 'Marketing Digital',
        'services.marketing.description': 'Solutions stratégiques de marketing digital pour développer votre présence en ligne.',

        // Portfolio Page
        'portfolio.title': 'Notre Portfolio',
        'portfolio.subtitle': 'Découvrez certains de nos projets récents',
        'portfolio.viewProject': 'Voir le Projet',

        // Blog Page
        'blog.title': 'Notre Blog',
        'blog.subtitle': 'Dernières idées et mises à jour de notre équipe',
        'blog.readMore': 'Lire plus',
        'blog.categories.webDevelopment': 'Développement Web',
        'blog.categories.mobileDevelopment': 'Développement Mobile',
        'blog.categories.uiUxDesign': 'Design UI/UX',
        'blog.posts.webDev.title': "L'Avenir du Développement Web",
        'blog.posts.webDev.description': 'Exploration des dernières tendances et technologies en développement web.',
        'blog.posts.webDev.date': '15 mars 2024',
        'blog.posts.webDev.readTime': '5 min de lecture',
        'blog.posts.mobileDev.title': 'Bonnes Pratiques de Développement Mobile',
        'blog.posts.mobileDev.description': 'Découvrez les pratiques essentielles pour créer des applications mobiles réussies.',
        'blog.posts.mobileDev.date': '10 mars 2024',
        'blog.posts.mobileDev.readTime': '4 min de lecture',
        'blog.posts.uiUx.title': 'Concevoir pour l\'Expérience Utilisateur',
        'blog.posts.uiUx.description': 'Principes clés et stratégies pour créer des expériences utilisateur exceptionnelles.',
        'blog.posts.uiUx.date': '5 mars 2024',
        'blog.posts.uiUx.readTime': '6 min de lecture',
    },
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.about': 'Über Uns',
        'nav.services': 'Dienstleistungen',
        'nav.portfolio': 'Portfolio',
        'nav.blog': 'Blog',
        'nav.contact': 'Kontakt',
        'nav.getStarted': 'Loslegen',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'Wir erstellen beeindruckende Websites und leistungsstarke Webanwendungen.',
        'footer.quickLinks': 'Schnelllinks',
        'footer.services': 'Dienstleistungen',
        'footer.contact': 'Kontakt',
        'footer.webDev': 'Webentwicklung',
        'footer.mobileDev': 'Mobile Entwicklung',
        'footer.uiux': 'UI/UX Design',
        'footer.marketing': 'Digitales Marketing',
        'footer.email': 'kontakt@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 Geschäftsstraße',
        'footer.location': 'Stadt, Land',
        'footer.rights': 'Alle Rechte vorbehalten.',

        // Contact Form
        'contact.title': 'Kontaktieren Sie Uns',
        'contact.subtitle': 'Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Wir würden uns freuen, von Ihnen zu hören.',
        'contact.getInTouch': 'Kontaktieren Sie Uns',
        'contact.sendMessage': 'Senden Sie Uns eine Nachricht',
        'contact.name': 'Name',
        'contact.email': 'E-Mail',
        'contact.subject': 'Betreff',
        'contact.message': 'Nachricht',
        'contact.send': 'Nachricht Senden',
        'contact.sending': 'Wird gesendet...',
        'contact.success': 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.',
        'contact.error': 'Beim Senden Ihres Formulars ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',

        // Home Page
        'home.hero.title': 'Transformieren Sie Ihre Digitale Präsenz',
        'home.hero.subtitle': 'Wir erstellen beeindruckende Websites und leistungsstarke Webanwendungen, die das Geschäftswachstum fördern.',
        'home.hero.cta': 'Loslegen',
        'home.services.title': 'Unsere Dienstleistungen',
        'home.services.subtitle': 'Umfassende Web-Lösungen für Ihr Unternehmen',
        'home.about.title': 'Über Uns',
        'home.about.subtitle': 'Wir sind ein Team leidenschaftlicher Entwickler und Designer',
        'home.about.description': 'Mit jahrelanger Erfahrung in der Webentwicklung liefern wir außergewöhnliche digitale Lösungen, die das Geschäftswachstum fördern.',

        // About Page
        'about.title': 'Über Uns',
        'about.subtitle': 'Erfahren Sie mehr über unser Unternehmen und unsere Mission',
        'about.mission': 'Unsere Mission',
        'about.mission.text': 'Außergewöhnliche digitale Lösungen bereitzustellen, die das Geschäftswachstum und den Erfolg fördern.',
        'about.vision': 'Unsere Vision',
        'about.vision.text': 'Das führende Webentwicklungsunternehmen zu sein, bekannt für Innovation und Qualität.',
        'about.values': 'Unsere Werte',
        'about.values.quality': 'Qualität',
        'about.values.innovation': 'Innovation',
        'about.values.integrity': 'Integrität',
        'about.values.collaboration': 'Zusammenarbeit',

        // Services Page
        'services.title': 'Unsere Dienstleistungen',
        'services.subtitle': 'Umfassende Web-Lösungen für Ihr Unternehmen',
        'services.webdev.title': 'Webentwicklung',
        'services.webdev.description': 'Maßgeschneiderte Websites und Webanwendungen, die mit den neuesten Technologien entwickelt wurden.',
        'services.mobiledev.title': 'Mobile Entwicklung',
        'services.mobiledev.description': 'Native und plattformübergreifende mobile Anwendungen für iOS und Android.',
        'services.uiux.title': 'UI/UX Design',
        'services.uiux.description': 'Schöne und intuitive Benutzeroberflächen mit außergewöhnlicher Benutzererfahrung.',
        'services.marketing.title': 'Digitales Marketing',
        'services.marketing.description': 'Strategische digitale Marketing-Lösungen, um Ihre Online-Präsenz zu stärken.',

        // Portfolio Page
        'portfolio.title': 'Unser Portfolio',
        'portfolio.subtitle': 'Schauen Sie sich einige unserer aktuellen Projekte an',
        'portfolio.viewProject': 'Projekt Ansehen',

        // Blog Page
        'blog.title': 'Unser Blog',
        'blog.subtitle': 'Neueste Einblicke und Updates von unserem Team',
        'blog.readMore': 'Weiterlesen',
        'blog.categories.webDevelopment': 'Web-Entwicklung',
        'blog.categories.mobileDevelopment': 'Mobile-Entwicklung',
        'blog.categories.uiUxDesign': 'UI/UX-Design',
        'blog.posts.webDev.title': 'Die Zukunft der Web-Entwicklung',
        'blog.posts.webDev.description': 'Erkundung der neuesten Trends und Technologien in der Web-Entwicklung.',
        'blog.posts.webDev.date': '15. März 2024',
        'blog.posts.webDev.readTime': '5 Min. Lesezeit',
        'blog.posts.mobileDev.title': 'Best Practices für die Mobile App-Entwicklung',
        'blog.posts.mobileDev.description': 'Lernen Sie die wesentlichen Praktiken für den Aufbau erfolgreicher mobiler Anwendungen.',
        'blog.posts.mobileDev.date': '10. März 2024',
        'blog.posts.mobileDev.readTime': '4 Min. Lesezeit',
        'blog.posts.uiUx.title': 'Design für Benutzererfahrung',
        'blog.posts.uiUx.description': 'Wichtige Prinzipien und Strategien für die Schaffung außergewöhnlicher Benutzererfahrungen.',
        'blog.posts.uiUx.date': '5. März 2024',
        'blog.posts.uiUx.readTime': '6 Min. Lesezeit',
    },
    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.about': '关于我们',
        'nav.services': '服务',
        'nav.portfolio': '作品集',
        'nav.blog': '博客',
        'nav.contact': '联系我们',
        'nav.getStarted': '开始',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': '我们创建令人惊叹的网站和强大的网络应用程序。',
        'footer.quickLinks': '快速链接',
        'footer.services': '服务',
        'footer.contact': '联系我们',
        'footer.webDev': '网站开发',
        'footer.mobileDev': '移动应用开发',
        'footer.uiux': 'UI/UX设计',
        'footer.marketing': '数字营销',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123商业街',
        'footer.location': '城市，国家',
        'footer.rights': '保留所有权利。',

        // Contact Form
        'contact.title': '联系我们',
        'contact.subtitle': '有问题或想一起合作？我们很乐意听取您的意见。',
        'contact.getInTouch': '联系我们',
        'contact.sendMessage': '发送消息',
        'contact.name': '姓名',
        'contact.email': '电子邮件',
        'contact.subject': '主题',
        'contact.message': '消息',
        'contact.send': '发送消息',
        'contact.sending': '发送中...',
        'contact.success': '感谢您的留言！我们将尽快回复您。',
        'contact.error': '提交表单时出错。请重试。',

        // Home Page
        'home.hero.title': '转变您的数字形象',
        'home.hero.subtitle': '我们创建令人惊叹的网站和强大的网络应用程序，推动业务增长。',
        'home.hero.cta': '开始',
        'home.services.title': '我们的服务',
        'home.services.subtitle': '为您的企业提供全面的网络解决方案',
        'home.about.title': '关于我们',
        'home.about.subtitle': '我们是一支充满激情的开发者和设计师团队',
        'home.about.description': '凭借多年的网站开发经验，我们提供卓越的数字解决方案，推动业务增长。',

        // About Page
        'about.title': '关于我们',
        'about.subtitle': '了解更多关于我们公司和使命的信息',
        'about.mission': '我们的使命',
        'about.mission.text': '提供卓越的数字解决方案，推动业务增长和成功。',
        'about.vision': '我们的愿景',
        'about.vision.text': '成为以创新和质量著称的领先网站开发公司。',
        'about.values': '我们的价值观',
        'about.values.quality': '质量',
        'about.values.innovation': '创新',
        'about.values.integrity': '诚信',
        'about.values.collaboration': '合作',

        // Services Page
        'services.title': '我们的服务',
        'services.subtitle': '为您的企业提供全面的网络解决方案',
        'services.webdev.title': '网站开发',
        'services.webdev.description': '使用最新技术构建的定制网站和网络应用程序。',
        'services.mobiledev.title': '移动应用开发',
        'services.mobiledev.description': '适用于iOS和Android的原生和跨平台移动应用程序。',
        'services.uiux.title': 'UI/UX设计',
        'services.uiux.description': '美观直观的用户界面，提供卓越的用户体验。',
        'services.marketing.title': '数字营销',
        'services.marketing.description': '战略性数字营销解决方案，提升您的在线形象。',

        // Portfolio Page
        'portfolio.title': '我们的作品集',
        'portfolio.subtitle': '查看我们最近的一些项目',
        'portfolio.viewProject': '查看项目',

        // Blog Page
        'blog.title': '我们的博客',
        'blog.subtitle': '我们团队的最新见解和更新',
        'blog.readMore': '阅读更多',
        'blog.categories.webDevelopment': '网站开发',
        'blog.categories.mobileDevelopment': '移动开发',
        'blog.categories.uiUxDesign': 'UI/UX设计',
        'blog.posts.webDev.title': '网站开发的未来',
        'blog.posts.webDev.description': '探索网站开发的最新趋势和技术。',
        'blog.posts.webDev.date': '2024年3月15日',
        'blog.posts.webDev.readTime': '5分钟阅读',
        'blog.posts.mobileDev.title': '移动应用开发最佳实践',
        'blog.posts.mobileDev.description': '学习构建成功移动应用的基本实践。',
        'blog.posts.mobileDev.date': '2024年3月10日',
        'blog.posts.mobileDev.readTime': '4分钟阅读',
        'blog.posts.uiUx.title': '用户体验设计',
        'blog.posts.uiUx.description': '创造卓越用户体验的关键原则和策略。',
        'blog.posts.uiUx.date': '2024年3月5日',
        'blog.posts.uiUx.readTime': '6分钟阅读',
    },
    ja: {
        // Navigation
        'nav.home': 'ホーム',
        'nav.about': '会社概要',
        'nav.services': 'サービス',
        'nav.portfolio': 'ポートフォリオ',
        'nav.blog': 'ブログ',
        'nav.contact': 'お問い合わせ',
        'nav.getStarted': '始める',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': '私たちは、印象的なウェブサイトと強力なウェブアプリケーションを作成します。',
        'footer.quickLinks': 'クイックリンク',
        'footer.services': 'サービス',
        'footer.contact': 'お問い合わせ',
        'footer.webDev': 'ウェブ開発',
        'footer.mobileDev': 'モバイル開発',
        'footer.uiux': 'UI/UXデザイン',
        'footer.marketing': 'デジタルマーケティング',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123ビジネスストリート',
        'footer.location': '都市、国',
        'footer.rights': 'すべての権利を保有します。',

        // Contact Form
        'contact.title': 'お問い合わせ',
        'contact.subtitle': '質問がある、または一緒に仕事をしたいですか？お気軽にお問い合わせください。',
        'contact.getInTouch': 'お問い合わせ',
        'contact.sendMessage': 'メッセージを送信',
        'contact.name': '名前',
        'contact.email': 'メールアドレス',
        'contact.subject': '件名',
        'contact.message': 'メッセージ',
        'contact.send': 'メッセージを送信',
        'contact.sending': '送信中...',
        'contact.success': 'メッセージありがとうございます！できるだけ早くご連絡いたします。',
        'contact.error': 'フォームの送信中にエラーが発生しました。もう一度お試しください。',

        // Home Page
        'home.hero.title': 'デジタルプレゼンスを変革する',
        'home.hero.subtitle': '私たちは、ビジネスの成長を促進する印象的なウェブサイトと強力なウェブアプリケーションを作成します。',
        'home.hero.cta': '始める',
        'home.services.title': 'サービス',
        'home.services.subtitle': 'ビジネス向けの包括的なウェブソリューション',
        'home.about.title': '会社概要',
        'home.about.subtitle': '私たちは、情熱を持った開発者とデザイナーのチームです',
        'home.about.description': 'ウェブ開発の豊富な経験を活かし、ビジネスの成長を促進する卓越したデジタルソリューションを提供します。',

        // About Page
        'about.title': '会社概要',
        'about.subtitle': '私たちの会社とミッションについてもっと知る',
        'about.mission': 'ミッション',
        'about.mission.text': 'ビジネスの成長と成功を促進する卓越したデジタルソリューションを提供すること。',
        'about.vision': 'ビジョン',
        'about.vision.text': 'イノベーションと品質で知られる主要なウェブ開発会社になること。',
        'about.values': '価値観',
        'about.values.quality': '品質',
        'about.values.innovation': 'イノベーション',
        'about.values.integrity': '誠実さ',
        'about.values.collaboration': '協力',

        // Services Page
        'services.title': 'サービス',
        'services.subtitle': 'ビジネス向けの包括的なウェブソリューション',
        'services.webdev.title': 'ウェブ開発',
        'services.webdev.description': '最新のテクノロジーで構築されたカスタムウェブサイトとウェブアプリケーション。',
        'services.mobiledev.title': 'モバイル開発',
        'services.mobiledev.description': 'iOSとAndroid向けのネイティブおよびクロスプラットフォームモバイルアプリケーション。',
        'services.uiux.title': 'UI/UXデザイン',
        'services.uiux.description': '卓越したユーザーエクスペリエンスを提供する美しく直感的なユーザーインターフェース。',
        'services.marketing.title': 'デジタルマーケティング',
        'services.marketing.description': 'オンラインプレゼンスを高めるための戦略的デジタルマーケティングソリューション。',

        // Portfolio Page
        'portfolio.title': 'ポートフォリオ',
        'portfolio.subtitle': '最近のプロジェクトをご覧ください',
        'portfolio.viewProject': 'プロジェクトを見る',

        // Blog Page
        'blog.title': 'ブログ',
        'blog.subtitle': '私たちのチームからの最新の洞察とアップデート',
        'blog.readMore': '続きを読む',
        'blog.categories.webDevelopment': 'ウェブ開発',
        'blog.categories.mobileDevelopment': 'モバイル開発',
        'blog.categories.uiUxDesign': 'UI/UXデザイン',
        'blog.posts.webDev.title': 'ウェブ開発の未来',
        'blog.posts.webDev.description': 'ウェブ開発の最新トレンドと技術を探る。',
        'blog.posts.webDev.date': '2024年3月15日',
        'blog.posts.webDev.readTime': '5分で読む',
        'blog.posts.mobileDev.title': 'モバイルアプリ開発のベストプラクティス',
        'blog.posts.mobileDev.description': '成功するモバイルアプリケーションを構築するための基本的な実践を学ぶ。',
        'blog.posts.mobileDev.date': '2024年3月10日',
        'blog.posts.mobileDev.readTime': '4分で読む',
        'blog.posts.uiUx.title': 'ユーザーエクスペリエンスのデザイン',
        'blog.posts.uiUx.description': '卓越したユーザーエクスペリエンスを作り出すための重要な原則と戦略。',
        'blog.posts.uiUx.date': '2024年3月5日',
        'blog.posts.uiUx.readTime': '6分で読む',
    },
    hi: {
        // Navigation
        'nav.home': 'होम',
        'nav.about': 'हमारे बारे में',
        'nav.services': 'सेवाएं',
        'nav.portfolio': 'पोर्टफोलियो',
        'nav.blog': 'ब्लॉग',
        'nav.contact': 'संपर्क',
        'nav.getStarted': 'शुरू करें',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'हम आकर्षक वेबसाइट और शक्तिशाली वेब एप्लिकेशन बनाते हैं।',
        'footer.quickLinks': 'त्वरित लिंक',
        'footer.services': 'सेवाएं',
        'footer.contact': 'संपर्क',
        'footer.webDev': 'वेब विकास',
        'footer.mobileDev': 'मोबाइल विकास',
        'footer.uiux': 'UI/UX डिज़ाइन',
        'footer.marketing': 'डिजिटल मार्केटिंग',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 बिजनेस स्ट्रीट',
        'footer.location': 'शहर, देश',
        'footer.rights': 'सर्वाधिकार सुरक्षित।',

        // Contact Form
        'contact.title': 'संपर्क करें',
        'contact.subtitle': 'कोई प्रश्न है या साथ काम करना चाहते हैं? हम आपसे सुनना चाहेंगे।',
        'contact.getInTouch': 'संपर्क में रहें',
        'contact.sendMessage': 'हमें संदेश भेजें',
        'contact.name': 'नाम',
        'contact.email': 'ईमेल',
        'contact.subject': 'विषय',
        'contact.message': 'संदेश',
        'contact.send': 'भेजें',
        'contact.success': 'आपका संदेश सफलतापूर्वक भेज दिया गया है!',
        'contact.error': 'आपका फॉर्म जमा करने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
        'contact.required': 'यह फ़ील्ड आवश्यक है',
        'contact.invalidEmail': 'अमान्य ईमेल पता',
        'contact.minLength': 'कम से कम {min} अक्षर होने चाहिए',
        'contact.maxLength': 'अधिकतम {max} अक्षर होने चाहिए',

        // Services
        'services.web.title': 'वेब विकास',
        'services.web.description': 'हम आधુनिक और प्रतिक्रियाशील वेबसाइट बनाते हैं जो आपके व्यवसाय को बढ़ाती हैं।',
        'services.mobile.title': 'मोबाइल विकास',
        'services.mobile.description': 'iOS और Android के लिए मूल मोबाइल ऐप विकसित करें।',
        'services.ui.title': 'UI/UX डिज़ाइन',
        'services.ui.description': 'उपयोगकर्ता-केंद्रित डिज़ाइन जो आपके उपयोगकर्ताओं को आकर्षित करते हैं।',

        // Home Page
        'home.hero.title': 'अपनी डिजिटल उपस्थिति को बदलें',
        'home.hero.subtitle': 'हम आकर्षक वेबसाइट और शक्तिशाली वेब एप्लिकेशन बनाते हैं जो व्यवसाय विकास को बढ़ावा देते हैं।',
        'home.hero.cta': 'शुरू करें',
        'home.services.title': 'हमारी सेवाएं',
        'home.services.subtitle': 'आपके व्यवसाय के लिए व्यापक वेब समाधान',
        'home.about.title': 'हमारे बारे में',
        'home.about.subtitle': 'हम एक जोशीले डेवलपर्स अनुभव के साथ, हम असाधारण डिजिटल समाधान प्रदान करते हैं जो व्यवसाय विकास को बढ़ावा देते हैं।',

        // About Page
        'about.title': 'हमारे बारे में',
        'about.subtitle': 'हमारी कंपनी और मिशन के बारे में अधिक जानें',
        'about.mission': 'हमारा मिशन',
        'about.mission.text': 'असाधारण डिजिटल समाधान प्रदान करना जो व्यवसाय विकास और सफलता को बढ़ावा देते हैं।',
        'about.vision': 'हमारी दृष्टि',
        'about.vision.text': 'नवाचार और गुणवत्ता के लिए जाना जाने वाला प्रमुख वेब विकास कंपनी बनना।',
        'about.values': 'हमारे मूल्य',
        'about.values.quality': 'गुणवत्ता',
        'about.values.innovation': 'नवाचार',
        'about.values.integrity': 'ईमानदारी',
        'about.values.collaboration': 'सहयोग',

        // Services Page
        'services.title': 'हमारी सेवाएं',
        'services.subtitle': 'आपके व्यवसाय के लिए व्यापक वेब समाधान',
        'services.webdev.title': 'वेब विकास',
        'services.webdev.description': 'नवीनतम तकनीकों के साथ निर्मित कस्टम वेबसाइट और वेब एप्लिकेशन।',
        'services.mobiledev.title': 'मोबाइल विकास',
        'services.mobiledev.description': 'iOS अनुभव के लिए नेटिव और क्रॉस-प्लेटफॉर्म मोबाइल एप्लिकेशन।',
        'services.uiux.title': 'UI/UX डिज़ाइन',
        'services.uiux.description': 'असाधारण उपयोगकर्ता अनुभव के साथ सुंदर और सहज युक्ता इंटरफेस।',
        'services.marketing.title': 'डिजिटल मार्केटिंग',
        'services.marketing.description': 'आपकी ऑनलाइन उपस्थिति को बढ़ाने के लिए रणनीतिक डिजिटल मार्केटिंग समाधान।',

        // Portfolio Page
        'portfolio.title': 'हमारा पोर्टफोलियो',
        'portfolio.subtitle': 'हमारे हाल के कुछ प्रोजेक्ट देखें',
        'portfolio.viewProject': 'प्रोजेक्ट देखें',

        // Blog Page
        'blog.title': 'हमारा ब्लॉग',
        'blog.subtitle': 'हमारी टीम से नवीनतम अंतर्दृष्टि और अपडेट',
        'blog.readMore': 'और पढ़ें',
        'blog.categories.webDevelopment': 'वेब डेवलपमेंट',
        'blog.categories.mobileDevelopment': 'मोबाइल डेवलपमेंट',
        'blog.categories.uiUxDesign': 'UI/UX डिज़ाइन',
        'blog.posts.webDev.title': 'वेब डेवलपमेंट का भविष्य',
        'blog.posts.webDev.description': 'वेब डेवलपमेंट में नवीनतम रुझानों और प्रौद्योगिकियों का अन्वेषण।',
        'blog.posts.webDev.date': '15 मार्च 2024',
        'blog.posts.webDev.readTime': '5 मिनट पढ़ने का समय',
        'blog.posts.mobileDev.title': 'मोबाइल ऐप डेवलपमेंट के सर्वोत्तम अभ्यास',
        'blog.posts.mobileDev.description': 'सफल मोबाइल एप्लिकेशन बनाने के लिए आवश्यक प्रथाओं को सीखें।',
        'blog.posts.mobileDev.date': '10 मार्च 2024',
        'blog.posts.mobileDev.readTime': '4 मिनट पढ़ने का समय',
        'blog.posts.uiUx.title': 'उपयोगकर्ता अनुभव के लिए डिज़ाइन',
        'blog.posts.uiUx.description': 'असाधारण उपयोगकर्ता अनुभव बनाने के लिए महत्वपूर्ण सिद्धांत और रणनीतियाँ।',
        'blog.posts.uiUx.date': '5 मार्च 2024',
        'blog.posts.uiUx.readTime': '6 मिनट पढ़ने का समय',
    },
    gu: {
        // Navigation
        'nav.home': 'હોમ',
        'nav.about': 'અમારા વિશે',
        'nav.services': 'સેવાઓ',
        'nav.portfolio': 'પોર્ટફોલિયો',
        'nav.blog': 'બ્લોગ',
        'nav.contact': 'સંપર્ક',
        'nav.getStarted': 'શરૂ કરો',

        // Footer
        'footer.company': 'WebDevCo',
        'footer.description': 'અમે આકર્ષક વેબસાઇટ્સ અને શક્તિશાળી વેબ એપ્લિકેશન્સ બનાવીએ છીએ.',
        'footer.quickLinks': 'ઝડપી લિંક્સ',
        'footer.services': 'સેવાઓ',
        'footer.contact': 'સંપર્ક',
        'footer.webDev': 'વેબ ડેવલપમેન્ટ',
        'footer.mobileDev': 'મોબાઇલ ડેવલપમેન્ટ',
        'footer.uiux': 'UI/UX ડિઝાઇન',
        'footer.marketing': 'ડિજિટલ માર્કેટિંગ',
        'footer.email': 'contact@webdevco.com',
        'footer.phone': '+1 (555) 123-4567',
        'footer.address': '123 બિઝનેસ સ્ટ્રીટ',
        'footer.location': 'શહેર, દેશ',
        'footer.rights': 'બધા હક્કો અનામત.',

        // Contact Form
        'contact.title': 'સંપર્ક કરો',
        'contact.subtitle': 'કોઈ પ્રશ્ન છે અથવા સાથે કામ કરવું છે? અમે તમારાથી સાંભળવા માંગીએ છીએ.',
        'contact.getInTouch': 'સંપર્કમાં રહો',
        'contact.sendMessage': 'અમને સંદેશ મોકલો',
        'contact.name': 'નામ',
        'contact.email': 'ઇમેઇલ',
        'contact.subject': 'વિષય',
        'contact.message': 'સંદેશ',
        'contact.send': 'મોકલો',
        'contact.success': 'તમારો સંદેશ સફળતાપૂર્વક મોકલી દેવામાં આવ્યો છે!',
        'contact.error': 'તમારું ફોર્મ સબમિટ કરવામાં એક ભૂલ આવી. કૃપા કરી ફરીથી પ્રયાસ કરો.',
        'contact.required': 'આ ફીલ્ડ જરૂરી છે',
        'contact.invalidEmail': 'અમાન્ય ઇમેઇલ સરનામું',
        'contact.minLength': 'ઓછામાં ઓછા {min} અક્ષરો હોવા જોઈએ',
        'contact.maxLength': 'વધુમાં વધુ {max} અક્ષરો હોવા જોઈએ',

        // Services
        'services.web.title': 'વેબ ડેવલપમેન્ટ',
        'services.web.description': 'અમે આધુનિક અને રિસ્પોન્સિવ વેબસાઇટ્સ બનાવીએ છીએ જે તમારા વ્યવસાયને વધારે છે.',
        'services.mobile.title': 'મોબાઇલ ડેવલપમેન્ટ',
        'services.mobile.description': 'iOS અને Android માટે નેટિવ મોબાઇલ એપ્સ વિકસાવો.',
        'services.ui.title': 'UI/UX ડિઝાઇન',
        'services.ui.description': 'યુઝર-સેન્ટર્ડ ડિઝાઇન જે તમારા યુઝર્સને આકર્ષે છે.',

        // Home Page
        'home.hero.title': 'તમારી ડિજિટલ હાજરીને રૂપાંતર કરો',
        'home.hero.subtitle': 'અમે આકર્ષક વેબસાઇટ્સ અને શક્તિશાળી વેબ એપ્લિકેશન્સ બનાવીએ છીએ જે વ્યવસાય વૃદ્ધિને વેગ આપે છે.',
        'home.hero.cta': 'શરૂ કરો',
        'home.services.title': 'અમારી સેવાઓ',
        'home.services.subtitle': 'તમારા વ્યવસાય માટે વ્યાપક વેબ સોલ્યુશન્સ',
        'home.about.title': 'અમારા વિશે',
        'home.about.subtitle': 'અમે ઉત્સાહી ડેવલપર્સ અનુભવ કે ડિઝાઇનર્સની ટીમ છીએ',
        'home.about.description': 'વેબ ડેવલપમેન્ટમાં વર્ષોના અનુભવ સાથે, અમે અસાધારણ ડિજિટલ સોલ્યુશન્સ પ્રદાન કરીએ છીએ જે વ્યવસાય વૃદ્ધિને વેગ આપે છે.',

        // About Page
        'about.title': 'અમારા વિશે',
        'about.subtitle': 'અમારી કંપની અને મિશન વિશે વધુ જાણો',
        'about.mission': 'અમારું મિશન',
        'about.mission.text': 'અસાધારણ ડિજિટલ સોલ્યુશન્સ પ્રદાન કરવા જે વ્યવસાય વૃદ્ધિ અને સફળતાને વેગ આપે છે.',
        'about.vision': 'અમારી દૃષ્ટિ',
        'about.vision.text': 'નવીનતા અને ગુણવત્તા માટે જાણીતી અગ્રણી વેબ ડેવલપમેન્ટ કંપની બનવું.',
        'about.values': 'અમારા મૂલ્યો',
        'about.values.quality': 'ગુણવત્તા',
        'about.values.innovation': 'નવીનતા',
        'about.values.integrity': 'પ્રામાણિકતા',
        'about.values.collaboration': 'સહયોગ',

        // Services Page
        'services.title': 'અમારી સેવાઓ',
        'services.subtitle': 'તમારા વ્યવસાય માટે વ્યાપક વેબ સોલ્યુશન્સ',
        'services.webdev.title': 'વેબ ડેવલપમેન્ટ',
        'services.webdev.description': 'નવીનતમ ટેકનોલોજી સાથે બનાવેલી કસ્ટમ વેબસાઇટ્સ અને વેબ એપ્લિકેશન્સ.',
        'services.mobiledev.title': 'મોબાઇલ ડેવલપમેન્ટ',
        'services.mobiledev.description': 'iOS અને Android માટે નેટિવ અને ક્રોસ-પ્લેટફોર્મ મોબાઇલ એપ્લિકેશન્સ.',
        'services.uiux.title': 'UI/UX ડિઝાઇન',
        'services.uiux.description': 'અસાધારણ યુઝર એક્સપિરિયન્સ સાથે સુંદર અને સહજ યુઝર ઇન્ટરફેસ.',
        'services.marketing.title': 'ડિજિટલ માર્કેટિંગ',
        'services.marketing.description': 'તમારી ઓનલાઇન હાજરીને વધારવા માટે વ્યૂહાત્મક ડિજિટલ માર્કેટિંગ સોલ્યુશન્સ.',

        // Portfolio Page
        'portfolio.title': 'અમારું પોર્ટફોલિયો',
        'portfolio.subtitle': 'અમારા તાજેતરના કેટલાક પ્રોજેક્ટ્સ જુઓ',
        'portfolio.viewProject': 'પ્રોજેક્ટ જુઓ',

        // Blog Page
        'blog.title': 'અમારો બ્લોગ',
        'blog.subtitle': 'અમારી ટીમ તરફથી નવીનતમ ઇનસાઇટ્સ અને અપડેટ્સ',
        'blog.readMore': 'વધુ વાંચો',
        'blog.categories.webDevelopment': 'વેબ ડેવલપમેન્ટ',
        'blog.categories.mobileDevelopment': 'મોબાઇલ ડેવલપમેન્ટ',
        'blog.categories.uiUxDesign': 'UI/UX ડિઝાઇન',
        'blog.posts.webDev.title': 'વેબ ડેવલપમેન્ટનું ભવિષ્ય',
        'blog.posts.webDev.description': 'વેબ ડેવલપમેન્ટમાં નવીનતમ ટ્રેન્ડ્સ અને ટેકનોલોજીની શોધ.',
        'blog.posts.webDev.date': '15 માર્ચ 2024',
        'blog.posts.webDev.readTime': '5 મિનિટ વાંચવાનો સમય',
        'blog.posts.mobileDev.title': 'મોબાઇલ એપ ડેવલપમેન્ટના શ્રેષ્ઠ પ્રયાસો',
        'blog.posts.mobileDev.description': 'સફળ મોબાઇલ એપ્લિકેશન બનાવવા માટે જરૂરી પ્રથાઓ શીખો.',
        'blog.posts.mobileDev.date': '10 માર્ચ 2024',
        'blog.posts.mobileDev.readTime': '4 મિનિટ વાંચવાનો સમય',
        'blog.posts.uiUx.title': 'વપરાશકર્તા અનુભવ માટે ડિઝાઇન',
        'blog.posts.uiUx.description': 'અસાધારણ વપરાશકર્તા અનુભવ બનાવવા માટે મહત્વપૂર્ણ સિદ્ધાંતો અને વ્યૂહરચનાઓ.',
        'blog.posts.uiUx.date': '5 માર્ચ 2024',
        'blog.posts.uiUx.readTime': '6 મિનિટ વાંચવાનો સમય',
    },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Get saved language from localStorage or use browser language
        const savedLanguage = localStorage.getItem('language') as Language;
        const browserLanguage = navigator.language.split('-')[0] as Language;

        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        } else if (translations[browserLanguage]) {
            setCurrentLanguage(browserLanguage);
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('language', currentLanguage);
            document.documentElement.lang = currentLanguage;
        }
    }, [currentLanguage, mounted]);

    const setLanguage = (lang: Language) => {
        if (translations[lang]) {
            setCurrentLanguage(lang);
        }
    };

    const t = (key: string): string => {
        return translations[currentLanguage]?.[key] || translations['en'][key] || key;
    };

    // Don't render children until we've determined the language
    if (!mounted) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 