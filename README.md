# Coach — Landing y portal de entrenador personal

Landing premium (React + Vite + Tailwind 4) con vista previa del portal de clientes, agenda, planes, videos y FAQ.

## Correr en local

```bash
npm install      # .npmrc ya incluye legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build    # genera /dist
```

## Personalizar

Los datos del coach, planes, horarios y testimonios están en `src/data/defaultConfig.ts`
(el botón "Personalizar" de la página permite editar marca y WhatsApp en vivo).
Todo el contenido actual es de ejemplo y debe reemplazarse por datos reales antes de publicar.

## Desplegar en Vercel

Importar el repositorio. Framework: Vite. Build: `npm run build`. Output: `dist`.
