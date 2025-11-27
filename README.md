# Tech - Versión Astro 🚀

Ejemplo de integración de **Mercado Pago Checkout Pro** con Astro. Tienda online moderna de productos tecnológicos y servicios de TI, construida con **Astro** - un framework mucho más simple y rápido que Next.js.

Este proyecto demuestra cómo integrar el **Checkout Pro de Mercado Pago** en una aplicación Astro usando Vercel Serverless Functions.

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
- **Mercado Pago Checkout Pro** - Solución de pago completa de Mercado Pago
- **Vercel Serverless Functions** - Backend serverless para crear preferencias de pago

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

> 💡 **Obtén tu Access Token:** Ve a [Mercado Pago Developers](https://www.mercadopago.com/developers) y crea una aplicación para obtener tus credenciales de prueba o producción.

## 🚀 Despliegue en Vercel

### Opción 1: Desde la interfaz
1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Conecta tu repositorio de GitHub
3. Agrega la variable `MERCADOPAGO_ACCESS_TOKEN` en Project Settings > Environment Variables
4. Vercel detectará automáticamente Astro y desplegará el proyecto
5. ¡Listo!

### Opción 2: Con Vercel CLI
```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

### 📝 Integración con Mercado Pago Checkout Pro

Este proyecto implementa el **Checkout Pro** de Mercado Pago, que redirige a los usuarios a la página de pago de Mercado Pago para completar la transacción.

**Flujo de pago:**
1. El usuario agrega productos al carrito
2. Al hacer clic en "Pagar con Mercado Pago", se llama a `/api/create-preference`
3. La función serverless crea una preferencia de pago en Mercado Pago
4. El usuario es redirigido al Checkout Pro de Mercado Pago
5. Después del pago, Mercado Pago redirige a las páginas de resultado:
   - `/pago/success` - Pago aprobado
   - `/pago/failure` - Pago rechazado
   - `/pago/pending` - Pago pendiente

**API Route:**
- `/api/create-preference` - Crea la preferencia de pago usando el SDK de Mercado Pago

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
├── api/                   # Funciones serverless de Vercel
│   └── create-preference.js
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

## 📝 Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (localhost:4321) |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |

## 🌐 Hosting Alternativo

El build genera una carpeta `dist/` con archivos estáticos. Puedes subirla a:

- **Vercel** (recomendado - soporta las serverless functions automáticamente)
- **Netlify** (requiere adaptar las funciones a formato Netlify)
- **Cloudflare Pages** (con Cloudflare Workers para funciones)
- **GitHub Pages** (sin Mercado Pago - solo estático)
- Cualquier hosting que sirva archivos estáticos

---

**Nota:** Este es un ejemplo de integración con **Mercado Pago Checkout Pro**. Para que funcione correctamente, necesitas:
- Un hosting que soporte funciones serverless (como **Vercel**)
- Un Access Token de Mercado Pago (de prueba o producción)
- Configurar las variables de entorno en tu plataforma de hosting

Este proyecto está configurado para **Vercel**, donde las funciones en `api/` se exponen automáticamente como rutas.

📚 **Documentación de Mercado Pago:**
- [Checkout Pro](https://www.mercadopago.com/developers/es/docs/checkout-pro/landing)
- [SDK de Node.js](https://www.mercadopago.com/developers/es/docs/sdks-library/server-side/sdk-for-nodejs) - [GitHub](https://github.com/mercadopago/sdk-nodejs)

