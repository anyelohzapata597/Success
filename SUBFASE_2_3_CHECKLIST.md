# 📋 CHECKLIST SUBFASE 2.3 - Para Después

> Este archivo contiene el plan detallado de **Subfase 2.3: Zustand State Management**  
> Úsalo como referencia cuando estés listo para continuar

---

## 🎯 Objetivos de Subfase 2.3

- [ ] Integrar Zustand stores con componentes React
- [ ] Crear custom hooks para reutilización
- [ ] Implementar mock API calls
- [ ] Persistencia con localStorage
- [ ] Loading states en formularios
- [ ] Notificaciones con toast

**Duración Estimada**: 3-4 días  
**Archivos a Crear**: ~15 archivos  
**LOC Esperadas**: ~3,000

---

## 📋 Tareas Detalladas

### Tarea 1: Custom Hooks (2 archivos)
- [ ] `src/hooks/useAuth.ts` - Hook para autenticación
  ```typescript
  export function useAuth() {
    const { user, isAuthenticated, setUser, logout } = useAuthStore()
    return { user, isAuthenticated, setUser, logout }
  }
  ```

- [ ] `src/hooks/useHabits.ts` - Hook para hábitos
  ```typescript
  export function useHabits() {
    const { habits, addHabit, updateHabit, deleteHabit } = useHabitStore()
    return { habits, addHabit, updateHabit, deleteHabit }
  }
  ```

- [ ] `src/hooks/useUser.ts` - Hook para usuario
- [ ] `src/hooks/index.ts` - Exports centrales

### Tarea 2: Mock API Service (1 archivo)
- [ ] `src/services/authService.ts` - Simular login/register
  ```typescript
  export async function mockLogin(email: string, password: string) {
    // Simular 500ms delay
    // Validar credenciales
    // Retornar user o error
  }
  
  export async function mockRegister(name, email, password) {
    // Simular 500ms delay
    // Crear nuevo usuario
  }
  ```

### Tarea 3: Integración en Login (1 página)
- [ ] `src/pages/auth/LoginPage.tsx` - Actualizar con:
  ```typescript
  const handleSubmit = async (data) => {
    setIsLoading(true)
    try {
      const user = await mockLogin(data.email, data.password)
      useAuthStore.setState({ user, isAuthenticated: true })
      toast.success('¡Sesión iniciada!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  ```

### Tarea 4: Integración en Register (1 página)
- [ ] `src/pages/auth/RegisterPage.tsx` - Similar a Login
- [ ] Guardar user en authStore
- [ ] Redirect a dashboard

### Tarea 5: Integración en Dashboard (1 página)
- [ ] `src/pages/dashboard/DashboardPage.tsx`:
  - [ ] Usar `useAuth()` para obtener usuario
  - [ ] Mostrar nombre real en bienvenida
  - [ ] Calculador de progreso dinámico
  - [ ] Level progress actualizado

### Tarea 6: Integración en Habits (1 página)
- [ ] `src/pages/dashboard/HabitsPage.tsx`:
  - [ ] `useHabits()` para obtener hábitos
  - [ ] Modal create: guardar en store
  - [ ] Toggle completado: actualizar store
  - [ ] Filtros en tiempo real

### Tarea 7: Integración en Profile (1 página)
- [ ] `src/pages/dashboard/ProfilePage.tsx`:
  - [ ] Usar `useUser()` para datos
  - [ ] Edit profile: guardar en store
  - [ ] Preferencias: utilizar userStore

### Tarea 8: localStorage Persistence (1 archivo)
- [ ] Actualizar stores para usar `persist` middleware
- [ ] Automático con Zustand (ya parcialmente implementado)
- [ ] Testear: recargar página, datos persisten

### Tarea 9: Loading States (3-5 archivos)
- [ ] Formularios: `isLoading` en buttons
- [ ] Páginas: Skeleton loaders o Loader component
- [ ] Store: `loading` flag en authStore

### Tarea 10: Toast Notifications (todos los archivos)
- [ ] Import `toast` de react-hot-toast
- [ ] Success: después de crear/guardar
- [ ] Error: cuando falla algo
- [ ] Info: confirmaciones

### Tarea 11: Testing Manual
- [ ] [ ] Login → Dashboard (datos persisten)
- [ ] [ ] Register → Login → Dashboard
- [ ] [ ] Crear hábito → aparece en lista
- [ ] [ ] Editar hábito → se actualiza
- [ ] [ ] Marcar completado → racha sube
- [ ] [ ] Recargar página → datos están

---

## 📁 Estructura de Archivos a Crear

```
src/
├── hooks/                   # 4 archivos nuevos
│   ├── useAuth.ts
│   ├── useHabits.ts
│   ├── useUser.ts
│   └── index.ts
│
├── services/                # 1 archivo nuevo
│   └── authService.ts
│
└── pages/
    ├── auth/
    │   ├── LoginPage.tsx    # Actualizar
    │   └── RegisterPage.tsx # Actualizar
    └── dashboard/
        ├── DashboardPage.tsx    # Actualizar
        ├── HabitsPage.tsx       # Actualizar
        ├── FriendsPage.tsx      # Considerar
        ├── StatisticsPage.tsx   # Considerar
        └── ProfilePage.tsx      # Actualizar
```

---

## 🔄 Flujo de Integración

```
1. Usuario completa LoginForm
   ↓
2. Llama handleSubmit → mockLogin()
   ↓
3. mockLogin simula 500ms delay
   ↓
4. Si éxito: useAuthStore.setState(user)
   ↓
5. localStorage persiste automáticamente
   ↓
6. navigate('/dashboard') con user en store
   ↓
7. DashboardPage lee de useAuth() hook
   ↓
8. Muestra nombre, level, punto reales
```

---

## 💡 Tips & Observaciones

### Naming Convenciones
- Hooks: `useXxx.ts`
- Services: `xxxService.ts`
- No cambiar nombres de stores

### Mock Data
- Usa datos realistas (Juan Pérez, Level 12)
- Consistencia entre páginas
- Simula 300-500ms delays (para UX realista)

### Errores Comunes Evitar
- ❌ No olvidar `@/hooks` en imports
- ❌ No `useHabitsStore()` y `useHabits()` al mismo tiempo
- ❌ No olvidar `toast` después de acciones
- ❌ No `navigate` sin delay cuando hay API call

### Testing
```bash
# Después de cada cambio
npm run type-check
# Para ver errores TypeScript

# Visual testing
# Refresh página en navegador (F5)
# DevTools → Application → LocalStorage
# Verificar keys persisten
```

---

## 🧪 Casos de Test Manuales

### Flujo 1: Login → Dashboard
```
1. Accede a /login
2. Email: juan@ejemplo.com
3. Password: password123
4. Click "Iniciar Sesión"
5. Loading spinner visible
6. Después 500ms: redirect a /dashboard
7. Nombre "Juan Pérez" visible
8. Refresca página: datos persisten
9. Navbar muestra links
```

### Flujo 2: Register → Login → Dashboard
```
1. Accede a /register
2. Nombre: Carlos López
3. Email: carlos@ejemplo.com
4. Password: Password@123 (fortaleza 5)
5. Confirma password
6. Acepta términos
7. Click "Crear Cuenta"
8. Toast: "¡Cuenta creada!"
9. Redirect a /login
10. Usa credenciales nuevas
11. Entra a dashboard
```

### Flujo 3: Crear Hábito
```
1. En /habits
2. Click "+ Nuevo Hábito"
3. Nombre: "Yoga 20 min"
4. Categoría: "Fitness"
5. Descripción: "..."
6. Notificación: 07:00 AM
7. Click "Crear Hábito"
8. Toast: "¡Hábito creado!"
9. Modal cierra
10. Nuevo hábito aparece en grid
11. Refresca: hábito persiste
```

### Flujo 4: Completar Hábito Diario
```
1. En /dashboard
2. DailyChecklist visible
3. Click ✓ en primer hábito
4. Se marca verde
5. Progreso sube 25% (4 hábitos)
6. Puntos suben 100 en stats
7. Toast: "¡+100 puntos! 🎉"
```

---

## 📊 Checklist de Completitud

### Antes de Empezar
- [ ] Subfase 2.2 completada y testeada
- [ ] `npm install` sin errores
- [ ] `npm run dev` funciona
- [ ] DevTools accesible

### Durante Subfase 2.3
- [ ] Cada tarea tiene test manual
- [ ] Tipos TypeScript correctos
- [ ] No hay console.errors
- [ ] localStorage persiste
- [ ] Toast notifications funcionan
- [ ] Redirect después de login

### Después de Subfase 2.3
- [ ] Todas las 7 páginas usan stores
- [ ] Custom hooks en lugar de stores directos
- [ ] Mock API calls con delay
- [ ] Loading states en todos los forms
- [ ] 100% funcional sin backend real
- [ ] Listo para Subfase 2.4 (Gamificación)

---

## 🔗 Archivos Relacionados

- [SETUP.md](./SETUP.md) - Cómo correr el proyecto
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Estado actual
- [subfase_2_2.md](./docs/subfase_2_2.md) - Lo que ya hecho

---

## ⏰ Estimación de Tiempo por Tarea

| Tarea | Estimado | Notas |
|-------|----------|-------|
| Custom Hooks | 30 min | Simple, copiar patrones |
| Mock API Service | 1 hora | Usar setTimeout para delay |
| Integración Login | 1-2 horas | Más validación |
| Integración Register | 1 hora | Similar a login |
| Integración Dashboard | 2 horas | Datos dinámicos |
| Integración Habits | 2 horas | CRUD operations |
| localStorage | 15 min | Ya está en Zustand |
| Testing manual | 1-2 horas | Todos los flujos |
| **Total** | **10-14 horas** | **Distribuido en 3-4 días** |

---

## 🎓 Referencias Útiles

### Zustand Docs
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Persist Middleware](https://github.com/pmndrs/zustand#persist-middleware)

### React Router
- [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate)
- [Navigation](https://reactrouter.com/en/main/start/overview)

### React Hot Toast
- [Documentation](https://react-hot-toast.com/)

---

## 📞 Cuando Estés Listo

**Mensaje de inicio**:
```
"Iniciando Subfase 2.3: Zustand State Management ✅

Ya completamos:
- 27 componentes React (Subfase 2.2)
- 5 páginas funcionales
- Stores configurados pero no integrados

Ahora vamos a:
- Crear custom hooks (useAuth, useHabits, useUser)
- Conectar formularios a Zustand
- Mock API calls con delay
- localStorage persistence
- Loading states y toasts

¿Empezamos?"
```

---

**Preparado**: Marzo 3, 2026  
**Estado**: 🔔 Recordatorio listo para cuando continúes  
**Próximo**: Cuando usuario diga "continúa con 2.3"
