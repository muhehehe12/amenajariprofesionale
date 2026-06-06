document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Loading Screen Timeout ---
    const loadingScreen = document.getElementById("loading-screen");
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.visibility = "hidden";
        }, 500);
    }, 1000);

    // --- 2. Mobile Navigation Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        const spans = hamburger.querySelectorAll("span");
        if (navLinks.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            spans.forEach(s => s.style.transform = "none");
            spans[1].style.opacity = "1";
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelectorAll("span").forEach(s => s.style.transform = "none");
            hamburger.querySelectorAll("span")[1].style.opacity = "1";
        });
    });

    // --- 3. Intersection Observer Scroll Animation ---
    const reveals = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 4. Language Translation Database (RO / EN) ---
    const dictionary = {
        ro: {
            "loading": "Se încarcă...",
            "nav-home": "Acasă",
            "nav-about": "Despre Noi",
            "nav-services": "Servicii",
            "nav-contact": "Contact",
            "hero-badge": "București & Ilfov",
            "hero-title": "Modelarea Terenului și Managementul Apei",
            "hero-subtitle": "Sisteme profesionale de drenaj pentru apă pluvială, irigații automatizate și amenajări peisagistice complete realizate cu utilaje proprii.",
            "hero-cta": "Solicită Evaluare: 076 206 0206",
            "about-title": "Infrastructură Completă pentru Curtea Ta",
            "about-desc-1": "Suntem specializați în transformarea integrală a terenurilor. Dispunem de toată logistica necesară pentru proiecte de orice anvergură: motoburghiu, buldoexcavatoare, camionetă basculabilă și utilaje tip Bobcat.",
            "about-desc-2": "Asigurăm inclusiv aport de pământ vegetal de umplutură sau mraniță de pădure pentru o bază nutritivă excelentă a plantelor. Toate lucrările noastre se pot finaliza cu factură fiscală.",
            "services-title": "Soluții Tehnice și Estetice",
            "srv-1-title": "Drenaj Apă Pluvială",
            "srv-1-desc": "Sisteme avansate de colectare și evacuare a apelor pluviale pentru combaterea infiltrațiilor și eliminarea băltirilor de lungă durată din curte.",
            "srv-2-title": "Irigații Automatizate",
            "srv-2-desc": "Instalare sisteme inteligente cu aspersoare, zone dedicate de picurare pentru flori sau arbuști și senzori de ploaie integrați.",
            "srv-3-title": "Pregătire & Îndreptare Teren",
            "srv-3-desc": "Curățarea vegetației nedorite, frezarea solului, nivelarea și compactarea mecanizată pentru optimizarea cotelor de scurgere.",
            "srv-4-title": "Gazonare Premium",
            "srv-4-desc": "Însămânțare profesională sau montaj rulouri de gazon adaptate expunerii la soare, urmate de program de fertilizare inițială.",
            "srv-5-title": "Arhitectură Acvatică",
            "srv-5-desc": "Proiectare și construcție cascade artificiale, elemente decorative din piatră naturală și fântâni arteziene perfect integrate în peisaj.",
            "srv-6-title": "Mentenanță Anuală",
            "srv-6-desc": "Întreținerea gazonului prin tunderi la intervale ideale de timp, fertilizări sezoniere, supraînsămânțări și tratamente specifice.",
            "contact-title": "Începe Transformarea Curții Tale",
            "contact-desc": "Prețurile noastre reflectă corect complexitatea proiectului și suprafața totală a terenului. Contactați-ne pentru o programare sau o evaluare inițială.",
            "contact-name": "Marcel",
            "contact-role": "Coordonator Tehnic Obiective",
            "contact-availability": "Deplasări zilnice pentru măsurători în București și județul Ilfov.",
            "footer-rights": "Toate drepturile rezervate."
        },
        en: {
            "loading": "Loading...",
            "nav-home": "Home",
            "nav-about": "About Us",
            "nav-services": "Services",
            "nav-contact": "Contact",
            "hero-badge": "Bucharest & Ilfov",
            "hero-title": "Land Grading & Water Management",
            "hero-subtitle": "Professional rainwater drainage systems, automated irrigation, and complete landscape structuring performed with heavy machinery.",
            "hero-cta": "Request Evaluation: 076 206 0206",
            "about-title": "Full Infrastructure for Your Yard",
            "about-desc-1": "We specialize in comprehensive land modifications. We possess all necessary logistics for large-scale operations: power augers, backhoes, dump trucks, and Bobcat loaders.",
            "about-desc-2": "We also provide delivery of high-quality topsoil or forest humus for a rich plant nutritional foundation. All works can be finalized with an official fiscal invoice.",
            "services-title": "Technical & Aesthetic Solutions",
            "srv-1-title": "Stormwater Drainage",
            "srv-1-desc": "Advanced systems for harvesting and redirecting rainwater to combat infiltration and eliminate chronic yard ponding.",
            "srv-2-title": "Automated Irrigation",
            "srv-2-desc": "Installation of intelligent sprinkler networks, dedicated drip lines for flora/shrubs, and integrated weather sensors.",
            "srv-3-title": "Site Prep & Leveling",
            "srv-3-desc": "Clearing unwanted undergrowth, soil tilling, mechanical grading, and compacting to optimize drainage lines.",
            "srv-4-title": "Premium Turfing",
            "srv-4-desc": "Professional hydroseeding or instant turf rolls selected for sun exposure, followed by baseline fertilization.",
            "srv-5-title": "Aquatic Architecture",
            "srv-5-desc": "Design and development of custom waterfalls, ornamental stone features, and landscape fountains.",
            "srv-6-title": "Annual Maintenance",
            "srv-6-desc": "Lawn care management via timely mowing cycles, seasonal feeding, overseeding, and preventative lawn treatments.",
            "contact-title": "Start Restructuring Your Yard",
            "contact-desc": "Our rates fairly correspond to the complexity of the project and total ground area. Get in touch for scheduling or an initial analysis.",
            "contact-name": "Marcel",
            "contact-role": "Technical Site Coordinator",
            "contact-availability": "Daily site assessments and measurements in Bucharest and Ilfov county.",
            "footer-rights": "All rights reserved."
        }
    };

    const btnEn = document.getElementById("lang-en");
    const btnRo = document.getElementById("lang-ro");
    const translatableElements = document.querySelectorAll("[data-i18n]");

    const switchLanguage = (lang) => {
        translatableElements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dictionary[lang][key]) {
                el.innerText = dictionary[lang][key];
            }
        });

        if (lang === 'en') {
            btnEn.classList.add("active");
            btnRo.classList.remove("active");
            document.documentElement.lang = "en";
        } else {
            btnRo.classList.add("active");
            btnEn.classList.remove("active");
            document.documentElement.lang = "ro";
        }
    };

    btnEn.addEventListener("click", () => switchLanguage('en'));
    btnRo.addEventListener("click", () => switchLanguage('ro'));
});
