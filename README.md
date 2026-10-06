# YEFFITNES TRAINING — Propuesta comercial interactiva

© 2026 Cristhian Gomez. Todos los derechos reservados. Documento confidencial.

Propuesta de plataforma digital para coaching fitness: un solo archivo `index.html` autocontenido.

- Vista local: abrir `index.html` en el navegador.
- Vercel: Framework "Other" o Vite, Build `npm run build`, Output `dist`.
- Landing anterior: rama `landing-original`.

## Identidad visual

- **Marca:** YEFFITNES TRAINING. Símbolo: emblema **YF** (oro con contorno negro) en `brand/emblema-yf.png`.
- **Logos** (emblema + nombre, texto a trazos): `brand/logo-yeffitnes-training-oscuro.svg` y `brand/logo-yeffitnes-training-claro.svg`.
- **Página de identidad:** `brand/identidad-visual.html`.

| Rol | Token | Valor |
|---|---|---|
| Acento principal | `--neon` | `#F7254B` rojo neón |
| Acento secundario / degradados | `--rose` | `#F2406B` rosa carmín |
| Acento en capa clara | `--accent` | `#D41A40` rojo vivo |
| Datos y gráficas | `--garnet` | `#9C1535` granate |
| Oro (logro, detalles) | `--pearl` / `--gold-deep` | `#CDB170` / `#8D6526` |

Neutros (`--ink`, `--surface`, `--text`, líneas) y colores de estado (verde, ámbar, `--danger`) sin cambios.
El emblema se incrusta como WebP optimizado (360 px) una vez por documento y se reutiliza con `<use href="#yfe">`.
