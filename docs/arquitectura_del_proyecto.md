# Arquitectura del Proyecto - Success

## 📂 Estructura de Carpetas

```
src/
├── assets/                      # Imágenes, fuentes, archivos estáticos
│   ├── icons/
│   ├── images/
│   └── fonts/
├── components/                  # Componentes reutilizables
│   ├── common/                  # Botones, cards, modals globales
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── layouts/                 # Layouts (Header, Sidebar, Footer)
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── index.ts
│   ├── habits/                  # Componentes específicos de hábitos
│   │   ├── HabitCard.tsx
│   │   ├── HabitForm.tsx
│   │   ├── DailyHabitList.tsx
│   │   └── index.ts
│   ├── dashboard/               # Componentes del dashboard
│   │   ├── StatCard.tsx
│   │   ├── ProgressChart.tsx
│   │   └── index.ts
│   ├── social/                  # Componentes sociales
│   │   ├── FriendCard.tsx
│   │   ├── Leaderboard.tsx
│   │   └── index.ts
│   └── utils/                   # Componentes utilitarios
│       ├── Loading.tsx
│       ├── EmptyState.tsx
│       └── index.ts
├── pages/                       # Páginas/vistas (enrutadas)
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── dashboard/
│   │   ├── DashboardPage.tsx
│   │   ├── HabitsPage.tsx
│   │   ├── FriendsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── StatisticsPage.tsx
│   └── index.ts
├── hooks/                       # Custom React Hooks
│   ├── useAuth.ts               # Auth context/logic
│   ├── useHabits.ts             # Hábitos
│   ├── useUser.ts               # User profile
│   ├── useFriends.ts            # Friends logic
│   ├── useNotifications.ts       # Notificaciones
│   └── index.ts
├── store/                       # Zustand stores
│   ├── authStore.ts             # Auth state
│   ├── habitStore.ts            # Hábitos state
│   ├── userStore.ts             # User state
│   ├── uiStore.ts               # UI state (modals, etc)
│   └── index.ts
├── services/                    # Servicios/APIs
│   ├── firebase.ts              # Config Firebase
│   ├── authService.ts           # Auth operations
│   ├── habitService.ts          # Hábitos CRUD
│   ├── userService.ts           # User CRUD
│   ├── friendService.ts         # Friends operations
│   ├── notificationService.ts   # Notificaciones
│   ├── fragmentService.ts       # Fragmentos de libros
│   └── index.ts
├── types/                       # Tipos TypeScript
│   ├── index.ts
│   ├── auth.ts                  # User, Auth types
│   ├── habit.ts                 # Habit, DailyLog types
│   ├── social.ts                # Friend, Leaderboard types
│   └── api.ts                   # Request/Response types
├── utils/                       # Funciones utilitarias
│   ├── constants.ts             # Constantes (categorías, etc)
│   ├── helpers.ts               # Funciones auxiliares
│   ├── validators.ts            # Validaciones
│   ├── formatters.ts            # Formateo de datos
│   ├── calculations.ts          # Cálculo de puntos, niveles
│   └── index.ts
├── styles/                      # Estilos globales
│   ├── globals.css              # Estilos globales
│   ├── variables.css            # Variables CSS
│   └── animations.css           # Animaciones
├── App.tsx                      # Componente root
├── App.css                      # Estilos App
├── main.tsx                     # Entry point
└── vite-env.d.ts               # Tipos Vite
```

## 🏗️ Patrones de Arquitectura

### 1. Container/Presentational Pattern

**Container (Smart Component)**
```tsx
export function HabitsPage() {
  const { habits, loading } = useHabits();
  const [filter, setFilter] = useState('');
  
  return (
    <MainLayout>
      <HabitsList habits={habits} filter={filter} onFilter={setFilter} />
    </MainLayout>
  );
}
```

**Presentational (Dumb Component)**
```tsx
interface HabitsListProps {
  habits: Habit[];
  filter: string;
  onFilter: (filter: string) => void;
}

export function HabitsList({ habits, filter, onFilter }: HabitsListProps) {
  return (
    <div>
      <HabitFilter value={filter} onChange={onFilter} />
      {habits.map(habit => <HabitCard key={habit.id} habit={habit} />)}
    </div>
  );
}
```

### 2. Custom Hooks Pattern

Lógica reutilizable encapsulada en hooks.

### 3. Zustand Store Pattern

Global state management sin boilerplate.

### 4. Service Layer Pattern

Lógica de negocio separada de componentes.

## 🔄 Data Flow

```
Firebase Firestore
    ↓
Services Layer (habitService, userService, etc)
    ↓
Zustand Stores (habitStore, userStore, etc)
    ↓
Custom Hooks (useHabits, useUser, etc)
    ↓
Container Components (Pages, Layouts)
    ↓
Presentational Components (UI Components)
    ↓
User Interface
```

## 📝 Convenciones de Código

### Nombres

**Componentes**: PascalCase
```tsx
✅ HabitCard.tsx
✅ UserProfile.tsx
```

**Funciones/Variables**: camelCase
```tsx
✅ calculatePoints()
✅ habitStartDate
```

**Archivos**: 
- Componentes: `ComponentName.tsx`
- Utilidades: `functionName.ts`
- Tipos: `typeName.ts`
- Hooks: `useHookName.ts`
- Stores: `storeNameStore.ts`
- Services: `serviceNameService.ts`

---
*Documento creado: Marzo 3, 2026*
