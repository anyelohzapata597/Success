# Guía de Desarrollo - Success

## 🚀 Quick Start

### Requisitos previos
- Node.js 18+
- npm o yarn
- Git
- Editor de código (VS Code recomendado)

### Setup Local (Fase 2+)

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/Success.git
cd Success

# Instalar dependencias
npm install

# Variables de entorno (copiar y completar)
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

La app estará en `http://localhost:5173`

---

## 📝 Convenciones de Código

### Nombres y Estructura

**Componentes React**
```tsx
// ✅ PascalCase, archivo = nombre componente
export function HabitCard({ habit }: Props) {
  return <div>...</div>;
}

// ✅ Props interface con suffix "Props"
interface HabitCardProps {
  habit: Habit;
  onComplete: () => void;
}
```

**Funciones y Variables**
```ts
// ✅ camelCase
function calculatePoints(streak: number) {}
const userEmail = "usuario@example.com";
```

**Archivos**
```
✅ Componentes: ComponentName.tsx
✅ Tipos: typeName.ts
✅ Hooks: useHookName.ts
✅ Servicios: serviceService.ts
✅ Utilities: utilityName.ts
✅ Stores: storeNameStore.ts
```

### TypeScript Strict

Siempre usar tipos:
```tsx
// ✅ Tipos explícitos
const user: User = { ... };
function formatDate(date: Date): string { ... }
const [count, setCount] = useState<number>(0);
```

### Imports/Exports

```tsx
// ✅ Named exports, alias for cleanliness
import { useHabits } from '@/hooks';
import { HabitCard } from '@/components/habits';
import type { Habit } from '@/types/habit';
```

### Comentarios

Comentarios para lógica no-obvia:
```tsx
/**
 * Calcula puntos base + bonus por racha.
 * Fórmula: base(100) + (racha * 10)
 */
function calculatePoints(streak: number): number {
  return 100 + (streak * 10);
}
```

---

## 🔄 Git Workflow

### Commits

Convención Conventional Commits:
```bash
git commit -m "feat: agregar pagina de estadisticas"
git commit -m "fix: corregir calculo de puntos"
git commit -m "refactor: simplificar logica de gamificacion"
git commit -m "docs: actualizar README con nuevas features"
```

**Tipos:**
- `feat:` - Nueva feature
- `fix:` - Bug fix
- `refactor:` - Cambios sin funcionalidad nueva
- `docs:` - Documentación
- `test:` - Tests
- `chore:` - Build, deps, etc

### Branches

```bash
git checkout -b feature/nueva-feature
git checkout -b fix/bug-habitos
git checkout -b docs/actualizar-arquitectura

git push origin feature/nueva-feature
# Crear Pull Request en GitHub
```

---

## 🛠️ Tareas Comunes

### Crear un nuevo Custom Hook

```tsx
// src/hooks/useNewFeature.ts
import { useCallback } from 'react';
import { useStore } from '@/store';

export function useNewFeature() {
  const [state, setState] = useStore();

  const doSomething = useCallback(() => {
    setState({ ... });
  }, [setState]);

  return { state, doSomething };
}
```

Exportar en `src/hooks/index.ts`:
```ts
export { useNewFeature } from './useNewFeature';
```

### Crear un nuevo Componente

```tsx
// src/components/NewComponent.tsx
import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface NewComponentProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NewComponent({
  children,
  className,
  onClick,
}: NewComponentProps) {
  return (
    <div className={clsx('component', className)} onClick={onClick}>
      {children}
    </div>
  );
}
```

### Conectar Componente a Firestore

```tsx
// src/services/habitService.ts
import { db } from './firebase';
import { Habit } from '@/types/habit';

export const habitService = {
  async getHabits(userId: string): Promise<Habit[]> {
    const querySnapshot = await db
      .collection('habits')
      .where('userId', '==', userId)
      .get();
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Habit[];
  },

  subscribeToHabits(userId: string, callback: (habits: Habit[]) => void) {
    return db
      .collection('habits')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        const habits = snapshot.docs.map(doc => ({...}) ) as Habit[];
        callback(habits);
      });
  },
};
```

---

## 🧪 Testing

### Ejecutar tests
```bash
npm run test              # Ejecutar tests
npm run test -- --ui      # UI para tests
npm run test:coverage     # Coverage report
```

### Estructura de tests

Colocar tests junto a componentes:
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
```

---

## 🚀 Deployment

### Preview en Vercel
```bash
git push origin feature/nueva-feature
# Vercel auto-crea preview URL en PR
```

### Deploy a Producción

1. Merge a `main` en GitHub
2. Vercel automáticamente deploya
3. App disponible en URL production

### Variables de Entorno en Vercel

En dashboard de Vercel, agregar variables (VITE_FIREBASE_*, etc)

---

## 🐛 Debugging

### VS Code
- Instalar "Debugger for Chrome"
- Agregar breakpoints
- F5 para debuggear

### React DevTools
- Instalar extensión en Chrome
- Inspeccionar componentes
- Ver state y props

---

## 📊 Performance

### Bundle Analysis
```bash
npm install -D vite-plugin-visualizer
npm run build
```

### Optimizaciones
- Code splitting con React.lazy()
- Image compression
- CSS purification (Tailwind)
- Tree-shaking

---

*Documento creado: Marzo 3, 2026*
