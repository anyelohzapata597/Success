# 🚀 Guía de Setup - Success App

## Requisitos Previos

- Node.js 18+ 
- npm 9+
- Git (opcional, para clonar)

---

## ⚡ Quick Start

### 1. Instalar Dependencias
```bash
cd Success
npm install
```

### 2. Configurar Variables de Entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Firebase (opcional por ahora, se usarán datos mock):
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_PROJECT_ID=tu_project_id
# ... resto de variables
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

El servidor abrirá automáticamente en: **http://localhost:5173**

---

## 📂 Estructura de Carpetas

```
Success/
├── src/
│   ├── components/           # Componentes React (39 archivos)
│   │   ├── ui/              # Base components (12)
│   │   ├── forms/           # Forms (3)
│   │   ├── features/        # Domain components (7)
│   │   ├── layouts/         # Layouts (2)
│   │   └── common/          # Common (1)
│   ├── pages/               # Pages (7)
│   ├── store/               # Zustand stores (4)
│   ├── utils/               # Utilities (3)
│   ├── types/               # TypeScript types
│   ├── styles/              # Global CSS
│   ├── App.tsx              # Main app
│   └── main.tsx             # Entry point
├── public/                  # Static HTML/CSS (Subfase 1.2)
├── docs/                    # Documentation (10 files)
├── package.json             # Dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
└── index.html              # HTML entry point
```

---

## 🎯 Rutas Disponibles

```
/login              → LoginPage (form validado)
/register           → RegisterPage (form con validación)
/                   → DashboardPage (main hub)
/dashboard          → DashboardPage
/habits             → HabitsPage (crud con modal)
/friends            → FriendsPage (ranking)
/statistics         → StatisticsPage (charts)
/profile            → ProfilePage (settings)
```

---

## 📊 Páginas Implementadas

### 1️⃣ Login Page
- Form email/password
- Validación en tiempo real
- Remember me checkbox
- Links a register y forgot-password

### 2️⃣ Register Page
- Form nombre/email/password
- Indicador fortaleza contraseña (5 niveles)
- Términos y condiciones
- Validación completa

### 3️⃣ Dashboard
- Bienvenida personalizada
- Cita motivacional diaria (mock)
- Level progress bar
- 4 stat cards (nivel, racha, hábitos, amigos)
- Daily checklist interactivo
- Grid de hábitos (primeros 3)
- Sidebar: Rankings + stats semanales

### 4️⃣ Habits Page
- Grid responsive de hábitos
- Búsqueda en tiempo real
- Filtro por categoría (7 categorías)
- Modal para crear nuevo hábito
- HabitCards con:
  - Racha actual vs mejor
  - Progreso semanal
  - Status completado/pendiente
  - Acciones: editar, eliminar

### 5️⃣ Friends Page
- Grid de amigos (5 de ejemplo)
- Avatar con posición (🥇🥈🥉)
- Stats: nivel, puntos, racha, hábitos/semana
- Tabla ranking global
- Filas coloreadas (current user destacado)

### 6️⃣ Statistics Page
- Overview stats (4 cards)
- Chart semanal (7 barras)
- Categorías performance (6 progress bars)
- Monthly summary (3 cards)
- Datos realistas

### 7️⃣ Profile Page
- Avatar + información
- Edit mode (nombre, email, bio)
- Tabla de notificaciones (3 hábitos)
- Preferencias checkboxes (4)
- Seguridad (cambiar password, eliminar cuenta)

---

## 🧪 Testing Recomendado

### Formularios
```bash
1. /login
   - Intenta sin email → error "Email requerido"
   - Email mal formado → error "Email inválido"
   - Sin password → error "Contraseña requerida"
   - < 6 caracteres → error "Mínimo 6 caracteres"

2. /register
   - Passwords no coinciden → error
   - Fortaleza: 1-5 niveles visuales
   - Términos: debe ser checked
```

### Páginas
```bash
3. /dashboard
   - DailyChecklist: clickea ✓ para marcar completado
   - Progreso actualiza dinámicamente
   - Links a otras páginas en navbar

4. /habits
   - Busca "meditar" → filtra en tiempo real
   - Selecciona "fitness" → solo muestra de esa categoría
   - "+ Nuevo Hábito" abre modal
   - Click en hábito muestra detalles

5. /friends
   - Ranking global visible
   - Top amigos destacados
   - Current user (Juan Pérez) con fondo verde

6. /statistics
   - Chart semanal animado
   - Barras muestran %
   - Progress bars por categoría

7. /profile
   - "Editar Perfil" abre formularios
   - Tabla de notificaciones
   - Checkboxes de preferencias
```

### Responsive
```bash
- Resize a mobile (< 640px)
- Grids se colapsan a 1 columna
- Navbar burger menu funciona
- Cards se adaptan
```

---

## 📦 Scripts Disponibles

```bash
npm run dev              # Dev server (hot reload)
npm run build           # Build para producción
npm run preview         # Preview build localmente
npm run lint            # ESLint check
npm run type-check      # TypeScript check sin emit
npm run test            # Vitest (cuando se agreguen tests)
npm run test:ui         # Vitest con UI
npm run test:coverage   # Coverage report
```

---

## 🎨 Tecnologías Utilizadas

| Stack | Versión |
|-------|---------|
| React | 18.2.0 |
| TypeScript | 5.0.0 |
| Vite | 5.0.0 |
| React Router | 7.0.0 |
| Zustand | 4.4.0 (stores configurados, no integrados aún) |
| Tailwind CSS | 3.4.0 |
| react-hot-toast | 2.4.0 |
| Firebase | 10.0.0 (dependencia instalada, integración en Fase 3) |

---

## 🗂️ Datos Mock

Se utilizan datos coherentes en todas las páginas:

**Usuario**: Juan Pérez
- Level: 12
- Points: 4,250
- Streak: 22 días
- Hábitos completados: 157

**Hábitos de Ejemplo**: 6
- Meditar 30 min (concentración, 22 racha)
- Ejercicio cardio (fitness, 18 racha)
- Leer 30 min (aprendizaje, 15 racha)
- Beber 8 vasos agua (salud, 8 racha)
- Revisar emails (productividad, 5 racha)
- Presupuesto (finanzas, 3 racha)

**Amigos**: 5
- María García (Lvl 13, 4800 puntos)
- Carlos López (Lvl 12, 4600 puntos)
- Ana Martínez (Lvl 11, 4200 puntos)
- Luis Rodríguez (Lvl 10, 3800 puntos)

---

## 🔄 Próximo Paso: Subfase 2.3

### Cuando están listos para continuar:

**Subfase 2.3: Zustand State Management**
- Integrar authStore en LoginForm
- Integrar habitStore en HabitsPage
- Custom hooks: useHabits(), useAuth(), useUser()
- Mock API calls con toast notifications
- Persistencia con localStorage

**Subfase 2.4: Gamificación**
- Sistema de puntos
- Cálculo de niveles
- Animaciones de level up
- Motivational quotes API

**Fase 3: Firebase Integration**
- Setup Firebase project
- Real authentication
- Cloud Firestore CRUD
- Cloud Functions
- Notificaciones en tiempo real

---

## 📝 Notas Importantes

1. **Datos son 100% mock**: Las páginas funcionan con datos hardcoded
2. **Formularios validan**: Pero no hacen HTTP calls (Fase 3)
3. **Estado local**: Los stores existen pero no están conectados (Subfase 2.3)
4. **Responsive**: Testeado en desktop, tablet, mobile
5. **TypeScript Strict**: Todos los componentes tipados

---

## 🐛 Troubleshooting

### npm install falla
```bash
# Limpiar cache y reintentar
npm cache clean --force
rm -rf node_modules
npm install
```

### Puerto 5173 en uso
```bash
# Vite usará puerto alternativo automáticamente
# O especifica uno manual:
npm run dev -- --port 3000
```

### TypeScript errors
```bash
# Verificar que tsconfig.json está correcto
npm run type-check

# Ver errores específicos
tsc --noEmit
```

### Hot reload no funciona
```bash
# Reiniciar servidor
^C (ctrl+c en terminal)
npm run dev
```

---

## 📊 Checklist de Completitud (Subfase 2.2)

- ✅ 12 componentes UI base
- ✅ 3 formularios con validación
- ✅ 7 componentes de features
- ✅ 5 páginas completamente implementadas
- ✅ Estado local en componentes
- ✅ Responsive design (mobile-first)
- ✅ 27 componentes totales
- ✅ ~15,000 LOC de componentes
- ✅ Datos mock coherentes
- ✅ Rutas configuradas

---

**Generado**: Marzo 3, 2026  
**Estado**: Listo para probar

Ejecuta `npm install && npm run dev` para comenzar! 🚀
