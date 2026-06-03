# Plan de Seguridad de CV — Opción 1

## Objetivo
Eliminar datos personales del CV público y reemplazar con sistema de "Disponible bajo solicitud" + LinkedIn como capa intermedia.

## Diagnóstico Actual

- **CV público**: `public/GerardoMartinez_CV.pdf` — accesible por cualquiera
- **Botón de descarga**: `src/pages/Home.svelte` línea 26 — link directo al PDF
- **Textos**: `src/locales/es.json` y `src/locales/en.json` — clave `home.cv`
- **Formulario de contacto**: Ya existe en `src/components/ContactForm.svelte` con backend Cloud Run (no expone email directo) ✅
- **LinkedIn en footer**: Ya existe en `src/components/Footer.svelte` ✅

## Cambios

### 1. Mover CV a ubicación segura
- Mover `public/GerardoMartinez_CV.pdf` a `~/dev/curriculum/` (o carpeta local no servida por vite)

### 2. Reemplazar botón de CV en Home.svelte
- Cambiar el `<a>` de descarga de PDF por un enlace a LinkedIn
- Nuevo texto: "Disponible bajo solicitud / Available on request"
- Mantener misma clase y estilo visual (o adaptar)

### 3. Actualizar locales
- **es.json**: `"cv": "Disponible bajo solicitud"`
- **en.json**: `"cv": "Available on request"`

### 4. Verificar global.css
- Las reglas `.cv-button` existen en global.css (líneas 287, 335) — no requieren cambio a menos que cambiemos la clase

### 5. Verificar build
- Correr `pnpm build` y confirmar que no hay errores
- Verificar que no queda ninguna referencia al PDF

## Orden de ejecución
1. Mover PDF
2. Actualizar locales
3. Actualizar Home.svelte
4. Verificar build
