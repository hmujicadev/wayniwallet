# WayniWallet

## Version Live 
- WayniWallet: [WayiniWallet](https://wayniwallet-five.vercel.app/)

Una aplicación de transferencias de dinero entre usuarios construida con React/Next.js, diseñada para simular funcionalidades bancarias modernas y fluidas.

## 🎯 Objetivo

Desarrollar una aplicación mobile-first que permita a los usuarios realizar transferencias entre contactos frecuentes, visualizar historial de transacciones y gestionar su perfil de forma intuitiva y segura.

## ✨ Características Principales

- 📱 **Home Screen**: Dashboard con balance, contactos frecuentes e historial de transacciones
- 💸 **Transfers Screen**: Listado completo de transferencias realizadas con filtros por fecha
- 👤 **Profile Screen**: Información detallada del usuario y datos de contacto
- 🎨 **Diseño Moderno**: Interfaz limpia y responsive basada en Figma
- 💾 **Persistencia**: Balance y datos almacenados en dispositivo
- ⚡ **Performance**: Optimizado con Turbopack y React Query
- 🔄 **Estado Global**: Gestión de estado con Zustand
- 🎭 **UI Components**: Componentes reutilizables con Radix UI

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Git

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/hmujicadev/wayniwallet.git
cd wayniwallet
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📜 Scripts Disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting con ESLint
npm run lint
```

## 🏗️ Arquitectura

WayniWallet sigue una arquitectura moderna y modular construida sobre Next.js 15 con React 19. La aplicación está diseñada siguiendo principios SOLID y arquitectura limpia para garantizar escalabilidad, mantenibilidad y reusabilidad del código.

### Estructura del Proyecto

```
wayniwallet/
├── app/                        # Rutas y layouts de Next.js
│   ├── layout.tsx              # Layout raíz con providers y fuentes
│   ├── globals.css             # Estilos globales y variables CSS
│   ├── page.tsx                # Home Screen - Dashboard principal
│   ├── transfers/
│   │   └── page.tsx            # Transfers Screen - Historial de transferencias
│   ├── profile/
│   │   └── page.tsx            # Profile Screen - Información del usuario
│   ├── send/
│   │   ├── page.tsx            # Send Screen - Nueva transferencia
│   │   └── success/
│   │       └── page.tsx        # Success Screen - Confirmación de transferencia
│   └── fonts.ts                # Configuración de fuentes personalizadas
│
├── components/                 # Componentes React reutilizables
│   ├── ui/                     # Componentes UI base (shadcn/ui + Radix)
│   │   ├── avatar.tsx          # Componente de avatar
│   │   ├── button.tsx          # Botones personalizados
│   │   ├── badge.tsx           # Badges informativos
│   │   ├── select.tsx          # Selectors
│   │   └── ... (16+ componentes)
│   │
│   ├── bottom-nav.tsx          # Barra de navegación inferior
│   ├── contact-avatar.tsx      # Avatar de contacto con click
│   ├── transaction-item.tsx    # Elemento individual de transacción
│   ├── transfer-item.tsx       # Elemento de transferencia
│   ├── transaction-icon.tsx    # Iconos de tipo de transacción
│   ├── transaction-skeleton.tsx # Skeleton de transacción
│   ├── contact-skeleton.tsx    # Skeleton de contacto
│   └── providers.tsx           # Providers de React Query y otros
│
├── hooks/                      # Custom React Hooks
│   ├── use-users.ts            # Hook para obtener usuarios (React Query)
│   ├── use-toast.ts            # Hook para notificaciones
│   └── use-mobile.ts           # Hook para detectar dispositivos móviles
│
├── lib/                        # Lógica compartida
│   ├── store.ts                # Zustand store para estado global
│   ├── api.ts                  # Funciones para llamadas a API
│   ├── mock-data.ts            # Generador de datos simulados
│   ├── utils.ts                # Utilidades (cn, etc)
│   └── types/
│       └── index.ts            # Tipos TypeScript compartidos
│
└── public/                     # Archivos estáticos
    ├── fonts/                  # Fuentes personalizadas
    └── icons/                  # Iconos SVG
```

### Capas de la Aplicación

#### 1️⃣ **Capa de Presentación (UI)**
- **Componentes UI**: Componentes base reutilizables de Radix UI
- **Page Components**: Componentes de páginas principales
- **Custom Components**: Componentes específicos del dominio (TransactionItem, ContactAvatar, etc)

#### 2️⃣ **Capa de Gestión de Estado**
- **Zustand Store**: Estado global persistente (usuario, balance, contactos, transacciones)
- **React Query**: Gestión de datos asincronos y caché
- **Custom Hooks**: Lógica reutilizable encapsulada

#### 3️⃣ **Capa de Datos**
- **API Client**: Funciones para llamadas a randomuser.me
- **Mock Data**: Generador de datos simulados para transacciones
- **Tipos TypeScript**: Interfaces compartidas

#### 4️⃣ **Capa de Utilidades**
- **Utils**: Funciones helper (cn para merge de clases)
- **Constants**: Configuraciones globales
- **Hooks Personalizados**: useToast, useUsers, useMobile

### Patrones de Diseño Implementados

**🎯 Separación de Responsabilidades**
- Componentes presentacionales separados de lógica de negocios
- Hooks custom para encapsular lógica compleja
- Tipos TypeScript para garantizar seguridad de tipos

**♻️ DRY (Don't Repeat Yourself)**
- Componentes reutilizables para transacciones, avatares, etc
- Hooks compartidos para acceso a datos
- Utils compartidas para funciones comunes

**📦 Composición**
- Componentes compuestos a partir de componentes base
- Providers para inyección de dependencias
- HOC para funcionalidades transversales

**🔄 Reactividad**
- React Query para sincronización de datos
- Zustand para estado reactivo y persistente
- Suspense Boundaries para carga progresiva

### Flujo de Datos

```
Usuario (Interacción)
    ↓
Page/Component (React)
    ↓
useToast() / useUsers() / Custom Hooks
    ↓
React Query (Caché) + Zustand (Estado)
    ↓
API (randomuser.me) / LocalStorage
    ↓
Datos → Renderizado → UI Actualizada
```

### Principios SOLID

| Principio | Aplicación |
|-----------|-----------|
| **S**ingle Responsibility | Cada componente y hook tiene una única responsabilidad |
| **O**pen/Closed | Componentes abiertos a extensión via props y composition |
| **L**iskov Substitution | Componentes UI intercambiables manteniendo la interfaz |
| **I**nterface Segregation | Interfaces específicas en types.ts, no genéricas |
| **D**ependency Inversion | Inyección de dependencias via Zustand y Providers |

## 🔧 Tecnologías Utilizadas

### Core

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [Next.js](https://nextjs.org/) | 15.5.5 | Framework React con SSR |
| [React](https://react.dev/) | 19.1.0 | Biblioteca UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipado estático |

### UI & Estilos

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utilidades CSS |
| [Radix UI - Avatar](https://www.radix-ui.com/docs/primitives/components/avatar) | 1.1.2 | Componente de avatar |
| [Radix UI - Label](https://www.radix-ui.com/docs/primitives/components/label) | latest | Etiquetas accesibles |
| [Radix UI - Select](https://www.radix-ui.com/docs/primitives/components/select) | 2.1.5 | Selector personalizado |
| [Radix UI - Toast](https://www.radix-ui.com/docs/primitives/components/toast) | 1.2.15 | Notificaciones emergentes |
| [Lucide React](https://lucide.dev/) | 0.546.0 | Iconografía |
| [class-variance-authority](https://cva.style/) | 0.7.1 | Gestión de variantes CSS |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Utilidad para clases CSS |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.3.1 | Merge de clases Tailwind |

### Estado & Datos

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [Zustand](https://github.com/pmndrs/zustand) | 5.0.8 | Gestión de estado global |
| [TanStack React Query](https://tanstack.com/query/latest) | 5.90.3 | Gestión de datos del servidor |

### Herramientas de Desarrollo

| Herramienta | Versión | Uso |
|-----------|---------|-----|
| [ESLint](https://eslint.org/) | 9.x | Linting de código |
| [@tailwindcss/postcss](https://tailwindcss.com/) | 4.x | Procesamiento de Tailwind |
| [Turbopack](https://turbo.build/pack) | Integrado | Bundler ultra-rápido |
| [SVGR](https://react-svgr.com/) | 8.1.0 | Importar SVG como componentes |

## 🌐 Fuentes de Datos

### API Utilizada

- **[Random User Generator API](https://randomuser.me/api/)**: Datos de usuarios y contactos frecuentes
  - Endpoint: `https://randomuser.me/api/`
  - Documentación: https://randomuser.me/

## 🎨 Diseño

El diseño fue proporcionado en Figma y puede ser consultado aquí:

**[Figma Design - WayniWallet](https://www.figma.com/design/ppzcbVZJLzYfEvw3Yokt9N/WayniWallet)**

## 💾 Almacenamiento

- **LocalStorage**: Persistencia de balance y datos del usuario
- **IndexedDB** (opcional): Para almacenamiento más robusto de transacciones

## 🚀 Optimizaciones

### Performance

- ✅ Turbopack para builds ultra-rápidos
- ✅ React Query para caché inteligente
- ✅ Skeletons en carga de usuarios
- ✅ Code splitting automático
- ✅ Image optimization con Next.js

### UX

- ✅ Animaciones suaves
- ✅ Toast notifications para feedback
- ✅ Estados de carga visuales
- ✅ Interfaz responsive mobile-first

## 📁 Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home Screen - Dashboard principal |
| `/transfers` | Transfers Screen - Historial de transferencias |
| `/profile` | Profile Screen - Perfil del usuario |
| `/send` | Send Screen - Nueva transferencia |

## 🔐 Seguridad

- Variables de entorno para configuración sensible
- Validación de tipos con TypeScript
- Componentes accesibles con Radix UI
- CSRF protection en formularios

## 📦 Dependencias Principales

### Producción

```json
{
  "@radix-ui/react-avatar": "1.1.2",
  "@radix-ui/react-label": "latest",
  "@radix-ui/react-select": "2.1.5",
  "@radix-ui/react-slot": "1.1.1",
  "@radix-ui/react-toast": "^1.2.15",
  "@tanstack/react-query": "^5.90.3",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.546.0",
  "next": "15.5.5",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "tailwind-merge": "^3.3.1",
  "zustand": "^5.0.8"
}
```

### Desarrollo

```json
{
  "@eslint/eslintrc": "^3",
  "@svgr/webpack": "^8.1.0",
  "@tailwindcss/postcss": "^4",
  "@tanstack/eslint-plugin-query": "^5.91.1",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.5.5",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

## 🎯 Funcionalidades Implementadas

### ✅ Home Screen
- [x] Nombre y avatar del usuario principal
- [x] Balance actual con persistencia
- [x] Contactos frecuentes (mínimo 10 usuarios)
- [x] Historial de transacciones recientes
- [x] Skeletons en carga de usuarios
- [x] Redirección a Send Again desde contactos

### ✅ Transfers Screen
- [x] Listado de transferencias realizadas
- [x] Avatar, nombre, fecha y monto
- [x] Filtros por fecha
- [x] Scroll infinito

### ✅ Profile Screen
- [x] Datos personales del usuario
- [x] Información de ubicación
- [x] Datos de contacto
- [x] ID único del usuario

## 🚀 Deployment

### Vercel (Recomendado)

1. Push el código a GitHub
2. Conectar repositorio en [Vercel](https://vercel.com)
3. Deploy automático en cada push

### Alternativas

- **Netlify**: Compatible con Next.js
- **Docker**: Para deployments personalizados

## 📝 Notas Importantes

- Los datos del usuario principal y contactos se obtienen de `randomuser.me`
- Se implementó arquitectura limpia con principios SOLID
- Código modular, reutilizable y bien estructurado
- Se valora la creatividad y features extras

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT

## 👨‍💻 Autor

**Hector Mujica**
- LinkedIn: [linkedin.com/in/hmujicadev](https://www.linkedin.com/in/hmujicadev/)
- GitHub: [github.com/hmujicadev](https://github.com/hmujicadev)
- Email: hmujicadev@gmail.com
- Página-Web: https://www.hmujicadev.com/


## 🔗 Enlaces Útiles

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación React](https://react.dev)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación Zustand](https://github.com/pmndrs/zustand)
- [Documentación React Query](https://tanstack.com/query/latest)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Random User API](https://randomuser.me/)

---

**Última actualización**: Octubre 2025 | Versión: 1.0.0