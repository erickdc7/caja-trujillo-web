# PROMPT — Rediseño Frontend Caja Trujillo con Astro

# Para usar con: Gemini CLI / Antigravity / Claude Code / Copilot CLI

---

## ROL Y CONTEXTO

Eres un desarrollador frontend senior especializado en Astro, sistemas
de diseño UI y accesibilidad web. Vas a crear el proyecto frontend
completo del sitio web institucional de Caja Municipal de Ahorro y
Crédito de Trujillo (Caja Trujillo), la entidad microfinanciera más
importante del norte del Perú.

El resultado debe ser moderno, limpio, profesional, totalmente responsivo
y fiel a los colores de marca. No hay backend ni base de datos. Toda la
información viene de archivos JSON locales dentro del proyecto Astro.

Trabaja archivo por archivo con código completo y funcional en cada paso.
Nunca dejes comentarios como "// resto del código aquí".

---

## PASO 0 — INSTALAR MODERN WEB GUIDANCE (ANTES DE TODO)

Antes de crear cualquier archivo, ejecuta este comando para instalar el
plugin Modern Web Guidance. Este plugin orienta al agente a seguir buenas
prácticas web modernas: rendimiento, accesibilidad WCAG, Core Web Vitals,
APIs modernas del navegador y CSS moderno mientras genera cada componente.

Para Antigravity CLI:
agy plugin install https://github.com/GoogleChrome/modern-web-guidance

Para Claude Code:

# 1. Add the marketplace:

/plugin marketplace add GoogleChrome/modern-web-guidance

# 2. Install the plugin:

/plugin install modern-web-guidance@googlechrome

# 3. Reload plugins:

/reload plugins

Para npx (cualquier agente):
npx modern-web-guidance@latest install

Una vez instalado, aplica automáticamente sus recomendaciones en cada
componente generado: imágenes optimizadas, fuentes con font-display swap,
Intersection Observer para animaciones, elemento dialog nativo, focus-visible
para teclado, y Lighthouse score mayor a 90 como objetivo.

---

## PASO 1 — INICIALIZAR EL PROYECTO

```bash
npm create astro@latest . -- \
  --template minimal \
  --typescript strict \
  --no-install \
  --no-git

npm install

npx astro add tailwind react --yes

npm install lucide-react @astrojs/sitemap sharp
```

---

## PASO 2 — ESTRUCTURA DE CARPETAS

Crea esta estructura completa:

```
src/
├── components/
│   ├── layout/
│   │   ├── TopBar.astro
│   │   ├── Navbar.astro
│   │   ├── MobileMenu.astro
│   │   └── Footer.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   ├── Card.astro
│   │   └── SectionHeader.astro
│   ├── home/
│   │   ├── Hero.astro
│   │   ├── QuickAccess.astro
│   │   ├── TrustStrip.astro
│   │   ├── DigitalChannels.astro
│   │   └── SegmentCards.astro
│   ├── shared/
│   │   ├── CTABand.astro
│   │   ├── NoticeBanner.astro
│   │   └── BreadCrumb.astro
│   └── react/
│       ├── CreditSimulator.tsx
│       ├── ProductTabs.tsx
│       └── SimuladorPage.tsx
├── data/
│   ├── products-personas.json
│   ├── products-negocios.json
│   ├── products-seguros.json
│   ├── news.json
│   └── quick-access.json
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── pages/
│   ├── index.astro
│   ├── para-ti/
│   │   ├── index.astro
│   │   ├── credijoya.astro
│   │   ├── crece-mujer.astro
│   │   ├── cuenta-simple.astro
│   │   ├── plazo-fijo.astro
│   │   ├── hipotecaja.astro
│   │   └── seguros.astro
│   ├── para-tu-negocio/
│   │   ├── index.astro
│   │   ├── microemprendedor.astro
│   │   ├── agricola-emprendedor.astro
│   │   ├── facilito.astro
│   │   └── mi-local-comercial.astro
│   ├── canales-digitales/
│   │   ├── index.astro
│   │   ├── app-movil.astro
│   │   └── homebanking.astro
│   ├── institucional/
│   │   └── index.astro
│   ├── simuladores.astro
│   ├── noticias/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── 404.astro
└── styles/
    ├── tokens.css
    ├── global.css
    └── animations.css
```

---

## PASO 3 — DESIGN SYSTEM (src/styles/tokens.css)

```css
:root {
  /* COLORES DE MARCA — OBLIGATORIOS, NO MODIFICAR */
  --red-600: #cc0700;
  --red-500: #ff0901; /* Rojo Caja Trujillo — color primario */
  --red-400: #ff3b33;
  --red-200: #ffbdbb;
  --red-100: #ffe0df;
  --red-50: #fff5f5;

  --yellow-600: #cc9b00;
  --yellow-500: #ffc200; /* Amarillo Caja Trujillo — acento/secundario */
  --yellow-400: #ffd040;
  --yellow-200: #ffe99a;
  --yellow-100: #fff6d0;
  --yellow-50: #fffbec;

  /* NEUTROS — complementan rojo y amarillo */
  --gray-950: #0f0f12; /* fondos oscuros: hero, footer, topbar */
  --gray-900: #1a1a1e; /* texto principal */
  --gray-800: #2c2c32;
  --gray-700: #3e3e47;
  --gray-600: #5a5a66; /* texto secundario */
  --gray-500: #7a7a88;
  --gray-400: #9e9eac; /* texto muted */
  --gray-300: #c2c2cc;
  --gray-200: #e0e0e8; /* bordes */
  --gray-100: #f0f0f5; /* fondos de iconos */
  --gray-50: #f7f7fa; /* fondo base de página */
  --white: #ffffff;

  /* TIPOGRAFÍA */
  --font-head: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;

  /* BORDER RADII */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 14px;
  --r-xl: 20px;
  --r-2xl: 28px;

  /* SOMBRAS */
  --shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.07);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.09);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.11);
  --shadow-red: 0 4px 16px rgba(255, 9, 1, 0.28);
  --shadow-red-lg: 0 8px 32px rgba(255, 9, 1, 0.32);
  --shadow-yellow: 0 4px 14px rgba(255, 194, 0, 0.3);
}
```

En src/styles/global.css importa tokens.css y define:

- Reset box-sizing border-box en _, _::before, \*::after
- Body: font-family var(--font-body), color var(--gray-900),
  background var(--gray-50), -webkit-font-smoothing antialiased
- html: scroll-behavior smooth
- Fuentes Google: preconnect + import de Plus Jakarta Sans
  weights 600,700,800 y Inter weights 400,500,600 con display=swap
- Skip to main link accesible (visible solo en focus)

En src/styles/animations.css define:

- .fade-up: opacity 0 translateY(20px), .fade-up.visible: opacity 1 translateY(0)
  transition 0.55s ease
- .fade-in: opacity 0, .fade-in.visible: opacity 1, transition 0.4s ease
- @keyframes float: 0% y 100% translateY(0), 50% translateY(-8px), 6s ease
- @keyframes blink: 0% y 100% opacity 1, 50% opacity 0.3, 2s infinite
- Script global: Intersection Observer que agrega clase "visible" con
  threshold 0.15 y delay escalonado por índice de elemento

---

## PASO 4 — ARCHIVOS DE DATOS JSON

### src/data/products-personas.json

```json
[
  {
    "id": "credijoya",
    "slug": "credijoya",
    "icon": "Gem",
    "badge": "Destacado",
    "badgeVariant": "yellow",
    "name": "Credijoya",
    "shortDesc": "Obtén liquidez inmediata dejando tus joyas como garantía. Proceso en minutos, sin burocracia.",
    "feature": "Aprobación el mismo día",
    "cta": "Solicitar ahora",
    "ctaHref": "/para-ti/credijoya",
    "featured": true,
    "minAmount": 200,
    "maxAmount": 50000,
    "maxMonths": 12,
    "tea": 48.5,
    "benefits": [
      {
        "icon": "Zap",
        "title": "Aprobación inmediata",
        "desc": "Evaluación y desembolso el mismo día de tu solicitud"
      },
      {
        "icon": "Shield",
        "title": "Joyas protegidas",
        "desc": "Tus prendas están aseguradas durante todo el plazo del crédito"
      },
      {
        "icon": "RefreshCw",
        "title": "Renovación fácil",
        "desc": "Renueva sin necesidad de retirar tus joyas"
      },
      {
        "icon": "TrendingDown",
        "title": "Tasa competitiva",
        "desc": "Una de las tasas más bajas del mercado microfinanciero"
      }
    ],
    "requirements": [
      "DNI vigente",
      "Joyas de oro, plata o platino",
      "No requiere historial crediticio",
      "No requiere aval"
    ],
    "steps": [
      {
        "icon": "Gem",
        "title": "Presenta tus joyas",
        "desc": "Lleva tus joyas a cualquier agencia Caja Trujillo"
      },
      {
        "icon": "Search",
        "title": "Evaluación inmediata",
        "desc": "Nuestro tasador evalúa tus prendas al instante"
      },
      {
        "icon": "Banknote",
        "title": "Recibe tu dinero",
        "desc": "Desembolso inmediato en efectivo o a tu cuenta"
      }
    ],
    "metaTitle": "Credijoya — Préstamo con garantía de joyas | Caja Trujillo",
    "metaDesc": "Obtén crédito inmediato con tus joyas en Caja Trujillo. Sin historial crediticio, aprobación el mismo día."
  },
  {
    "id": "crece-mujer",
    "slug": "crece-mujer",
    "icon": "Heart",
    "badge": "Crédito especial",
    "badgeVariant": "red",
    "name": "Crece Mujer",
    "shortDesc": "Línea de crédito con tasa preferencial diseñada para mujeres emprendedoras del Perú.",
    "feature": "Tasa preferencial exclusiva",
    "cta": "Conocer más",
    "ctaHref": "/para-ti/crece-mujer",
    "featured": false,
    "minAmount": 500,
    "maxAmount": 30000,
    "maxMonths": 36,
    "tea": 32.0,
    "benefits": [
      {
        "icon": "Percent",
        "title": "Tasa diferenciada",
        "desc": "Condiciones preferenciales exclusivas para titulares mujeres"
      },
      {
        "icon": "Users",
        "title": "Asesoría incluida",
        "desc": "Acompañamiento financiero durante todo el crédito"
      },
      {
        "icon": "Clock",
        "title": "Trámite ágil",
        "desc": "Proceso simplificado y rápido de evaluación"
      },
      {
        "icon": "Award",
        "title": "Capacitación",
        "desc": "Acceso a talleres de educación financiera y empresarial"
      }
    ],
    "requirements": [
      "DNI vigente",
      "Ser mujer mayor de 18 años",
      "Tener actividad económica o negocio",
      "Sin aval hasta S/ 5,000"
    ],
    "metaTitle": "Crece Mujer — Crédito para mujeres emprendedoras | Caja Trujillo",
    "metaDesc": "Crédito especial con tasa preferencial para mujeres emprendedoras en Caja Trujillo."
  },
  {
    "id": "cuenta-simple",
    "slug": "cuenta-simple",
    "icon": "CreditCard",
    "badge": "Cuenta de ahorros",
    "badgeVariant": "yellow",
    "name": "Cuenta Simple",
    "shortDesc": "Abre tu cuenta sin comisiones, sin monto mínimo y con tarjeta Visa incluida desde el día uno.",
    "feature": "Sin costo de mantenimiento",
    "cta": "Abrir cuenta",
    "ctaHref": "/para-ti/cuenta-simple",
    "featured": false,
    "benefits": [
      {
        "icon": "CircleDollarSign",
        "title": "Sin costo mensual",
        "desc": "Cero cobros por mantener tu cuenta activa"
      },
      {
        "icon": "CreditCard",
        "title": "Tarjeta Visa incluida",
        "desc": "Débito Visa para compras en tiendas y online"
      },
      {
        "icon": "Smartphone",
        "title": "Banca digital gratis",
        "desc": "App y homebanking sin costo adicional"
      },
      {
        "icon": "Globe",
        "title": "Uso internacional",
        "desc": "Cajeros y comercios en todo el mundo"
      }
    ],
    "requirements": [
      "DNI vigente",
      "Apertura desde S/ 1",
      "Mayor de 18 años",
      "Sin historial crediticio requerido"
    ],
    "metaTitle": "Cuenta Simple — Cuenta de ahorros sin comisiones | Caja Trujillo",
    "metaDesc": "Abre tu cuenta de ahorros gratis en Caja Trujillo. Sin mantenimiento, sin saldo mínimo, con tarjeta Visa."
  },
  {
    "id": "plazo-fijo",
    "slug": "plazo-fijo",
    "icon": "TrendingUp",
    "badge": "Inversión",
    "badgeVariant": "yellow",
    "name": "Depósito a Plazo Fijo",
    "shortDesc": "Maximiza el rendimiento de tu dinero con tasas hasta 8% TEA. Plazos desde 30 días.",
    "feature": "Hasta 8% TEA garantizado",
    "cta": "Ver tasas",
    "ctaHref": "/para-ti/plazo-fijo",
    "featured": false,
    "metaTitle": "Depósito a Plazo Fijo | Caja Trujillo",
    "metaDesc": "Invierte con seguridad en Caja Trujillo. Tasas hasta 8% TEA, plazos desde 30 días."
  },
  {
    "id": "hipotecaja",
    "slug": "hipotecaja",
    "icon": "Home",
    "badge": "Hipotecario",
    "badgeVariant": "red",
    "name": "Hipotecaja+",
    "shortDesc": "Financia la compra, construcción o mejora de tu vivienda con condiciones flexibles.",
    "feature": "Hasta 20 años de plazo",
    "cta": "Simular crédito",
    "ctaHref": "/para-ti/hipotecaja",
    "featured": false,
    "metaTitle": "Hipotecaja+ — Crédito hipotecario | Caja Trujillo",
    "metaDesc": "Financia tu vivienda en Caja Trujillo. Compra, construcción o mejora con plazo hasta 20 años."
  },
  {
    "id": "seguros",
    "slug": "seguros",
    "icon": "Shield",
    "badge": "Protección",
    "badgeVariant": "red",
    "name": "Seguros",
    "shortDesc": "Vida, sepelio y oncológico. Protege a tu familia ante cualquier imprevisto desde S/ 18/mes.",
    "feature": "Desde S/ 18 al mes",
    "cta": "Ver coberturas",
    "ctaHref": "/para-ti/seguros",
    "featured": false,
    "metaTitle": "Seguros de vida, sepelio y oncológico | Caja Trujillo",
    "metaDesc": "Seguros de vida, sepelio y oncológico en Caja Trujillo. Cobertura familiar desde S/ 18 al mes."
  }
]
```

### src/data/products-negocios.json

```json
[
  {
    "id": "microemprendedor",
    "slug": "microemprendedor",
    "icon": "Briefcase",
    "badge": "Más solicitado",
    "badgeVariant": "yellow",
    "name": "Microemprendedor",
    "shortDesc": "Capital de trabajo para hacer crecer tu negocio desde S/500, con evaluación en 24 horas.",
    "feature": "Respuesta en 24 horas",
    "cta": "Solicitar ahora",
    "ctaHref": "/para-tu-negocio/microemprendedor",
    "featured": true,
    "minAmount": 500,
    "maxAmount": 100000,
    "maxMonths": 48,
    "tea": 28.5,
    "benefits": [
      {
        "icon": "Clock",
        "title": "Respuesta en 24h",
        "desc": "Evaluación y aprobación en un día hábil"
      },
      {
        "icon": "FileText",
        "title": "Mínimo papeleo",
        "desc": "Proceso simplificado sin trámites engorrosos"
      },
      {
        "icon": "TrendingUp",
        "title": "Montos flexibles",
        "desc": "Desde S/ 500 hasta S/ 100,000 según tu capacidad"
      },
      {
        "icon": "Users",
        "title": "Asesor dedicado",
        "desc": "Un ejecutivo te acompaña durante todo el proceso"
      }
    ],
    "requirements": [
      "DNI vigente",
      "Actividad económica mínima 6 meses",
      "No requiere aval en montos menores a S/10,000",
      "Recibo de servicios del negocio"
    ],
    "steps": [
      {
        "icon": "FileText",
        "title": "Solicita en línea o en agencia",
        "desc": "Completa tu solicitud con tus datos básicos"
      },
      {
        "icon": "Search",
        "title": "Evaluación rápida",
        "desc": "Revisamos tu perfil y capacidad de pago en 24 horas"
      },
      {
        "icon": "Banknote",
        "title": "Desembolso",
        "desc": "Recibes el dinero en tu cuenta o en efectivo"
      }
    ],
    "metaTitle": "Crédito Microemprendedor | Caja Trujillo",
    "metaDesc": "Crédito para emprendedores desde S/500 en Caja Trujillo. Evaluación en 24 horas, mínimo papeleo."
  },
  {
    "id": "agricola-emprendedor",
    "slug": "agricola-emprendedor",
    "icon": "Sprout",
    "badge": "Sector agrícola",
    "badgeVariant": "red",
    "name": "Agrícola Emprendedor",
    "shortDesc": "Financia tu campaña agrícola con cronograma adaptado a tus ciclos de cosecha y producción.",
    "feature": "Cronograma adaptado al campo",
    "cta": "Ver condiciones",
    "ctaHref": "/para-tu-negocio/agricola-emprendedor",
    "featured": false,
    "metaTitle": "Crédito Agrícola Emprendedor | Caja Trujillo",
    "metaDesc": "Financia tu campaña agrícola en Caja Trujillo. Cronograma adaptado a tus ciclos de cosecha."
  },
  {
    "id": "facilito",
    "slug": "facilito",
    "icon": "Zap",
    "badge": "Ágil",
    "badgeVariant": "yellow",
    "name": "Facilito",
    "shortDesc": "El crédito más rápido para pequeños comerciantes. Sin papeleo, desembolso el mismo día.",
    "feature": "Desembolso el mismo día",
    "cta": "Solicitar Facilito",
    "ctaHref": "/para-tu-negocio/facilito",
    "featured": false,
    "metaTitle": "Facilito — Crédito rápido para comerciantes | Caja Trujillo",
    "metaDesc": "El crédito más ágil de Caja Trujillo. Sin papeleo, desembolso el mismo día para pequeños negocios."
  },
  {
    "id": "mi-local-comercial",
    "slug": "mi-local-comercial",
    "icon": "Store",
    "badge": "Local comercial",
    "badgeVariant": "red",
    "name": "Mi Local Comercial",
    "shortDesc": "Invierte en infraestructura para tu negocio: refacción, ampliación o compra de local.",
    "feature": "Hasta S/ 500,000",
    "cta": "Conocer más",
    "ctaHref": "/para-tu-negocio/mi-local-comercial",
    "featured": false,
    "metaTitle": "Mi Local Comercial — Inversión para tu negocio | Caja Trujillo",
    "metaDesc": "Financia la compra o mejora de tu local comercial en Caja Trujillo. Hasta S/ 500,000."
  },
  {
    "id": "empoderate-mujer",
    "slug": "empoderate-mujer",
    "icon": "Star",
    "badge": "Mujer empresaria",
    "badgeVariant": "red",
    "name": "Empodérate Mujer",
    "shortDesc": "Crédito especial con asesoría empresarial incluida para mujeres que lideran su negocio.",
    "feature": "Asesoría empresarial incluida",
    "cta": "Más información",
    "ctaHref": "/para-tu-negocio/empoderate-mujer",
    "featured": false,
    "metaTitle": "Empodérate Mujer — Crédito para mujeres empresarias | Caja Trujillo",
    "metaDesc": "Programa de crédito y asesoría para mujeres empresarias en Caja Trujillo."
  },
  {
    "id": "mas-negocios",
    "slug": "mas-negocios",
    "icon": "BarChart2",
    "badge": "MYPE",
    "badgeVariant": "yellow",
    "name": "+Negocios",
    "shortDesc": "Línea de crédito revolvente para empresas con necesidades permanentes de financiamiento.",
    "feature": "Línea revolvente flexible",
    "cta": "Calcular línea",
    "ctaHref": "/para-tu-negocio/",
    "featured": false,
    "metaTitle": "+Negocios — Línea revolvente MYPE | Caja Trujillo",
    "metaDesc": "Línea de crédito revolvente para MYPE en Caja Trujillo. Financiamiento continuo y flexible."
  }
]
```

### src/data/news.json

```json
[
  {
    "id": 1,
    "slug": "caja-trujillo-500-mil-clientes",
    "category": "Institucional",
    "categoryIcon": "Building2",
    "date": "2026-05-20",
    "dateFormatted": "20 de mayo, 2026",
    "title": "Caja Trujillo alcanza los 500,000 clientes activos y reafirma su liderazgo en el norte del Perú",
    "excerpt": "La entidad microfinanciera celebra un hito histórico consolidándose como la principal caja municipal del norte del país con presencia en 20 regiones.",
    "featured": true
  },
  {
    "id": 2,
    "slug": "nueva-app-caja-trujillo-2026",
    "category": "Digital",
    "categoryIcon": "Smartphone",
    "date": "2026-05-15",
    "dateFormatted": "15 de mayo, 2026",
    "title": "Nueva versión de la App Caja Trujillo disponible en iOS y Android con biometría mejorada",
    "excerpt": "La actualización incluye autenticación biométrica avanzada y el nuevo módulo de pago de servicios integrado.",
    "featured": false
  },
  {
    "id": 3,
    "slug": "credito-agricola-sierra-norte-2026",
    "category": "Agro",
    "categoryIcon": "Sprout",
    "date": "2026-05-10",
    "dateFormatted": "10 de mayo, 2026",
    "title": "Campaña especial de crédito agrícola para la sierra norte con tasas preferenciales",
    "excerpt": "El programa incluye tasas preferenciales y cronogramas de pago adaptados a los ciclos de cosecha de la región norte.",
    "featured": false
  }
]
```

### src/data/quick-access.json

```json
[
  {
    "icon": "CreditCard",
    "label": "Pagar cuota",
    "href": "/canales-digitales/homebanking"
  },
  { "icon": "Calculator", "label": "Simular crédito", "href": "/simuladores" },
  {
    "icon": "UserPlus",
    "label": "Abrir cuenta",
    "href": "/para-ti/cuenta-simple"
  },
  {
    "icon": "ArrowRight",
    "label": "Transferir",
    "href": "/canales-digitales/homebanking"
  },
  { "icon": "DollarSign", "label": "Tipo de cambio", "href": "/simuladores" },
  { "icon": "Landmark", "label": "Cajeros ATM", "href": "/canales-digitales/" },
  { "icon": "MapPin", "label": "Agencias", "href": "/institucional/" },
  { "icon": "Phone", "label": "Contáctanos", "href": "/institucional/" }
]
```

---

## PASO 5 — COMPONENTES UI BASE

### Button.astro

Props: variant (primary|secondary|outline|ghost|dark), size (sm|md|lg|xl),
href (convierte en tag a), iconRight (nombre Lucide), fullWidth (bool).

Estilos base: display inline-flex, align-items center, gap 6px,
font-family var(--font-body), font-weight 600, cursor pointer, border none,
text-decoration none, transition all 0.2s ease, white-space nowrap,
border-radius var(--r-sm).

Variantes:
primary: bg red-500, color white, box-shadow var(--shadow-red).
hover: bg red-600, shadow-red-lg, translateY(-1px).
secondary: bg yellow-500, color gray-900, shadow-yellow.
hover: bg yellow-400, translateY(-1px).
outline: bg transparent, color red-500, border 1.5px solid red-200.
hover: bg red-50, border-color red-400.
ghost: bg rgba(255,255,255,0.12), border 1px solid rgba(255,255,255,0.22),
color white. hover: bg rgba(255,255,255,0.20).
dark: bg gray-900, color white. hover: bg gray-800, translateY(-1px).

Tamaños:
sm: padding 7px 14px, font-size 12.5px.
md: padding 10px 20px, font-size 13.5px. (default)
lg: padding 13px 28px, font-size 15px, border-radius var(--r-md).
xl: padding 15px 32px, font-size 16px, border-radius var(--r-lg).

### Badge.astro

Props: variant (eyebrow|tag-yellow|tag-red|category), text.

eyebrow: uppercase, 11px, font-weight 700, letter-spacing 0.08em,
color red-500, bg red-50, border 1px solid red-200, border-radius 20px,
padding 4px 12px.

tag-yellow: 10.5px, 700, uppercase, color #926900, bg yellow-100,
border yellow-200, border-radius 4px, padding 2px 8px.

tag-red: igual pero color red-600, bg red-50, border red-200.

category: bg red-500, color white, 10.5px, uppercase, padding 3px 10px,
border-radius 4px. Usar en thumbnails de noticias.

### SectionHeader.astro

Props: eyebrow, title, subtitle, align (left|center), accentWord.
La palabra accentWord se envuelve en span con color red-500.
Renderiza: Badge eyebrow + h2 (font-head 800, clamp 1.6rem 3vw 2.2rem,
gray-900, letter-spacing -0.04em, line-height 1.2) + p subtitle
(15.5px, gray-600, max-width 520px). Si align center: text-align center,
margin auto en subtitle.

### Card.astro

Props: product (objeto JSON), featured (bool, default false).

Estructura: icono Lucide en div 46px x 46px border-radius 12px bg gray-100.
Badge según badgeVariant. Nombre font-head 700 15.5px gray-900.
Descripción 12.5px gray-600 line-height 1.55. Feature con
div 17px border-radius 50% bg red-100 + icono Check 9px rojo.
Link row con texto y icono ArrowRight.

Card base: bg white, border 1.5px solid gray-200, border-radius var(--r-lg),
padding 22px, display block, text-decoration none.
Pseudo ::after: content, posición top 0 left 0 right 0, height 3px,
bg linear-gradient(90deg, red-500, yellow-500), scaleX 0,
transform-origin left, transition transform 0.3s.
hover: border-color red-200, shadow-md, translateY(-3px).
hover ::after: scaleX(1).
hover icono contenedor: bg red-100, icono stroke red-500.
hover link: icono ArrowRight mueve 4px hacia la derecha.

Card featured: bg red-500, border red-400. Todos los textos blancos.
Badge: bg rgba(255,194,0,0.22), color yellow-400, border rgba amarillo.
Icono contenedor: bg rgba(255,255,255,0.18). No tiene ::after.

---

## PASO 6 — LAYOUTS

### BaseLayout.astro

Props: title, description, ogImage (default /og-default.png).
Estructura HTML completa con lang="es".
Head: charset, viewport, title, meta description, OG tags, canonical,
preconnect a Google Fonts, link fuentes con display=swap, importar tokens.css
y global.css. Body: skip-to-main link, slot para contenido,
script de animations.css (Intersection Observer global).

### PageLayout.astro

Extiende BaseLayout. Incluye TopBar + Navbar + slot para contenido + Footer.
El slot se envuelve en tag main con id="main-content" (objetivo del skip link).

---

## PASO 7 — COMPONENTES DE LAYOUT

### TopBar.astro

Fondo gray-950, font Inter 12px, padding 7px 0.
Flex row justify-between align-center, flex-wrap gap 8px.

Lado izquierdo (gap 20px):
Texto "Trujillo, Perú · 20 regiones" (gray-400).
Link "Consulta tu número de cuenta" (gray-400, hover white).
Link "Central de atención" (gray-400, hover white).
Badge SBS: flex gap 5px, bg rgba(255,194,0,0.12), border 1px solid
rgba(255,194,0,0.28), color yellow-400, font-size 11px, font-weight 600,
padding 3px 10px, border-radius 4px. Icono ShieldCheck Lucide 11px.

Lado derecho (gap 12px):
Link "ES · QCH" (gray-400, hover white).
Link/botón Homebanking: bg red-500, color white, padding 4px 14px,
border-radius 6px, font-weight 600, font-size 12px. Hover: bg red-400.
Icono LayoutGrid Lucide a la izquierda, 13px.

Display none en pantallas menores a 768px.

### Navbar.astro

Position sticky, top 0, z-index 100.
Fondo rgba(255,255,255,0.97) + backdrop-filter blur(16px).
Border-bottom 1px gray-200. Box-shadow shadow-xs. Altura 68px.
Clase scrolled (añadida via JS al scroll > 20px): shadow-md.

Logo (margin-right 40px, flex gap 11px, text-decoration none):
Mark: div 42px x 42px, bg red-500, border-radius 11px, shadow-red.
SVG interno: 4 cuadrados blancos en grid 2x2 (icono de grid).
Texto: "Caja Trujillo" font-head 700 15px gray-900 + salto de línea +
"Microfinanzas del Perú" 10px gray-500 uppercase letter-spacing 0.07em.

Nav (flex 1):
Lista horizontal, gap 2px, list-style none.
5 ítems: Para ti, Para tu negocio, Canales digitales, Institucional, Simuladores.
Estilo de link: padding 8px 14px, font-size 13.5px, font-weight 500,
color gray-600, border-radius var(--r-sm), transition var(--transition).
Hover y active: color red-500, bg red-50.
Los primeros 3 ítems tienen position relative y mega-menú.
Icono ChevronDown Lucide 13px en esos 3, rotate 180deg en hover.

Mega-menú (aparece en hover del li padre):
Position absolute, top calc(100% + 8px), left 50%, translateX(-50%).
Min-width 560px, bg white, border-radius var(--r-xl), shadow-lg,
border 1px gray-200, padding 20px.
Opacity 0 pointer-events none por defecto.
hover del li padre: opacity 1 pointer-events all translateY(0).
Transición opacity 0.18s y translateY(-6px a 0).

Encabezado de mega-menú: texto 10.5px red-500 font-weight 700
uppercase letter-spacing 0.09em, border-bottom 1px gray-200 pb 8px,
grid-column 1/-1, margin-bottom 4px.

Grid 3 columnas de mega-items.
Mega-item: flex gap 10px, padding 10px 12px, border-radius var(--r-md),
text-decoration none, transition var(--transition).
hover: bg red-50.
Icono: div 34px, bg gray-100, border-radius 8px, icono Lucide 17px gray-600.
hover icono: bg red-100, icono stroke red-500.
Texto: nombre 13px 600 gray-900 + desc 11px gray-500 line-height 1.4.

Mega-menú "Para ti" — título: "Créditos y ahorros para ti"
Ítems: Credijoya (Gem) | Crece Mujer (Heart) | Cuenta Simple (CreditCard)
| Hipotecaja+ (Home) | Plazo Fijo (TrendingUp) | Seguros (Shield)

Mega-menú "Para tu negocio" — título: "Financiamiento para emprendedores"
Ítems: Microemprendedor (Briefcase) | Mi Local Comercial (Store)
| Agrícola Emprendedor (Sprout) | Facilito (Zap)
| +Negocios (BarChart2) | Empodérate Mujer (Star)

Mega-menú "Canales digitales" — título: "Opera desde donde estés"
Ítems: App Caja Trujillo (Smartphone) | Homebanking Personas (Monitor)
| Homebanking Empresas (Building2) | Cajeros ATM (Landmark)
| Agentes Corresponsales (Users) | YAPE (Zap)

Nav actions (margin-left auto, gap 10px):
Button outline sm "Abrir cuenta".
Button primary sm "Solicitar crédito" + icono ArrowRight.

Botón hamburguesa: display none en desktop, flex en mobile.
3 spans de 24px x 2px bg gray-700, gap 5px.
Click: llama a función toggleMenu() que añade clase open al MobileMenu.

Script inline en el navbar:
window.addEventListener scroll para añadir/quitar clase scrolled.

### MobileMenu.astro

Position fixed, inset 0, bg white, z-index 200.
Display none por defecto. Clase open: display flex.
Flex-direction column, padding 80px 24px 32px, overflow-y auto.

Botón cerrar: position absolute top 16px right 16px. 38px x 38px.
Bg gray-100, border-radius 50%. Icono X Lucide 18px gray-700.

Lista de links: Para ti, Para tu negocio, Canales digitales, Institucional,
Simuladores. Cada link: flex justify-between padding 13px 16px,
border-radius var(--r-md), font-size 15px 600 gray-600, border 1.5px
transparent. Hover: bg red-50, color red-500, border red-200.
Icono ChevronRight Lucide 15px opacity 0.5.

Divisor horizontal: 1px gray-200, margen 6px 0.

Botones apilados (flex column gap 8px, margin-top 12px):
"Homebanking" variant dark justify-center.
"Solicitar crédito" variant primary justify-center.
"Abrir cuenta gratis" variant outline justify-center.

Script: función toggleMenu() toggle clase open, body overflow hidden/auto.
Cerrar con tecla Escape.

### Footer.astro

Fondo gray-950, color rgba(255,255,255,0.55), padding 64px 0 32px.

Grid 4 columnas (2fr 1fr 1fr 1fr), gap 48px, margin-bottom 48px.

Col 1 — Brand:
Logo: mark 38px bg red-500 border-radius 10px + SVG grid 2x2 blanco.
"Caja Trujillo" font-head 700 14.5px white. "Microfinanzas del Perú" 10px.
Párrafo: "Caja Municipal de Ahorro y Crédito de Trujillo S.A. —
Impulsando emprendedores y familias peruanas desde 1982." 12.5px 1.7.
Iconos sociales (flex gap 8px):
5 botones: 34px x 34px, bg rgba(255,255,255,0.07), border
rgba(255,255,255,0.10), border-radius 8px.
Iconos Lucide: Facebook, Instagram, Linkedin, Youtube, Music2.
Hover: bg red-500, border-color red-500. Icono stroke white.

Col 2, 3, 4 — Columnas de links:
h4: uppercase 12px white font-weight 700, margin-bottom 16px.
ul: list-style none, flex column, gap 9px.
Links: 12.5px rgba(255,255,255,0.48), hover color yellow-400.

Col 2 "Para ti": Cuenta Simple | Credijoya | Crece Mujer | Plazo Fijo
| Hipotecaja+ | Mi Vivienda+ | Seguros.
Col 3 "Para tu negocio": Microemprendedor | Agrícola Emprendedor
| Facilito | Mi Local Comercial | +Negocios | Empodérate Mujer.
Col 4 "Canales": App Caja Trujillo | Homebanking Personas
| Homebanking Empresas | Cajeros ATM | Agentes Corresponsales
| YAPE | Simuladores.

Divisor: hr border none, border-top 1px rgba(255,255,255,0.07), mb 22px.

Footer bottom (flex justify-between align-center gap 16px flex-wrap):
Izquierda: "© 2026 Caja Municipal de Ahorro y Crédito de Trujillo S.A."
font-size 11.5px.
Centro: links (Libro de reclamaciones | Privacidad | Términos |
Transparencia). 11.5px rgba blanco 38%, hover rgba blanco 75%.
Derecha: badge SBS — flex gap 7px, bg rgba(255,255,255,0.05),
border rgba(255,255,255,0.09), border-radius 7px, padding 6px 12px,
font-size 11px. Icono Building Lucide 14px yellow-400.
Texto "Supervisado por SBS".

Responsive footer: 2 cols en max 1024px, 1 col en max 768px.

---

## PASO 8 — REACT: CreditSimulator.tsx

```tsx
// Props interface:
interface Props {
  initialAmount?: number;
  maxAmount?: number;
  minAmount?: number;
  maxMonths?: number;
  tea?: number; // porcentaje, ej: 28.5
  productName?: string;
  ctaHref?: string;
}

// Estado: amount (number), months (number)
// Cálculo con useMemo (depende de amount y months):
//   const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;
//   const cuota = Math.round(amount * tem * Math.pow(1+tem, months)
//                  / (Math.pow(1+tem, months) - 1));
//   const totalPagar = cuota * months;
//   const totalInteres = totalPagar - amount;

// UI del simulador (tarjeta glass para usar sobre fondo oscuro):
//   Fondo: rgba(255,255,255,0.06), backdropFilter blur(20px)
//   Border: 1px rgba(255,255,255,0.12), borderRadius 28px, padding 28px
//   Animación: animation float 6s ease-in-out infinite
//
//   Header: texto "Simulador de crédito" uppercase 11px yellow-400
//   Label: "¿Cuánto necesitas?" — 11.5px rgba blanco 50%
//   Monto grande: font-head 800 38px white letra apretada
//   Range slider: track rgba blanco 15%, thumb red-500 con sombra roja,
//     20px x 20px border-radius 50%
//   Select plazo: bg rgba blanco 10%, border rgba blanco 18%,
//     border-radius 6px, color white, padding 9px 12px
//   3 filas de resultado:
//     "Cuota mensual aprox." — valor en color #6EE7B7 (verde esmeralda)
//     "TEA referencial" — valor en white
//     "Sin garantías hasta S/ 10,000" — valor en white
//   Cada fila: flex justify-between, padding 9px 0,
//     border-bottom 1px rgba blanco 7%
//   Botón CTA: full width, bg red-500, color white, padding 12px,
//     border-radius var(--r-md), font-weight 600, hover bg red-400
```

---

## PASO 9 — REACT: ProductTabs.tsx

```tsx
// Props: tabs (array de {label, panelId}), children renderizados como slots
// Estado: activeTab (string)
// UI de los tabs:
//   Contenedor: bg white, border 1px gray-200, padding 5px,
//     border-radius 14px, width fit-content, shadow-xs
//   Tab activo: bg red-500, color white, border-radius 10px,
//     shadow 0 2px 8px rgba(255,9,1,0.25)
//   Tab inactivo: color gray-500, hover: bg red-50 color red-500
//   Padding tab: 9px 22px, font-size 13.5px, font-weight 600
// Los paneles se muestran/ocultan con display grid/none
```

---

## PASO 10 — PÁGINAS (crear en orden estricto)

=============================================================================
PÁGINA 1: Homepage — src/pages/index.astro
=============================================================================

Layout: PageLayout. Meta title y description completos para SEO.

SECCIÓN 1 — HERO
Componente: src/components/home/Hero.astro
Fondo: gray-950. Min-height 580px. Position relative, overflow hidden.
Capas decorativas (position absolute, pointer-events none):
Grid pattern: background-image con linear-gradient de líneas
rgba(255,255,255,0.025) en 44px x 44px.
Glow rojo: radial-gradient 800px rgba(255,9,1,0.14), top -200px left -200px.
Glow amarillo: radial-gradient 500px rgba(255,194,0,0.07), bottom -200px right -100px.

Container (z-index 2, position relative):
Grid 2 columnas (1fr 400px), gap 48px, padding 80px 0.

COLUMNA IZQUIERDA:
Eyebrow row: span 6px blink amarillo + texto "Más de 40 años
impulsando el Perú" yellow-400 uppercase 12px font-weight 600.
H1 font-head 800 blanco clamp(2rem,4vw,3.1rem) letter-spacing -0.04em.
La palabra "impulsan" tiene: color yellow-400, text-decoration underline,
text-decoration-color yellow-500, text-underline-offset 6px,
text-decoration-thickness 3px.
Párrafo: 16px rgba(255,255,255,0.62) max-width 480px line-height 1.7.
Botones: Button primary lg "Solicitar crédito ahora" + icono ArrowRight.
Button ghost lg "Ver todos los productos".
Stats row (4 ítems, flex gap 36px, padding-top 32px,
border-top 1px rgba(255,255,255,0.08)):
42+ años | 500K clientes | 20 regiones | AA+ calificación.
Número: font-head 800 26px white letter-spacing -0.04em line-height 1.
Superíndice/símbolo: yellow-500.
Label: 11.5px rgba(255,255,255,0.45) font-weight 500.
Slider dots (3 botones):
Activo: width 22px, height 7px, border-radius 4px, bg red-500.
Inactivo: width 7px, height 7px, border-radius 50%, bg rgba blanco 25%.
Auto-rota cada 4s con JavaScript simple. Click cambia activo.

COLUMNA DERECHA — Tarjeta simulador (React island):
Usar componente CreditSimulator con client:load.
Props: initialAmount=5000, maxAmount=50000, minAmount=500,
maxMonths=36, tea=28.5, productName="Crédito personal",
ctaHref="/simuladores".
Display none en mobile (< 768px).

SECCIÓN 2 — AVISO / NOTICE BANNER
Componente: src/components/shared/NoticeBanner.astro
Fondo yellow-50. Border-bottom 1px yellow-200. Padding 14px 0.
Flex row, gap 14px, align-items center, flex-wrap.
Icono Bell Lucide en div 36px bg yellow-500 border-radius var(--r-sm).
Icono stroke gray-900.
Textos: "Consulta tu nuevo número de cuenta de ahorro y crédito"
bold 13.5px yellow-700 + "Actualización del sistema — verifica en
línea sin ir a agencia" 12.5px yellow-600 opacity 0.8.
Botón secondary sm "Consultar ahora" con ArrowRight. Margin-left auto.

SECCIÓN 3 — ACCESOS RÁPIDOS
Componente: src/components/home/QuickAccess.astro
Fondo white. Padding 30px 0. Border-bottom 1px gray-200.
Label "Accesos rápidos" — 11px uppercase font-weight 700 gray-400
letter-spacing 0.09em. Margin-bottom 14px.
Grid 8 columnas desktop, 4 columnas mobile. Gap 8px.
Datos desde quick-access.json (importar con Astro.glob o import directo).
Cada ítem (tag a, text-decoration none):
Flex column, align-items center, gap 7px, padding 14px 6px,
border-radius var(--r-md), border 1.5px solid transparent.
Hover: bg red-50, border-color red-200, translateY(-2px), shadow-sm.
Icono Lucide dinámico según campo "icon" del JSON en div 44px x 44px
bg gray-100 border-radius 11px. Icono 20px stroke gray-600.
Hover icono: bg red-500, stroke white.
Label: 11px font-weight 600 gray-600 text-align center line-height 1.3.
Hover label: color red-500.

SECCIÓN 4 — PRODUCTOS
Fondo gray-50. Padding 72px 0.
SectionHeader align left: eyebrow "Nuestros productos",
title "Lo que necesitas, cuando lo necesitas".
Junto al header (mismo row): Button outline "Ver todos los productos".
Margin-bottom 28px entre header y tabs.
ProductTabs React (client:idle) con 3 paneles:
"Para personas": grid 3 cols, datos products-personas.json.
"Para negocios": grid 3 cols, datos products-negocios.json.
"Seguros": mostrar los 3 seguros como cards simples.
En cada panel el primer ítem con featured=true usa Card variante featured.

SECCIÓN 5 — TRUST STRIP
Componente: src/components/home/TrustStrip.astro
Fondo gray-950. Padding 52px 0.
Grid 4 columnas. Separadores: border-right 1px rgba(255,255,255,0.07).
Último ítem sin border-right.
4 indicadores con clase fade-up (Intersection Observer):
42+ años / 500K clientes / 20 regiones / AA+ calificación SBS.
Número: font-head 800 clamp(2rem,3vw,2.6rem) white letter-spacing -0.05em.
Sufijo/símbolo "+" o "K": color yellow-500. "+" de AA+: color red-500.
Label: 12.5px rgba(255,255,255,0.42) max-width 140px margin auto.
Mobile: 2x2 grid, border-right en ítems impares, border-bottom en primeras 2.

SECCIÓN 6 — CANALES DIGITALES
Componente: src/components/home/DigitalChannels.astro
Fondo white. Padding 72px 0.
SectionHeader align left: eyebrow "Banca digital",
title "Opera desde donde estés",
subtitle "Gestiona tus finanzas en cualquier momento con la seguridad que mereces."
Grid 2 columnas, gap 14px, min-height 300px por card.

CARD APP (fondo gray-950, border-radius var(--r-2xl), padding 36px):
Capas decorativas: grid pattern rgba blanco 3% en 28px x 28px +
círculo 320px rgba blanco 4% bottom-right.
Tag: div pill "App Móvil" — icono Smartphone Lucide + texto.
Bg rgba(255,194,0,0.14), border rgba(255,194,0,0.28), color yellow-400.
Título: font-head 800 clamp(1.4rem,2.5vw,1.75rem) white letter-spacing -0.03em.
Descripción: 13.5px rgba blanco 58%.
4 features (flex column gap 8px):
Cada feature: flex gap 8px, 13px rgba(255,255,255,0.72) font-weight 500.
Check: div 18px border-radius 50% bg rgba(255,194,0,0.20).
Icono Check Lucide 9px stroke yellow-400.
Textos: "Saldos y movimientos en tiempo real" | "Transferencias
interbancarias al instante" | "Pago de servicios y recargas" |
"Biometría y doble factor de seguridad".
Botones de descarga (flex row gap 8px):
Cada botón: bg rgba blanco 10%, border rgba blanco 18%,
border-radius 9px, padding 7px 14px, color white, font-size 12px
font-weight 600. Hover: bg rgba blanco 18%, translateY(-1px).
"App Store" con SVG de Apple + "Google Play" con SVG de Play Store.

CARD HOMEBANKING (fondo red-500, misma estructura decorativa):
Tag: "Homebanking" icono Monitor. Bg rgba blanco 16%, border rgba blanco 28%.
Título: "Banca en línea para ti y tu empresa".
4 features con check en círculo rgba blanco 18%, icono check blanco:
"Homebanking para personas naturales" | "Plataforma empresarial y
pago de planillas" | "E-commerce y pagos online seguros" |
"Historial completo de operaciones".
3 botones glass: "Personas" | "Empresas" | "Planillas".

SECCIÓN 7 — SEGMENTOS
Componente: src/components/home/SegmentCards.astro
Fondo gray-50. Padding 72px 0.
SectionHeader: eyebrow "Contigo siempre",
title "Soluciones para cada historia de vida".
Grid 3 columnas, gap 14px.

3 Segment Cards (tag a con href):
Card 1 — Emprendedores → /para-tu-negocio/
Banner 185px: gradiente linear-gradient(140deg,#1a0005,#4a0010,#800018).
Card 2 — Mujer emprendedora → /para-tu-negocio/empoderate-mujer
Banner 185px: gradiente linear-gradient(140deg,#2d0045,#5c0080,#8b1a6b).
Card 3 — Sector agrícola → /para-tu-negocio/agricola-emprendedor
Banner 185px: gradiente linear-gradient(140deg,#0a1f00,#1c4400,#2e6600).

    Cada card: bg white, border 1.5px gray-200, border-radius var(--r-2xl),
    overflow hidden, text-decoration none. Hover: border red-200, shadow-md,
    translateY(-4px).
    Banner: position relative, display flex, align-items flex-end, padding 18px.
      Patrón de puntitos: background-image radial-gradient de puntos
      rgba blanco 6% en 22px x 22px (position absolute inset 0).
      Pill de categoría (position relative z-index 1): bg rgba blanco 10%,
      border rgba blanco 20%, color rgba blanco 75%, padding 3px 10px,
      border-radius 4px, font-size 11px uppercase letter-spacing 0.08em.
    Body (padding 18px 22px 22px):
      Nombre: font-head 800 17px gray-900 letter-spacing -0.03em line-height 1.25.
      Descripción: 12.5px gray-600 line-height 1.6 margin-bottom 14px.
      Link row: flex gap 5px, 12.5px font-weight 700 red-500.
      Icono ArrowRight 13px, mueve 4px en hover del card.

SECCIÓN 8 — NOTICIAS
Fondo white. Padding 72px 0.
SectionHeader align left: eyebrow "Noticias", title "Mantente informado".
Botón outline "Ver todas las noticias" en el mismo row del header.
Grid 3 columnas (2fr 1fr 1fr), gap 14px.
Renderizar news.json: primer ítem (featured) en columna de mayor ancho.
Cada news card: bg white, border 1.5px gray-200, border-radius var(--r-lg),
overflow hidden. Hover: border red-200, shadow-md, translateY(-3px).
Thumbnail 190px (230px en featured): bg gray-100, centrado vertical/horizontal.
Icono div 64px border-radius 50% bg gray-200, icono Lucide del campo
categoryIcon del JSON, 28px stroke gray-400.
Badge category: posición absolute bottom 10px left 10px.
Body: padding 16px 18px 18px.
Fecha: 11.5px gray-400. Título: font-head 700 14.5px (17px en featured)
gray-900 letter-spacing -0.02em. Excerpt: 12.5px gray-600.

SECCIÓN 9 — CTA BAND
Componente: src/components/shared/CTABand.astro
Fondo red-500. Padding 64px 0. Position relative overflow hidden.
Círculo decorativo 700px rgba(0,0,0,0.08) top-right (position absolute).
Grid 2 columnas (1fr auto), gap 40px, align-items center.
Izquierda (position relative z-index 1):
Eyebrow: "Da el primer paso hoy" — rgba(255,255,255,0.65) uppercase 11px.
Título: font-head 800 clamp(1.7rem,3vw,2.5rem) white letter-spacing -0.04em.
La palabra "crecer" en em: color yellow-400, bg rgba(255,194,0,0.15),
padding 0 6px, border-radius 4px.
Subtítulo: "Únete a los 500,000 peruanos que ya impulsan sus sueños." 15px
rgba blanco 70%.
Derecha (flex column gap 10px, align-items flex-end, z-index 1):
Button secondary xl "Solicitar crédito ahora" + icono ArrowRight.
Button ghost lg "Hablar con un asesor".
Button ghost sm "Abrir cuenta gratuita" opacity 0.7.
Mobile: grid 1 columna, botones en flex-direction row flex-wrap.

=============================================================================
PÁGINA 2: Para ti Hub — src/pages/para-ti/index.astro
=============================================================================
Layout: PageLayout. Title: "Para ti — Créditos y ahorros personales | Caja Trujillo".

SECCIÓN 1 — PAGE HERO (gray-950, min-height 280px)
BreadCrumb: Inicio > Para ti.
Badge eyebrow "Para personas". H1 blanco: "Productos diseñados para ti y tu familia".
Subtítulo rgba blanco 62%.
2 botones: primary "Solicitar crédito" + ghost "Ver simuladores".

SECCIÓN 2 — FILTROS DE CATEGORÍA
Fondo white. Padding 24px 0. Border-bottom gray-200.
Tabs pill: Todos | Créditos | Ahorros | Seguros.
Estilo igual al ProductTabs pero renderizado como Astro puro
con data-filter en cada card.

SECCIÓN 3 — GRID DE PRODUCTOS (gray-50, padding 72px 0)
Grid 3 columnas (2 en 1024px, 1 en 768px).
Todos los productos de products-personas.json con Card.astro.
Primer producto (featured:true) usa Card variante featured.

SECCIÓN 4 — COMPARADOR RÁPIDO (white, padding 72px 0)
SectionHeader center: eyebrow "Elige el tuyo", title "¿No sabes cuál elegir?".
Tabla responsive: columnas Credijoya | Crece Mujer | Cuenta Simple.
Filas: Monto máximo | Plazo | Garantía requerida | Tiempo de aprobación | TEA referencial.
Celdas con CheckCircle Lucide rojo para features disponibles,
Minus Lucide gray-300 para no disponibles.
Última fila: botones de solicitud para cada producto.
Tabla: border-radius var(--r-xl), overflow hidden, border gray-200.
Headers: bg gray-950 color white font-head 700.
Filas alternas: bg gray-50 / bg white.
Scroll horizontal en mobile.

SECCIÓN 5 — CTA BAND (componente CTABand.astro)

=============================================================================
PÁGINA 3: Credijoya — src/pages/para-ti/credijoya.astro
=============================================================================
Importar datos del producto desde products-personas.json filtrando por slug.

SECCIÓN 1 — PRODUCT HERO (gray-950 con glow rojo, min-height 400px)
BreadCrumb: Inicio > Para ti > Credijoya.
Grid 2 columnas (1fr 380px), gap 48px, padding 80px 0.
Columna izquierda:
Badge tag yellow "Destacado".
H1 blanco font-head 800: "Liquidez inmediata con el respaldo de tus joyas".
Descripción rgba blanco 65% 16px.
Stats inline (flex gap 24px, padding 16px 0, border-top/bottom rgba blanco 8%):
"Desde S/ 200" | "Hasta 12 meses" | "Aprobación mismo día".
Cada stat: número font-head 700 18px white + label 12px rgba blanco 50%.
Botones: primary lg "Solicitar Credijoya" + ghost lg "Ver requisitos".
Columna derecha: CreditSimulator client:load con props del producto.

SECCIÓN 2 — BENEFICIOS (white, padding 72px 0)
SectionHeader: eyebrow "Ventajas", title "¿Por qué elegir Credijoya?".
Grid 2x2, gap 24px.
Datos desde benefits[] del JSON del producto.
Cada benefit card: icono Lucide en div 52px bg red-50 border red-100
border-radius 14px. Título font-head 700 16px gray-900 + desc 14px gray-600.
hover card: shadow-sm, border red-200 (border 1px gray-200 base).

SECCIÓN 3 — CÓMO FUNCIONA (gray-50, padding 72px 0)
SectionHeader center: eyebrow "Proceso", title "En 3 pasos simples".
Flex row (column en mobile), gap 0.
Datos desde steps[] del JSON del producto.
Cada step: flex column align-items center text-align center, flex 1.
Badge numérico: círculo 32px bg red-500 color white font-head 700 14px.
Margin-bottom 16px.
Icono Lucide en círculo 64px bg red-50 border 2px red-100.
border-radius 50%. Icono 28px stroke red-500.
Título font-head 700 16px gray-900 mt-12px.
Descripción 13.5px gray-600 max-width 200px.
Entre steps: línea horizontal punteada (border-top 2px dashed red-200)
align-self center, flex 1, margin 0 -16px. Oculta en mobile.

SECCIÓN 4 — REQUISITOS (white, padding 72px 0)
SectionHeader izquierdo: eyebrow "Requisitos", title "¿Qué necesitas?".
Grid 2 columnas, gap 48px.
Columna izquierda: lista de requirements del JSON.
Cada ítem: flex gap 10px align-items center. Icono CheckCircle Lucide
20px red-500. Texto 14.5px gray-700 font-weight 500.
Columna derecha: card "¿Tienes dudas? Contáctanos".
Bg red-50, border 1px red-200, border-radius var(--r-xl), padding 28px.
Título font-head 700 16px red-600 mb 16px.
3 opciones de contacto (flex column gap 12px):
Cada opción: flex gap 10px, icono Lucide 18px red-500,
texto 14px gray-700 font-weight 500.
Phone: "Llámanos: 0800-41-888 (gratuito)".
MapPin: "Visita tu agencia más cercana".
MessageCircle: "Chat en línea".

SECCIÓN 5 — PRODUCTOS RELACIONADOS (gray-50, padding 48px 0)
Título "También te puede interesar" font-head 700 20px gray-900.
Grid 3 columnas de los otros 3 primeros productos (excluyendo Credijoya).
Cards variante normal.

SECCIÓN 6 — CTA BAND

=============================================================================
PÁGINA 4: Crece Mujer — src/pages/para-ti/crece-mujer.astro
=============================================================================
Estructura idéntica a Credijoya pero con datos de crece-mujer del JSON.
Hero title: "El crédito que impulsa a la mujer que hace empresa".
Color del glow hero: rgba(139,26,107,0.15) (tono púrpura en vez de rojo).

=============================================================================
PÁGINA 5: Para tu negocio Hub — src/pages/para-tu-negocio/index.astro
=============================================================================
Layout: PageLayout.

SECCIÓN 1 — PAGE HERO (gray-950 con glow rojo sutil)
BreadCrumb. Badge "Para emprendedores".
H1 blanco: "Financiamiento para cada tipo de negocio".
Subtítulo. 2 botones: primary "Solicitar crédito" + ghost "Ver simuladores".

SECCIÓN 2 — SEGMENTOS DE NEGOCIO (white, padding 72px 0)
SectionHeader center: "¿Cuál describe mejor tu negocio?"
Grid 3 columnas:
Card Microempresa (gradiente rojo oscuro) → /para-tu-negocio/microemprendedor.
Card Sector Agro (gradiente verde oscuro) → /para-tu-negocio/agricola-emprendedor.
Card Mujer empresaria (gradiente borgoña) → /para-tu-negocio/empoderate-mujer.
Misma estructura que los segment cards del homepage.

SECCIÓN 3 — GRID DE PRODUCTOS (gray-50, padding 72px 0)
Todos los productos de products-negocios.json con Card.astro.
Primer producto (featured:true) usa Card variante featured.

SECCIÓN 4 — CTA BAND

=============================================================================
PÁGINA 6: Microemprendedor — src/pages/para-tu-negocio/microemprendedor.astro
=============================================================================
Estructura idéntica a Credijoya con datos del JSON de negocios.
Hero title: "Capital de trabajo para el negocio que nunca para".
Stats inline: "Desde S/ 500" | "Hasta 48 meses" | "Respuesta en 24h".

=============================================================================
PÁGINA 7: Canales Digitales Hub — src/pages/canales-digitales/index.astro
=============================================================================

SECCIÓN 1 — HERO (gray-950, min-height 260px)
H1 blanco: "Todo Caja Trujillo en la palma de tu mano".
Subtítulo. Botones: primary "Descargar App" + ghost "Ir a Homebanking".

SECCIÓN 2 — APP MÓVIL (white, padding 80px 0)
Grid 2 columnas (texto + mockup), gap 64px.
Izquierda: badge "App Móvil" (pill rojo). Título font-head 800 gray-900.
Descripción. Lista 4 features: CheckCircle rojo + texto.
Botones descarga: App Store + Google Play (estilo dark con iconos SVG).
Derecha: placeholder mockup teléfono — div 280px x 560px, bg gray-100,
border-radius 24px, border 8px solid gray-200, shadow-lg. Centrado
texto "[Vista previa App]" gray-400.

SECCIÓN 3 — HOMEBANKING (gray-50, padding 80px 0)
Grid 2 columnas invertido (mockup + texto), gap 64px.
Izquierda: placeholder browser — div 480px x 300px, bg white,
border-radius 12px, shadow-md. Barra superior bg gray-100 padding 12px,
3 círculos 10px (gray-300 / gray-300 / gray-300), texto URL en barra.
Derecha: badge "Homebanking". Título. Descripción.
2 secciones: "Para personas" y "Para empresas" con sus features.
2 botones: primary "Ingresar Personas" + dark "Ingresar Empresas".

SECCIÓN 4 — CAJEROS Y AGENTES (gray-50, padding 72px 0)
SectionHeader center.
Grid 2 columnas, gap 16px.
Card cajeros ATM: icono Landmark Lucide en círculo 64px red-50.
Card agentes: icono Users Lucide.
Cada card: bg white, border gray-200, border-radius var(--r-xl), padding 32px.
hover: border red-200, shadow-md.

SECCIÓN 5 — YAPE (padding 48px 0)
Banner full-width: bg linear-gradient 135deg #5B2D8E → #8B4FBF.
Border-radius var(--r-xl) en desktop. Text-align center.
Título blanco font-head 800. Desc rgba blanco 75%.
Botón ghost "Cómo vincular YAPE".

SECCIÓN 6 — CTA BAND

=============================================================================
PÁGINA 8: Simuladores — src/pages/simuladores.astro
=============================================================================

SECCIÓN 1 — HERO compacto (gray-950, 220px)
H1 blanco: "Simuladores financieros".
Subtítulo: "Calcula tu cuota antes de solicitar. Sin compromiso."

SECCIÓN 2 — SIMULADORES (white, padding 72px 0)
Componente React SimuladorPage client:load con 3 tabs:
"Crédito personal" | "Crédito negocio" | "Plazo fijo".

Tabs 1 y 2 — Simulador de crédito:
Grid 2 columnas desktop (formulario | resultado), 1 col mobile.
Formulario (padding 32px, border 1px gray-200, border-radius r-xl):
Slider de monto con etiqueta dinámica grande.
Select de plazo: 6, 12, 18, 24, 36, 48 meses.
Select tipo: Personal | Con garantía | Negocio.
Resultado (bg gray-950, padding 32px, border-radius r-xl):
Label "Cuota mensual estimada" gray-400 uppercase 11px.
Número cuota: font-head 800 48px white letter-spacing -0.05em.
Grid 2x2 de métricas: TEA | TEM | Total a pagar | Interés total.
Cada métrica: label 11px gray-500 + valor 16px font-head 700 white.
Disclaimer: 11px gray-600 italic margin-top 12px.
Botón primary full-width "Solicitar este crédito" + ArrowRight.
Tabla de amortización (acordeón, se expande con botón):
"Ver tabla de amortización" con icono ChevronDown que rota.
Columnas: Cuota N° | Capital | Interés | Cuota mensual | Saldo restante.
Máx 12 filas visibles. Filas alternas bg gray-50.

Tab 3 — Simulador Plazo Fijo:
Inputs: monto a depositar, plazo (30/60/90/180/360 días), moneda (PEN/USD).
Resultado: intereses generados, monto final, TEA aplicada.

SECCIÓN 3 — TASAS VIGENTES (gray-50, padding 72px 0)
SectionHeader: eyebrow "Transparencia", title "Tasas vigentes".
Grid 2 columnas, gap 24px.
Tabla créditos: Producto | TEA mín | TEA máx | TCEA.
Tabla ahorros: Producto | TEA anual | Plazo mínimo.
Ambas tablas: header bg gray-950 text white, filas alternas, border gray-200.
Nota al pie: "Tasas referenciales. Consulta en agencia para tu caso específico."
Badge "Regulado por SBS" con icono ShieldCheck yellow.

=============================================================================
PÁGINA 9: Noticias Hub — src/pages/noticias/index.astro
=============================================================================

SECCIÓN 1 — HERO compacto (gray-950, 220px)
H1: "Sala de prensa". Subtítulo.

SECCIÓN 2 — FILTROS (white, padding 24px 0, border-bottom)
Tabs: Todas | Institucional | Digital | Agro | Productos.

SECCIÓN 3 — GRID NOTICIAS (gray-50, padding 72px 0)
Grid 3 columnas. Todos los ítems de news.json.
Misma estructura de card que el homepage pero sin la asimetría.
Botón "Cargar más noticias" — outline, centrado, margin-top 40px.

=============================================================================
PÁGINA 10: Detalle noticia — src/pages/noticias/[slug].astro
=============================================================================

getStaticPaths() generando rutas desde news.json con Astro.glob.

SECCIÓN 1 — HERO (gray-950, 200px)
BreadCrumb: Inicio > Noticias > [título truncado].
Badge category + fecha. H1 blanco.

SECCIÓN 2 — CONTENIDO (padding 72px 0)
Grid 2 columnas (artículo 2fr | sidebar 1fr), gap 32px.
Artículo: bg white, padding 40px, border-radius var(--r-xl), shadow-sm.
Thumbnail grande 100% ancho, 400px alto, bg gray-100,
icono centrado grande. Border-radius var(--r-lg).
Contenido: párrafos de texto de ejemplo bien maquetados.
Sidebar:
Card "Más noticias" bg white border gray-200 border-radius r-xl padding 24px.
2 noticias recientes (mini cards sin imagen, solo badge + título + fecha).
Card "¿Te interesa?" bg red-50 border red-100 border-radius r-xl padding 24px.
Título. Badge producto relacionado. Botón primary sm.

=============================================================================
PÁGINA 11: Institucional — src/pages/institucional/index.astro
=============================================================================

SECCIÓN 1 — HERO (gray-950 con glow amarillo sutil)
H1: "Más de 40 años impulsando el norte del Perú".

SECCIÓN 2 — MISIÓN Y VISIÓN (white, padding 72px 0)
Grid 2 columnas, gap 24px.
Card Misión: border-left 4px solid red-500, bg gray-50, padding 32px, r-xl.
Icono Target Lucide 24px red-500. Título font-head 700. Texto.
Card Visión: border-left 4px solid yellow-500, bg gray-50, padding 32px, r-xl.
Icono Eye Lucide 24px yellow-600.

SECCIÓN 3 — INDICADORES (gray-50, padding 72px 0)
Grid 3 columnas (2 filas), 6 indicadores.
Cada card: bg white, border gray-200, r-xl, padding 28px, text-align center.
Número font-head 800 clamp(2rem,3vw,2.6rem) red-500.
Label 13px gray-600.
hover: shadow-sm, border red-200.

SECCIÓN 4 — GOBIERNO CORPORATIVO (white, padding 72px 0)
SectionHeader: eyebrow "Transparencia", title "Gobierno corporativo".
Grid 2 columnas: Directorio | Gerencia. Título de cada grupo.
Cards de personas: avatar círculo 56px bg gray-200 (icono User Lucide),
nombre font-head 600 gray-900, cargo 13px gray-600.
Grid de personas: 3 columnas de avatares por grupo.

SECCIÓN 5 — REGULACIÓN (gray-50, padding 72px 0)
Grid 4 columnas, gap 16px.
4 cards: SBS (Shield) | FENACREP (Users) | Calificadoras (Star)
| Memoria anual (FileText).
Cada card: bg white, border gray-200, r-lg, padding 24px, text-align center.
Icono Lucide en círculo 52px bg yellow-50 border yellow-100.
Icono 22px stroke yellow-600.
Título font-head 700 14px. Desc 12.5px gray-600.
Botón outline sm "Ver documento" margin-top 12px.

=============================================================================
PÁGINA 12: 404 — src/pages/404.astro
=============================================================================
Layout: BaseLayout. Fondo gray-950. Min-height 100vh.
Flex column, align-items center, justify-content center. Text-align center.

"404" gigante: position relative, font-head 900 180px letter-spacing -0.06em.
Capa trasera: color red-500 opacity 0.12, position absolute, z-index 0.
Capa frontal: color red-500, position relative, z-index 1.
Animación: animation float 6s ease-in-out infinite.

Título: "Esta página no existe" font-head 800 28px white margin-top -20px.
Descripción: rgba blanco 55% margin-bottom 32px.
Flex row gap 12px justify-center:
Button primary "Ir al inicio" href="/" + icono Home.
Button ghost "Ver productos" href="/para-ti/".

---

## PASO 11 — ACCESIBILIDAD (OBLIGATORIO en todos los archivos)

Siguiendo las recomendaciones de Modern Web Guidance:

- Todas las imágenes: alt descriptivo, width y height explícitos.
- Íconos decorativos: aria-hidden="true" en todos los SVG decorativos.
- Botones sin texto visible: aria-label obligatorio.
- Contraste mínimo: 4.5:1 texto normal, 3:1 texto grande (WCAG AA).
- Focus ring en todos los interactivos: outline 2px solid red-500,
  outline-offset 2px. Usar :focus-visible, no :focus.
- Navegación teclado mega-menú: Escape cierra, Tab navega entre ítems.
- Skip-to-main al inicio del body (visible solo en focus).
- lang="es" en html.
- Roles ARIA: nav, dialog, tablist, tabpanel, tab con aria-selected.
- Listas de navegación: role="list" en ul del nav.
- Botones hamburguesa/cerrar: aria-label, aria-expanded, aria-controls.

---

## PASO 12 — RENDIMIENTO (OBLIGATORIO en todos los archivos)

Siguiendo Modern Web Guidance:

- Imágenes: usar componente Image de Astro (usa Sharp).
  loading="lazy" en todas excepto el hero. width y height explícitos.
- Fuentes: preconnect + font-display:swap. Preload de fuentes críticas.
- React islands: client:load solo en simuladores del hero.
  client:idle en ProductTabs. client:visible en el resto.
- Animaciones: solo CSS nativo + Intersection Observer. Sin GSAP.
- CSS: no cargar estilos no usados. Tailwind purge automático.
- Open Graph tags en cada página.
- Sitemap generado automáticamente con @astrojs/sitemap.
- Objetivo Lighthouse: Performance > 90, Accessibility > 95,
  Best Practices > 95, SEO > 95.

---

## PASO 13 — RESPONSIVO MOBILE-FIRST (OBLIGATORIO)

Breakpoints:
sm: 480px | md: 768px | lg: 1024px | xl: 1200px

Reglas por componente:

- TopBar: display none en < 768px.
- Navbar: < 768px ocultar nav y nav-actions, mostrar hamburguesa.
- Hero grid: < 768px columna única, ocultar tarjeta simulador derecha.
- QuickAccess: 8 cols desktop → 4 cols mobile.
- Productos grid: 3 cols desktop, 2 cols en 1024px, 1 col en 768px.
- Trust strip: 4 cols desktop, 2x2 en 768px.
- Digital grid: 2 cols desktop, 1 col en 768px.
- Segmentos: 3 cols desktop, 1 col en 768px.
- Noticias: 3 cols desktop, 2 cols en 1024px, 1 col en 768px.
- Footer: 4 cols desktop, 2 cols en 1024px, 1 col en 768px.
- Botones táctiles: mínimo 44px x 44px (WCAG 2.5.5).
- Texto inputs y selects: mínimo 16px en mobile (evita zoom en iOS).
- Container padding: 24px desktop, 16px mobile.
- Mega-menús: en mobile se reemplazan por el MobileMenu (drawer).
- Simulador sidebar: oculto en < 768px, accesible en /simuladores.

---

## REGLAS FINALES DEL AGENTE

1. Crear archivos EN EL ORDEN indicado: tokens → datos → UI → layouts → páginas.
2. NUNCA usar emojis. Solo iconos de lucide-react importados individualmente:
   import { IconName } from 'lucide-react' en archivos .tsx
   import { IconName } from 'lucide-react' + client:load si necesario en .astro
3. Colores: usar ESTRICTAMENTE el Design System. Rojo #FF0901 = primario.
   Amarillo #FFC200 = acento. Grises oscuros para fondos dark.
   PROHIBIDO el azul en cualquier elemento de UI.
4. Cada página consume datos reales del JSON correspondiente.
5. Simuladores calculan en tiempo real con React (useMemo).
6. Textos en español peruano. Moneda: "S/" (sol peruano).
7. Código COMPLETO en cada archivo. Sin truncar, sin "// continuación aquí".
8. Al terminar cada página, listar: rutas creadas, imports usados,
   datos del JSON consumidos, componentes incluidos.
9. Aplicar Modern Web Guidance en cada componente: rendimiento,
   accesibilidad, APIs modernas, CSS moderno.
