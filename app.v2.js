// ==================== STATE ====================
let currentSlide = 0;
const totalSlides = 19;
let autoplayInterval = null;
let narrationEnabled = true;
let isSpeaking = false;

// ==================== NARRATION SCRIPTS ====================
const narrations = [
  // Slide 0: Title
  "Bienvenidos al Sistema Inteligente de Prospección Comercial Automatizada de Redegal. Un sistema que combina inteligencia artificial, análisis técnico profundo e inteligencia de noticias, diseñado para las cuatro líneas de negocio: Boostic, Binnacle, Digital Tech y Digital Agency.",

  // Slide 1: Problem
  "El reto es claro: la prospección manual no escala. El 72% del tiempo comercial se pierde en leads no cualificados. Tenemos 4 líneas de negocio con necesidades completamente diferentes. Y cero visibilidad sobre el timing, es decir, cuándo es el mejor momento para contactar a un prospect. Necesitamos un sistema inteligente. Y como veis abajo, ya el bot del sistema puede cuantificar este problema: 840 horas perdidas y 420 mil euros de coste de oportunidad.",

  // Slide 2: Solution
  "La solución se basa en cuatro pilares integrados. Primero, Enginy, una plataforma de prospección B2B que automatiza búsqueda y outreach. Segundo, la Capa de Inteligencia Redegal con scrapers propios y Claude para análisis técnico profundo. Tercero, Inteligencia de Noticias que monitoriza Google News y BORME para detectar aceleradores y stoppers. Y cuarto, HubSpot más Binnacle como CRM y dashboard de pipeline.",

  // Slide 3: Pipeline
  "El pipeline tiene 6 fases. Fase 1, Enginy identifica empresas ICP. Fase 2, enriquece con más de 30 fuentes de contactos. Fase 3, nuestra capa analiza el tech stack, ecommerce, SEO y BI de cada prospect. Fase 4, rastreamos noticias en paralelo. Fase 5, Claude genera un score multi-línea con mensaje personalizado. Y Fase 6, se activa el outreach multicanal. Todo automático. Abajo podemos ver que de 500 empresas ICP, el sistema genera entre 45 y 60 leads calientes con un 82% de precisión.",

  // Slide 4: Boostic - Casa del Libro
  "Veamos un ejemplo real. Casa del Libro, la mayor cadena de librerías de España con ecommerce en Salesforce Commerce Cloud. El sistema detecta que tienen más de 500.000 referencias, con React en el frontend, Algolia para búsqueda, Criteo para retargeting, y Akamai como CDN. GA4 y GTM configurados, New Relic para monitorización. PageSpeed de 42, LCP de 5,8 segundos. El catálogo enorme no tiene feed optimizado para Google Shopping: los títulos no incluyen autor ni editorial, faltan atributos clave. Las noticias confirman que renuevan su plataforma digital y que el sector crece un 4,2%. Señal clara para Boostic.",

  // Slide 5: Scoring Casa del Libro
  "El scoring asigna a Casa del Libro un 78 en Boostic, categoría hot. A la izquierda, el mensaje outreach generado. A la derecha, el Asistente de Leads: un bot que funciona tanto desde la web como desde Telegram, para que el comercial pueda preguntar desde el móvil. El motor de IA es intercambiable: se puede usar Claude, ChatGPT, o ambos en paralelo. Aquí vemos que Claude explica el desglose del score con datos reales. Y lo más importante: cada pregunta y cada respuesta alimenta una Knowledge Base que va creciendo. Esa base se puede consultar como documentación o exportar en PDF. Así el conocimiento no se pierde: se acumula y se comparte.",

  // Slide 6: Binnacle - Mango
  "Segundo ejemplo: Mango, la multinacional de moda española con 2.700 millones de euros de facturación. El sistema detecta que tienen Adobe Analytics, Google Tag Manager, Salesforce Marketing Cloud y Tableau, pero cada herramienta funciona en su propio silo. Más de 2.700 tiendas físicas más ecommerce más app sin atribución unificada entre canales. Las noticias confirman que superan los 3.000 millones de facturación y abren 100 tiendas nuevas con estrategia omnicanal. Timing perfecto para Binnacle: consolidar todos los datos en una plataforma única. Ticket estimado entre 60 y 120 mil euros al año.",

  // Slide 7: Binnacle - CBNK (Banco de Caminos)
  "Siguiente ejemplo para Binnacle: CBNK, antes conocido como Banco Caminos. Un banco de nicho con 3.422 millones de euros en activos, especializado en colectivos profesionales: ingenieros, farmacéuticos y médicos. El sistema detecta Adobe Experience Manager, Google Analytics con GTM, Salesforce como CRM, y SAP SuccessFactors para recursos humanos, migrado recientemente desde Excel. El dato clave: en 2023 fusionaron Banco Caminos con Bancofar, y aún no tienen un BI unificado que consolide los datos de ambas entidades. Las noticias confirman un beneficio neto de 18 millones, un 43% más, y que el CEO reconoce que el reto es llevar el trato humano al mundo digital. Ticket Binnacle estimado: entre 36 y 60 mil euros al año.",

  // Slide 8: Binnacle - CaixaBank
  "Y ahora un caso de gran envergadura: CaixaBank, el mayor banco doméstico de España con 20,7 millones de clientes y 46.950 empleados. El sistema detecta Qlik Sense como BI principal con 25.000 usuarios, un Data Lake de más de 4 petabytes con 300 fuentes, y partnership con Google Cloud. Pero Qlik cubre lo operativo, no lo estratégico. La C-suite carece de una capa de insights ejecutivos para competitive intelligence y benchmarking sectorial. Las noticias confirman el Plan Cosmos con 5.000 millones de inversión en tecnología y el proyecto GalaxIA de inteligencia artificial generativa. Post-fusión con Bankia, aún hay datos heterogéneos en integración. Binnacle se posiciona como complemento estratégico de Qlik. Ticket estimado: entre 60 y 120 mil euros al año.",

  // Slide 9: De Online Drogist
  "Siguiente ejemplo: De Online Drogist, farmacia online líder en Países Bajos, una oportunidad cross-sell detectada para dos líneas: Boostic y Digital Business. El sistema detecta Magento 2, GA4, Cloudflare, Google Ads y Trustpilot. Tienen 42.000 keywords y DA 48. Por Boostic, score 82: catálogo de más de 20.000 productos sin feed optimizado para Google Shopping. Por Digital Business, score 74: quieren expandirse internacionalmente pero tienen cero keywords posicionadas en Bélgica, Alemania o Francia. Las noticias confirman un crecimiento del 35% y planes de expansión. La estrategia: entrar por Boostic con la optimización de catálogo, y escalar a Digital Business con SEO internacional. Ticket combinado: 75 a 145 mil euros al año.",

  // Slide 10: Tech - Gandhi
  "Tercer ejemplo: Gandhi, la mayor cadena de librerías de México, para Digital Tech. Los datos del crawling revelan que usan VTEX con jQuery, sin arquitectura moderna. Todavía tienen Google Analytics Universal en vez de GA4. Facebook Pixel sin server-side tracking. PageSpeed de solo 38, LCP de 6,5 segundos y CLS de 0,22. Rendimiento muy por debajo del benchmark. Las noticias indican que invierten 500 millones de pesos en transformación digital y que el ecommerce mexicano crece un 28%: momento perfecto para proponer una evolución tecnológica completa. Ticket estimado de 100 a 200 mil euros.",

  // Slide 11: Digital Business - Padel Nuestro
  "Cuarto ejemplo: Padel Nuestro para Digital Business. Datos reales: Adobe Commerce con Cloudflare, GA4, Google Ads, Meta Pixel y Klaviyo. DA 52 con 68.000 keywords en España, pero cero posicionamiento en Países Bajos, Alemania o Francia, mercados donde ya tienen almacén logístico. La expansión internacional está confirmada pero sin estrategia SEO. Las noticias revelan un crecimiento del 40%, un nuevo almacén en Países Bajos y que el padel genera más de 4.000 millones de euros en la economía española. Necesidad urgente de SEO internacional. Ticket de 8 a 15 mil euros al mes.",

  // Slide 12: Padel Nuestro - 3 líneas cross-sell
  "Y ahora el caso estrella: Padel Nuestro con oportunidad en 3 líneas simultáneas. 250 empleados, 65 millones de euros de facturación, más de 15.000 productos y expansión europea confirmada. Boostic, score 85: feed de Google Shopping sin optimizar para un catálogo enorme de padel, textil y accesorios. Digital Business, score 76: SEO internacional para los mercados donde ya tienen logística. Digital Tech, score 72: Adobe Commerce necesita evolución, PageSpeed 48 y LCP 5,1 segundos. Y Binnacle en warm con 60, posible a futuro para consolidar analytics multi-vertical. Ticket combinado potencial: entre 150 y 310 mil euros.",

  // Slide 13: Estrategia de ataque 3 líneas
  "¿Cómo se ataca cuando múltiples líneas aplican? Con una estrategia secuencial. Fase 1, entrada por Boostic, que tiene el score más alto con 85. El dolor es inmediato: más de 15.000 productos sin feed optimizado para Shopping. Proponemos una auditoría de feed con benchmark contra Wilson y Bullpadel. Fase 2, una vez dentro, expandimos a Digital Business para SEO internacional. Con el feed optimizado captando tráfico de pago, el siguiente paso natural es posicionar orgánicamente en NL, DE y FR donde ya tienen almacén. Fase 3, ya como partner estratégico con 2 líneas activas, proponemos Digital Tech para evolucionar Adobe Commerce a headless. En 3 meses pasamos de prospect a partner estratégico. El bot calcula un 78% de probabilidad de cerrar Digital Business en mes 2 si la auditoría Boostic es exitosa.",

  // Slide 14: Dashboard Dirección
  "Panel de Dirección en tiempo real. Arriba los 6 KPIs. En el centro, pipeline por línea, funnel y actividad. En la actividad vemos a Casa del Libro respondiendo al email de Boostic, Gandhi abriendo la propuesta Tech, y Padel Nuestro con su acelerador de expansión europea. Abajo a la izquierda, cross-sell detectados: Padel Nuestro con 3 líneas, De Online Drogist con Boostic y Digital, y los demás. Y a la derecha, el Asistente de Dirección: conectado por web y por Telegram, con motor Claude o ChatGPT a elegir. Todas las interacciones alimentan la Knowledge Base. 3.842 interacciones ya guardadas, 284 documentos generados. El conocimiento del sistema crece con cada uso.",

  // Slide 15: Dashboard - Ficha de Prospect
  "Desde el dashboard, dirección puede consultar la ficha completa de cualquier prospect. Aquí vemos Padel Nuestro: perfil de empresa con 250 empleados y 65 millones de euros, el score detallado por cada línea de negocio — Boostic 85, Digital Business 76, Tech 72, Binnacle 60 — y el ticket combinado de 150 a 310 mil euros. A la derecha, el historial completo de interacciones desde que Enginy identificó el lead. Abajo, las noticias clave que activan aceleradores como la expansión europea y el almacén en Países Bajos, los 5 contactos clave identificados con su estado de contacto, y las acciones recomendadas por la IA priorizadas por urgencia.",

  // Slide 16: Dashboard - Análisis y Reporting
  "El dashboard también ofrece análisis avanzado. Arriba a la izquierda, el ranking de top oportunidades por ticket potencial con Padel Nuestro a la cabeza con 310 mil euros, seguido de Gandhi con 200 mil y De Online Drogist con 145 mil. En el centro, el análisis sectorial muestra que Retail y eCommerce lidera con 312 leads. A la derecha, las tendencias mes a mes: leads más 23%, scoring medio subiendo 5 puntos, pipeline creciendo un 28%. Y lo más importante: informes automáticos. El informe semanal se genera solo cada lunes. El dashboard PDF y el resumen para comité están disponibles bajo demanda. Todo exportable a Excel. Y por supuesto, el bot de dirección puede generar y enviar cualquier informe directamente al canal de Telegram del comité.",

  // Slide 17: Implementation
  "La implementación: Claude hace toda la programación, arquitectura, fixes y documentación. Jorge, Gervasio, Fernando y Javier aportan contexto, revisan y despliegan. Elena e Isabel supervisan desde el dashboard de dirección y dan el go o no-go. 10 días laborables. Coste de setup de solo 1.500 euros en APIs y licencias, sin subcontrataciones porque todo el equipo es interno. ROI del primer año de 30 a 50 veces la inversión. Y como veis, Claude ya describe la arquitectura que va a construir: 4 microservicios, stack Python con FastAPI, y capacidad para procesar 10.000 leads al día por solo 45 euros diarios en APIs.",

  // Slide 18: Closing
  "En resumen: Enginy ejecuta, la inteligencia Redegal diferencia, las noticias dan timing, Binnacle gestiona el pipeline y el dashboard de dirección da visibilidad total al CEO. Un sistema que ningún competidor puede copiar. El equipo está definido: Jorge, Gervasio, Fernando y Javier en ejecución, Elena e Isabel en supervisión estratégica, y Claude en programación y arquitectura. 1.500 euros en APIs. 10 días. Equipo interno. Sin subcontrataciones. Claude construye. Redegal dirige. El bot nos proyecta que si arrancamos el 24 de febrero, tendríamos los primeros leads cualificados el día 5, y en 90 días un pipeline de entre 1,8 y 2,4 millones de euros. El breakeven se alcanza en la semana 3."
];

// ==================== PARTICLES ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.3 + 0.05
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 130, 246, ${p.o})`;
    ctx.fill();
  });

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 150)})`;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

initCanvas();
drawParticles();
window.addEventListener('resize', initCanvas);

// ==================== SLIDE NAVIGATION ====================
function showSlide(index) {
  if (index < 0 || index >= totalSlides) return;

  // Hide current
  const current = document.getElementById(`slide-${currentSlide}`);
  if (current) {
    current.classList.remove('active');
    current.classList.add('exit-up');
    setTimeout(() => current.classList.remove('exit-up'), 800);
  }

  currentSlide = index;

  // Show new
  const next = document.getElementById(`slide-${currentSlide}`);
  if (next) {
    next.classList.add('active');
  }

  // Update counter
  document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${totalSlides}`;

  // Update progress
  document.getElementById('progressBar').style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

  // Animate slide elements
  animateSlide(currentSlide);

  // Narrate
  if (narrationEnabled) {
    speakText(null, currentSlide);
  }
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) showSlide(currentSlide + 1);
}

function prevSlide() {
  if (currentSlide > 0) showSlide(currentSlide - 1);
}

// ==================== ANIMATION ====================
function animateSlide(index) {
  const slide = document.getElementById(`slide-${index}`);
  if (!slide) return;

  // Animate pipeline steps
  if (index === 3) {
    slide.querySelectorAll('.pipeline-step, .pipeline-arrow').forEach(el => {
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
    });
  }

  // Animate analysis cards
  if ([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(index)) {
    slide.querySelectorAll('.analysis-card').forEach(el => {
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
    });
  }

  // Animate score bars
  if (index === 5 || index === 11) {
    slide.querySelectorAll('.score-row').forEach(el => {
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => {
        el.classList.add('visible');
        el.querySelector('.score-bar-fill').classList.add('animated');
      }, delay);
    });
  }

  // Animate KPI counter on dashboard slide
  if (index === 12) {
    const kpiEl = document.getElementById('kpi-leads');
    if (kpiEl) {
      let count = 0;
      const target = 1042;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(interval); }
        kpiEl.textContent = count.toLocaleString('es-ES');
      }, 50);
    }
  }

  // Animate fade children
  slide.querySelectorAll('.fade-child').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 200 + 300);
  });
}

// ==================== NARRATION (Pre-recorded MP3) ====================
let currentAudio = null;

function speakText(text, slideIndex) {
  if (!narrationEnabled) return;

  // Stop any playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const idx = (slideIndex !== undefined) ? slideIndex : currentSlide;
  const pad = String(idx).padStart(2, '0');
  const audio = new Audio(`audio/slide_${pad}.mp3`);
  audio.onerror = function() {
    // Fallback to m4a if mp3 not found
    const fallback = new Audio(`audio/slide_${pad}.m4a`);
    fallback.onplay = audio.onplay;
    fallback.onended = audio.onended;
    fallback.onerror = function() { isSpeaking = false; document.getElementById('audioWave').classList.add('paused'); };
    currentAudio = fallback;
    setTimeout(() => fallback.play().catch(() => {}), 100);
  };
  currentAudio = audio;

  audio.onplay = () => {
    isSpeaking = true;
    document.getElementById('audioWave').classList.remove('paused');
  };

  audio.onended = () => {
    isSpeaking = false;
    document.getElementById('audioWave').classList.add('paused');
    currentAudio = null;
  };

  audio.onerror = () => {
    isSpeaking = false;
    document.getElementById('audioWave').classList.add('paused');
    currentAudio = null;
  };

  // Small delay for slide transition
  setTimeout(() => audio.play().catch(() => {}), 600);
}

function toggleNarration() {
  narrationEnabled = !narrationEnabled;
  document.getElementById('narrationLabel').textContent = narrationEnabled ? 'Audio ON' : 'Audio OFF';
  if (!narrationEnabled) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    isSpeaking = false;
    document.getElementById('audioWave').classList.add('paused');
  } else {
    speakText(null, currentSlide);
  }
}

// ==================== AUTOPLAY ====================
let slideShownAt = Date.now();
const MIN_SLIDE_TIME = 8000; // Mínimo 8 segundos por slide aunque no haya narración

function toggleAutoplay() {
  const btn = document.getElementById('playBtn');
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    btn.textContent = '\u25B6';
    btn.classList.remove('active');
  } else {
    btn.textContent = '\u23F8';
    btn.classList.add('active');
    slideShownAt = Date.now();
    // Wait for narration to finish AND minimum time before advancing
    autoplayInterval = setInterval(() => {
      const elapsed = Date.now() - slideShownAt;
      if (!isSpeaking && elapsed >= MIN_SLIDE_TIME) {
        if (currentSlide < totalSlides - 1) {
          slideShownAt = Date.now();
          nextSlide();
        } else {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
          btn.textContent = '\u25B6';
          btn.classList.remove('active');
        }
      }
    }, 1000);
  }
}

// ==================== KEYBOARD ====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    nextSlide();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevSlide();
  }
  if (e.key === 'a' || e.key === 'A') {
    toggleNarration();
  }
  if (e.key === 'p' || e.key === 'P') {
    toggleAutoplay();
  }
});

// ==================== INIT ====================
// Animate first slide (but don't speak yet — wait for user click)
animateSlide(0);

function startPresentation() {
  // Remove overlay
  document.getElementById('startOverlay').style.display = 'none';
  // Start narration for first slide
  if (narrationEnabled) {
    speakText(null, 0);
  }
  // Auto-start autoplay
  slideShownAt = Date.now();
  toggleAutoplay();
}
