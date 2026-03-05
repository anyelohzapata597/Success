# Success - Construye tu éxito diario 🚀

> *Construye la disciplina que el talento no puede darte. Con Success, diseñas rutinas que se mantienen, sigues tu progreso con precisión y alcanzas tus objetivos sin agotarte. Menos excusas, más victorias.*

## 📊 Estado Actual

- **Fase**: 2/3 (React + Componentes)
- **Subfase 2.1**: React/Vite/TS setup ✅ Completada
- **Subfase 2.2**: Componentes React ✅ Completada (27 componentes)
- **Progreso Total**: Fase 1 (100%) + Fase 2.2 (100%) = ~55%
- **Última actualización**: Marzo 3, 2026

---

## 🗺️ **Por Dónde Empezar**

### 🆕 Si Es Tu Primera Vez Aquí
👉 **[INDEX.md](INDEX.md)** - Bienvenida con 3 opciones de acciones

### ⚡ Si Quieres Solo Lo Esencial  
👉 **[QUICK_STATUS.md](QUICK_STATUS.md)** - Estado, progreso, próximos pasos (2 min)

### 🏃 Si Quieres Probar el Código
```bash
npm install && npm run dev
```
Luego abre [http://localhost:5174/login](http://localhost:5174/login)

### 📖 Si Quieres Detalles Técnicos
👉 **[PROGRESS.md](PROGRESS.md)** - Resumen sesión anterior, arquitectura, componentes

### 🧰 Si Quieres Setup/Troubleshooting
👉 **[SETUP.md](SETUP.md)** - Guía técnica, rutas, testing, debugging

### 📋 Si Es Hora de Subfase 2.3
👉 **[SUBFASE_2_3_CHECKLIST.md](SUBFASE_2_3_CHECKLIST.md)** - Plan completo, tareas, testing

---

## 🎯 Visión

Success es una aplicación web de hábitos diseñada para personas que desean mejorar como profesionales y como seres humanos. Nuestro enfoque es crear hábitos **interactivos, divertidos y motivadores** que aceleren el camino hacia el éxito empresarial y profesional.

Con un sistema de gamificación basado en puntos, frases motivacionales dinámicas y fragmentos inspiradores de grandes libros, Success transforma el desarrollo de hábitos en una experiencia adictiva donde la disciplina se construye naturalmente.

👉 **[Ver alcance completo](docs/alcance_del_proyecto.md)**

---

## 💡 Características Clave (MVP)

✅ **7 Categorías de Hábitos**: Salud, Productividad, Aprendizaje, Fitness, Finanzas, Concentración y más  
✅ **Sistema de Gamificación**: Puntos + frases motivacionales dinámicas  
✅ **Fragmentos de Libros**: Inspiración diaria de autores exitosos  
✅ **Notificaciones Configurables**: Hora y medio a tu elección (navegador/email)  
✅ **Funcionalidad Social**: Competencia amigable con amigos  
✅ **Análisis de Progreso**: Gráficos semanales y puntuación total  
✅ **Autenticación Flexible**: Email/contraseña + OAuth  

---

## 🏗️ Decisiones Clave

| Decisión | Razón | Documento |
|----------|-------|-----------|
| **Zustand** para state | Simplicidad, performance, sin boilerplate | [ADR-001](docs/decisions.log) |
| **Firestore** como BD | Real-time, Firebase Auth integrado | [ADR-002](docs/decisions.log) |
| **Tailwind CSS** | Desarrollo rápido, componentes consistentes | [ADR-003](docs/decisions.log) |
| **Vite** bundler | Build 10x más rápido que CRA | [ADR-004](docs/decisions.log) |
| **OAuth + Email** | Máxima flexibilidad para usuarios | [ADR-005](docs/decisions.log) |

👉 **[Ver todas las decisiones](docs/decisions.log)**

---

## 📚 Documentación

La documentación es el corazón de este proyecto (DDD). Cada decisión, patrón y requerimiento está documentado:

- **[Alcance del Proyecto](docs/alcance_del_proyecto.md)** - Qué incluimos y por qué
- **[Sistema de Diseño](docs/sistema_de_diseño.md)** - Paleta, tipografía, componentes UI
- **[Tech Stack](docs/tech_stack.md)** - Tecnologías, versiones, justificaciones
- **[Arquitectura del Proyecto](docs/arquitectura_del_proyecto.md)** - Estructura de carpetas y patrones
- **[Base de Datos](docs/base_de_datos.md)** - Schema Firestore, colecciones, relaciones
- **[Fases del Proyecto](docs/fases_del_proyecto.md)** - Roadmap detallado por fase y subfase
- **[Guía de Desarrollo](docs/guia_de_desarrollo.md)** - Setup local, convenciones, deployment
- **[Decisiones Arquitectónicas](docs/decisions.log)** - ADRs documentados

---

## 💻 Stack Tecnológico

**Frontend**
- React 18+ con TypeScript 5+
- Vite como bundler
- React Router para navegación
- Zustand para state management
- Tailwind CSS para estilos

**Backend & BD**
- Firebase (Firestore, Authentication)
- Cloud Functions (si es necesario)

**Herramientas**
- Vitest para testing
- React Testing Library
- Chart.js para gráficos

**Deployment**
- Vercel (recomendado) o Firebase Hosting

👉 **[Detalles completos](docs/tech_stack.md)**

---

## 📂 Estructura del Proyecto

```
Success/
├── docs/                              # 📖 Documentación DDD
│   ├── alcance_del_proyecto.md
│   ├── sistema_de_diseño.md
│   ├── tech_stack.md
│   ├── arquitectura_del_proyecto.md
│   ├── base_de_datos.md
│   ├── fases_del_proyecto.md
│   ├── guia_de_desarrollo.md
│   └── decisions.log
├── src/                               # 💻 Código fuente (inicia Fase 2)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/                            # 📁 Assets estáticos
├── README.md                          # 👈 Estás aquí
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

👉 **[Ver arquitectura detallada](docs/arquitectura_del_proyecto.md)**

---

## 🚀 Fases del Proyecto

### ✍️ **Fase 1: HTML/CSS + Documentación** (✅ Completada)
- Completar documentación técnica y de diseño ✅
- Maquetación HTML/CSS de todas las páginas ✅
- Wireframes y prototipos visuales ✅
- **Duración**: 2 semanas | **Progreso**: 100%

### 🛠️ **Fase 2: React + TypeScript** (Por iniciar)
- Setup del proyecto con Vite
- Convertir HTML/CSS a componentes React
- Implementar state management con Zustand
- Lógica de gamificación y cálculo de puntos
- **Duración**: 3 semanas

### 🔥 **Fase 3: Firebase + BD** (Futuro)
- Integración Firebase (Auth + Firestore)
- CRUD de hábitos, usuarios, amigos
- Notificaciones en tiempo real
- Testing e integración completa
- **Duración**: 2-3 semanas

👉 **[Roadmap detallado por subfase](docs/fases_del_proyecto.md)**

---

## 🎨 Sistema de Diseño

Success tiene un diseño creativo y llamativo diseñado para generar **máximo engagement**:

**Paleta Principal**
- Verde Éxito: `#10B981` - Crecimiento, logros
- Azul Confianza: `#0EA5E9` - Profesionalidad, seguridad
- Amarillo Motivación: `#FCD34D` - Energía, positividad
- Grises Neutros: Para estructura y jerarquía

**Principios de UX**
- Interactividad alta para mantener engagement
- Animaciones suaves que motiven
- Feedback inmediato en acciones
- Visual minimalista pero impactante

👉 **[Guía de diseño completa](docs/sistema_de_diseño.md)**

---

## 🔧 Cómo Empezar

### Requisitos
- Node.js 18+
- npm o yarn
- Git

### Setup Local

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/tu-usuario/Success.git
   cd Success
   ```

2. **Instalar dependencias** (Fase 2+)
   ```bash
   npm install
   ```

3. **Variables de entorno** (Fase 3+)
   ```bash
   cp .env.example .env.local
   # Completar con tus credenciales Firebase
   ```

4. **Ejecutar en desarrollo** (Fase 2+)
   ```bash
   npm run dev
   ```

👉 **[Guía completa de desarrollo](docs/guia_de_desarrollo.md)**

---

## 📋 Regla de Actualización del README

Este README se actualiza después de cada decisión importante:
- ✅ Cambios en stack tecnológico
- ✅ Nuevas features en el alcance
- ✅ Cambios de arquitectura
- ✅ Progreso de fases

**Nota**: La documentación detallada vive en la carpeta `docs/`. Este README es solo un índice y resumen.

---

## 👥 Equipo

- **Visión**: Crear la app de hábitos más motivadora y exitosa del mercado
- **Metodología**: Document-Driven Development (DDD)
- **Enfoque**: Calidad de código, documentación clara, features que enamoren

---

## 📞 Contacto & Contribuciones

Este es un proyecto en desarrollo activo. Cualquier cambio o decisión debe documentarse en `docs/`.

---

**Última actualización**: Marzo 3, 2026  
**Estado**: Fase 1 completada (100% ✅)  
**Siguiente hito**: Iniciar Fase 2 - Setup React + TypeScript + Vite
