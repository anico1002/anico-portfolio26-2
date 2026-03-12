# INIT — Estado del proyecto (anico portfolio)

Documento único para que cualquier IA entienda el proyecto sin leer el resto del código. **Leer solo este archivo.**

---

## 1. Qué es el proyecto

- **Portfolio web** de **anico**, Senior Designer.
- **Idioma:** solo inglés (locale fijado a `"en"` en `context/AppContext.tsx`; no hay detección de idioma).
- **Título/marca:** "anico | Senior Designer" (metadata y títulos de proyecto).

---

## 2. Stack técnico

- **Next.js 16**, React 19, TypeScript.
- **Tailwind CSS 4** (PostCSS).
- **framer-motion** (parallax, scroll, animaciones).
- **lucide-react** (iconos).
- **Fuente:** Inter (Google Font) en toda la app.

---

## 3. Estructura de carpetas y archivos clave

```
app/
  layout.tsx          # Root layout, metadata, AppProvider, ViewportEffects
  page.tsx            # Home: Nav, Hero, Marquee, Work, About, Contact, Footer
  globals.css         # Tailwind, marquee, bounce-down
  proyecto/[slug]/page.tsx   # Página de detalle de proyecto

components/
  Nav.tsx             # Header fijo: logo SVG (anico_logo.svg) + Projects, About, Contact
  Hero.tsx            # Hero home: carousel de imágenes (heroImages prop), parallax, título en 2 líneas, flecha abajo con bounce
  Marquee.tsx         # Banda de texto infinito (disciplinas)
  Work.tsx            # Grid de proyectos (cards con thumbnail, nombre, categoría, año)
  About.tsx           # Foto (public/about.webp, object-right) + bio + disciplinas en labels/pills
  Contact.tsx         # Título + descripción + 2 iconos: Mail (mailto) y LinkedIn (enlace)
  Footer.tsx          # Copyright centrado; en proyecto muestra "Back to home"
  ProyectoDetail.tsx  # Detalle: ProjectHero, meta, overview, challenge/process, bloques de imágenes por sección, outcomes, stack, prev/next
  ProjectHero.tsx     # Hero de proyecto: imagen con parallax, título que baja al scroll
  ImageFadeSlideshow.tsx  # Carrusel por fade para grupos de imágenes
  ScrollReveal.tsx    # Reveal al scroll (framer-motion)
  ScrollProgress.tsx  # Barra de progreso de scroll (arriba)
  ViewportEffects.tsx # CustomCursor + ScrollProgress
  CustomCursor.tsx
  Skills.tsx          # Existe pero NO se usa en la home (eliminado del page)

lib/
  i18n.ts             # Traducciones en/en (solo en se usa); about, contact, hero, nav, work, project, skills, contact
  projects.ts         # Lista estática de proyectos (Project type) + getProjectBySlug
  scan-project.ts     # getScannedProject(slug), getEnrichedProjects(); mezcla projects + carpetas en public/projects/
  get-hero-images.ts  # getHeroImages(): lee public/hero-imgs y devuelve URLs para el hero home
  project-translations.ts  # getLocalizedProject(project, locale)
  parse-content.ts    # Parse de content.txt por proyecto

context/
  AppContext.tsx      # locale = "en" fijo (sin detección)

public/
  anico_logo.svg      # Logo de marca (usado en Nav y header de proyecto)
  about.webp         # Foto de la sección About (img nativo, object-right)
  hero-imgs/          # Imágenes del carousel del hero home (orden alfabético, loop infinito)
  projects/           # Una carpeta por proyecto: <slug>/ con opcional content.txt y subcarpetas 01_Titulo, 02_Titulo...
```

---

## 4. Datos y contenido

- **Proyectos:** Definidos en `lib/projects.ts` y enriquecidos con `lib/scan-project.ts`:
  - Si existe `public/projects/<slug>/`, se escanean imágenes y subcarpetas `NN_Nombre` (secciones).
  - Secciones generan títulos (ej. "Game UI", "Graphic Explorations", "Marketing Exploration").
  - Imágenes se agrupan por número (1a, 1b → slideshow; una sola → imagen).
  - **Ocultos en la lista:** `DISABLED_PROJECT_SLUGS = ["fundfy", "some-logos", "telepport"]` en scan-project.ts.

- **Hero home:** Imágenes desde `public/hero-imgs/` (getHeroImages()). Loop infinito entre todas. Sin rayitas ni nombre de proyecto; solo flecha abajo con animación bounce.

- **About:** Texto en `lib/i18n.ts` (about.bio, about.disciplines). Imagen local `public/about.webp` (etiqueta `<img>`, object-right). Disciplinas como pills/labels.

- **Contacto:** Email `hola@anico.es` (i18n + mailto). Solo iconos: Mail y LinkedIn (https://es.linkedin.com/in/anico). Sin Dribbble ni GitHub.

- **Footer:** Copyright "© 2026 anico. All rights reserved." (i18n). Centrado. Sin "Designed with".

---

## 5. Páginas y flujos

- **Home (/):** Nav → Hero (imágenes de hero-imgs, parallax, título "Crafting digital" / "Experiences") → Marquee → Work (grid proyectos) → About → Contact → Footer.

- **Proyecto (/proyecto/[slug]):** Header fijo (flecha back + logo + año). ProyectoDetail: hero con primera imagen (parallax + título que baja), meta (cliente, rol, año, etc.), overview, challenge/process, luego bloques de contenido por sección:
  - **Primera sección (ej. Game UI):** imágenes en columna, ancho max-w-6xl (como reto/proceso), una debajo de otra, sin gap.
  - **Sección de slideshows (ej. Graphic Explorations):** grid 2x2, mismo ancho, sin marco.
  - **Última sección (ej. Marketing):** imágenes en columna, sin gap; si son 2+ y la primera es "alta", primera con aspect 2/3 y object-contain, resto 16/9.
  - Títulos de sección alineados a la izquierda (mismo contenedor que reto/proceso). Luego outcomes (stats) y design stack si existen. Al final prev/next. Footer con "Back to home".

---

## 6. Convenciones de UI

- **Logo:** `public/anico_logo.svg`, tamaño ~0.7x (h-[22px] w-auto). En headers con texto blanco se usa `invert` para que se vea claro.
- **Cursor:** `cursor-none` en body; CustomCursor en ViewportEffects.
- **Barra de scroll:** ScrollProgress fija arriba, por encima del hero.
- **Contenedor de contenido:** `max-w-6xl mx-auto` con padding `px-6 md:px-12` (y en proyecto `lg:px-24` en la section) para alinear textos y bloques.
- **Imágenes locales de proyectos:** Rutas `/projects/<slug>/...`; en muchos sitios se usa `unoptimized` o `<img>` para evitar fallos de carga.

---

## 7. Estado actual resumido

| Área            | Estado |
|----------------|--------|
| Idioma         | Solo inglés (locale "en") |
| Hero home      | Imágenes en `public/hero-imgs/`, loop infinito, parallax, sin indicadores |
| About          | Foto `public/about.webp`, disciplinas en pills, sin stats ni "That's me" |
| Contact        | hola@anico.es, solo Mail + LinkedIn |
| Footer         | © 2026, centrado, sin tagline |
| Logo           | anico_logo.svg en Nav y header proyecto (0.7x) |
| Proyectos      | Enriquecidos desde `lib/projects.ts` + `public/projects/<slug>/`; 3 slugs deshabilitados |
| Página proyecto| Mismo ancho que reto/proceso (max-w-6xl), secciones por tipo (full / 2x2 / full sin gap) |

---

## 8. Cómo seguir trabajando

- **Añadir hero home:** Añadir imágenes en `public/hero-imgs/` (orden alfabético).
- **Cambiar textos:** `lib/i18n.ts` (claves en `en` y `es`; la app usa solo `en`).
- **Cambiar email/contacto:** `lib/i18n.ts` → contact.email; enlace LinkedIn en `components/Contact.tsx`.
- **Cambiar copyright:** `lib/i18n.ts` → contact.copyright.
- **Añadir/quitar proyectos:** `lib/projects.ts` y/o carpetas en `public/projects/`; deshabilitar en `DISABLED_PROJECT_SLUGS` en scan-project.ts.
- **Foto About:** Sustituir `public/about.webp` o cambiar la ruta en About.tsx.

---

*Última actualización: estado del portfolio anico (Next 16, React 19, Tailwind 4, solo inglés, hero-imgs, about.webp, anico_logo.svg, contacto hola@anico.es y LinkedIn, footer © 2026).*
