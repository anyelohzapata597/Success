# Base de Datos - Success

## 🗄️ Visión

Firestore como base de datos NoSQL en tiempo real. Estructura orientada a documentos con colecciones, indexación automática y sincronización real-time.

## 📑 Collections

### 1. `users/` - Perfiles de Usuario

**Propósito**: Almacenar información de usuario

```typescript
interface User {
  uid: string;                    // Firebase Auth UID (doc ID)
  email: string;
  displayName: string;
  photoURL?: string;
  level: number;                  // Nivel actual (1, 2, 3, ...)
  totalPoints: number;            // Puntos acumulados
  currentPoints: number;          // Puntos en nivel actual
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  preferences: {
    notificationEnabled: boolean;
    emailNotifications: boolean;
    theme: 'light' | 'dark';
  };
}
```

**Ejemplo documento:**
```json
{
  "uid": "user_123",
  "email": "usuario@example.com",
  "displayName": "Juan Pérez",
  "photoURL": "https://...",
  "level": 5,
  "totalPoints": 2450,
  "currentPoints": 350,
  "createdAt": "2024-03-01T10:00:00Z",
  "lastLoginAt": "2024-03-03T14:30:00Z",
  "preferences": {
    "notificationEnabled": true,
    "emailNotifications": true,
    "theme": "light"
  }
}
```

---

### 2. `habits/` - Definición de Hábitos

**Propósito**: Hábitos creados por usuarios

```typescript
interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  category: 'salud' | 'productividad' | 'aprendizaje' | 'fitness' | 'finanzas' | 'concentracion' | 'otras';
  frequency: 'daily';
  createdAt: Timestamp;
  active: boolean;
  streak: number;
  maxStreak: number;
  points: number;
  notificationTime?: string;
  notificationMedium?: 'push' | 'email';
}
```

**Índices:**
- `userId` + `active` - Traer hábitos activos del usuario
- `userId` + `category` - Filtrar por categoría

---

### 3. `daily_logs/` - Registro Diario de Hábitos

**Propósito**: Historial de completación de hábitos (por día)

```typescript
interface DailyLog {
  id: string;
  userId: string;
  habitId: string;
  date: Timestamp;
  completed: boolean;
  completedAt?: Timestamp;
  pointsEarned: number;
  streakBonus: number;
  notes?: string;
}
```

**Índices:**
- `userId` + `date` (descendente) - Traer hábitos del día
- `userId` + `habitId` + `date` - Historial de hábito

---

### 4. `friends/` - Relaciones de Amistad

**Propósito**: Gestionar amistades entre usuarios

```typescript
interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
}
```

**Índices:**
- `userId` + `status` - Traer amigos aceptados
- `friendId` + `status` - Notificaciones de solicitud

---

### 5. `notifications/` - Configuración de Notificaciones

**Propósito**: Preferencias de notificación del usuario

```typescript
interface Notification {
  id: string;
  userId: string;
  habitId: string;
  time: string;                   // Hora (HH:mm formato)
  medium: 'push' | 'email';
  enabled: boolean;
  tz: string;                     // Zona horaria
  createdAt: Timestamp;
  lastSentAt?: Timestamp;
}
```

---

### 6. `book_fragments/` - Librería de Fragmentos

**Propósito**: Citas e inspiración de libros

```typescript
interface BookFragment {
  id: string;
  text: string;
  author: string;
  book?: string;
  category?: string;
  type: 'motivational' | 'inspirational' | 'mindset';
  createdAt: Timestamp;
  featured: boolean;
  views?: number;
}
```

---

## 🔐 Firestore Security Rules

```typescript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - solo el propietario
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Habits - solo el propietario
    match /habits/{habitId} {
      allow read, write: if resource.data.userId == request.auth.uid;
    }

    // DailyLogs - solo acceso del propietario
    match /daily_logs/{logId} {
      allow read, write: if resource.data.userId == request.auth.uid;
    }

    // Notifications
    match /notifications/{notifId} {
      allow read, write: if resource.data.userId == request.auth.uid;
    }

    // Friends - bidireccional
    match /friends/{friendId} {
      allow read: if request.auth.uid in [resource.data.userId, resource.data.friendId];
      allow write: if request.auth.uid == resource.data.userId;
    }

    // BookFragments - lectura pública
    match /book_fragments/{fragId} {
      allow read: if request.auth != null;
    }
  }
}
```

---
*Documento creado: Marzo 3, 2026*
