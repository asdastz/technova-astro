# Tech - Versión Astro 🚀

Tienda online moderna de productos tecnológicos y servicios de TI, construida con **Astro** - un framework mucho más simple y rápido que Next.js.

## ✨ ¿Por qué Astro?

| Característica | Next.js (anterior) | Astro (actual) |
|----------------|-------------------|----------------|
| JS enviado al navegador | ~200KB+ | ~15KB (solo Alpine.js) |
| Tiempo de carga | Medio | Muy rápido |
| Build time | ~30s | ~5s |
| Complejidad | Alta | Baja |
| Despliegue | Vercel/Netlify | **Cualquier hosting** |

## 🛠️ Tecnologías

- **Astro 4** - Framework estático ultra-rápido
- **Tailwind CSS** - Estilos utility-first
- **Alpine.js** - Interactividad ligera (carrito, filtros)
- **Netlify Functions** - Backend serverless para Mercado Pago

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🔐 Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cp env.example .env
```

2. Agrega tu token de Mercado Pago:
```
MERCADOPAGO_ACCESS_TOKEN=TEST-tu-token-aqui
```

## 🚀 Despliegue en Netlify

### Opción 1: Desde la interfaz
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Arrastra la carpeta del proyecto o conecta tu repositorio
3. Agrega la variable `MERCADOPAGO_ACCESS_TOKEN` en Site Settings > Environment Variables
4. ¡Listo!

### Opción 2: Con Netlify CLI
```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod
```

## 📁 Estructura del Proyecto

```
COWFFE-astro/
├── src/
│   ├── components/        # Componentes Astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   └── ...
│   ├── data/              # Datos de productos/servicios
│   │   ├── products.ts
│   │   └── services.ts
│   ├── layouts/           # Layout principal
│   │   └── Layout.astro
│   ├── pages/             # Páginas (routing automático)
│   │   ├── index.astro
│   │   ├── productos.astro
│   │   ├── servicios.astro
│   │   ├── carrito.astro
│   │   └── pago/
│   │       ├── success.astro
│   │       ├── failure.astro
│   │       └── pending.astro
│   └── styles/
│       └── global.css
├── netlify/
│   └── functions/         # Funciones serverless
│       └── create-preference.js
├── public/                # Assets estáticos
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.mjs`:
```js
colors: {
  primary: {
    600: '#tu-color',
    // ...
  }
}
```

### Productos y Servicios
Edita los archivos en `src/data/`:
- `products.ts` - Productos de la tienda
- `services.ts` - Servicios ofrecidos

## 🔄 Diferencias con la versión Next.js

1. **Sin "use client"** - Todo es estático por defecto
2. **Sin Context API** - Usamos Alpine.js store para el carrito
3. **Sin framer-motion** - Animaciones CSS puras
4. **Sin react-icons** - SVGs inline
5. **Netlify Functions** - En lugar de API routes de Next.js

## 📝 Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (localhost:4321) |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |

## 🌐 Hosting Alternativo

El build genera una carpeta `dist/` con archivos estáticos. Puedes subirla a:

- **Netlify** (recomendado - soporta las functions)
- **Vercel**
- **Cloudflare Pages**
- **GitHub Pages** (sin Mercado Pago)
- Cualquier hosting que sirva archivos estáticos

---

**Nota:** Para Mercado Pago necesitas un hosting que soporte funciones serverless (Netlify, Vercel, etc.)

