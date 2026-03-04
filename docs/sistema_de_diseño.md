# Sistema de Diseño - Success

## 🎨 Visión de Diseño

Success debe ser una experiencia **llamativa, motivadora e interactiva** que genere el deseo en usuarios de abrir la app constantemente. Los colores deben transmitir energía y positividad, las animaciones deben motivar, y cada interacción debe sentirse satisfactoria.

## 🌈 Paleta de Colores

### Colores Primarios

| Color | Código | Uso | Emoción |
|-------|--------|-----|---------|
| Verde Éxito | `#10B981` | Botones primarios, completación de hábitos, badges de logro | Crecimiento, victoria, éxito |
| Azul Confianza | `#0EA5E9` | Encabezados, links, información, navegación | Profesionalidad, seguridad, confianza |
| Amarillo Motivación | `#FCD34D` | Puntos ganados, frases motivacionales, destacados | Energía, positividad, ánimo |

### Colores Secundarios

| Color | Código | Uso |
|-------|--------|-----|
| Gris Claro | `#F3F4F6` | Fondos, tarjetas, areas neutras |
| Gris Medio | `#9CA3AF` | Texto secundario, borders, divisores |
| Gris Oscuro | `#374151` | Texto principal, headings |
| Negro | `#1F2937` | Texto prominente, accents |
| Rojo de Error | `#EF4444` | Errores, warnings, reset |
| Verde Claro | `#D1FAE5` | Fondos de éxito, confirmaciones |

## 🔤 Tipografía

### Fuentes Seleccionadas

```css
/* Heading y Branding */
font-family: 'Poppins', sans-serif;
font-weight: 700, 600;
letter-spacing: -0.5px;

/* Texto Body */
font-family: 'Inter', sans-serif;
font-weight: 400, 500;
line-height: 1.6;

/* Números/Puntos (monospaced) */
font-family: 'Roboto Mono', monospace;
```

### Escala Tipográfica

| Nivel | Tamaño | Weight | Uso |
|-------|--------|--------|-----|
| H1 | 2.5rem (40px) | 700 | Títulos de página |
| H2 | 2rem (32px) | 700 | Subtítulos principales |
| H3 | 1.5rem (24px) | 600 | Subtítulos secundarios |
| Body | 1rem (16px) | 400 | Texto principal |
| Small | 0.875rem (14px) | 400 | Texto secundario |
| Tiny | 0.75rem (12px) | 500 | Labels, badges |

## 🔲 Componentes Base

### Botón (Button)

**Especificaciones:**
- Padding: 12px 24px (vertical/horizontal)
- Border Radius: 8px
- Font Weight: 600
- Transition: 200ms ease-in-out

**Variantes:**
- Primary (Verde): bg-[#10B981], text-white
- Secondary (Azul): bg-[#0EA5E9], text-white
- Outline: border-2, background transparent
- Ghost: sin background, solo texto
- Danger: bg-[#EF4444]

### Tarjeta (Card)

**Especificaciones:**
- Background: #F3F4F6 o blanco
- Border Radius: 12px
- Padding: 20px
- Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover Shadow: 0 10px 15px rgba(0,0,0,0.1)

**Uso:**
- Hábitos del día
- Amigos en leaderboard
- Fragmentos de libros
- Reportes semanales

### Modal/Dialog

**Especificaciones:**
- Overlay: rgba(0,0,0,0.5)
- Max Width: 500px (mobile: 90vw)
- Border Radius: 12px
- Animation: fade + slide-up (300ms)

## 📐 Espaciado

**Sistema de espaciado (8px base):**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
```

## 🎬 Animaciones

**Duraciones estándar:**
- Rápidas: 150ms (micro-interactions)
- Normal: 300ms (transiciones)
- Lenta: 500ms (modals, celebraciones)

---
*Documento creado: Marzo 3, 2026*
