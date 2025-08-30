# 🖼️ Sistema Simple de Imágenes - Termo Tienda

## 📁 Estructura de Carpetas

```
proyecto-app/
├── public/
│   └── assets/           # Imágenes accesibles públicamente
│       ├── TermoVioleta.jpeg
│       ├── WhatsApp Image 2024-12-26 at 20.36.17.jpeg
│       └── ...
└── src/
    └── components/
        ├── CategoryList.jsx
        ├── ItemListContainer.jsx
        └── ItemDetailContainer.jsx
```

## 🚀 Cómo Usar (Súper Simple)

### **1. Agregar Nueva Imagen**
1. Coloca la imagen en `public/assets/`
2. Usa la ruta directamente en tu componente:

```javascript
// En tu componente
pictureUrl: '/assets/mi-nueva-imagen.jpg'
```

### **2. Ejemplos de Uso**

#### **En productos:**
```javascript
{
  id: 5,
  title: "Termo Premium",
  price: 30000,
  pictureUrl: '/assets/termo-premium.jpg',
  category: "Termos"
}
```

#### **En categorías:**
```javascript
{
  id: 'nueva-categoria',
  name: 'Nueva Categoría',
  image: '/assets/categoria-nueva.jpg',
  productCount: 3
}
```

## ✨ Ventajas del Sistema Simple

✅ **Sin archivos de configuración** - Rutas directas
✅ **Fácil de entender** - Solo `/assets/nombre-imagen.jpg`
✅ **Sin imports** - Escribir la ruta y listo
✅ **Escalable** - Agregar imágenes es súper rápido
✅ **Mantenimiento mínimo** - Solo cambiar la ruta donde la uses

## 📝 Ejemplos Completos

### **Agregar Producto Nuevo:**
```javascript
// 1. Colocar imagen en public/assets/termo-azul.jpg
// 2. Usar en el componente:
{
  id: 6,
  title: "Termo Azul Premium",
  price: 35000,
  pictureUrl: '/assets/termo-azul.jpg',
  category: "Termos"
}
```

### **Agregar Nueva Categoría:**
```javascript
// 1. Colocar imagen en public/assets/categoria-bebidas.jpg
// 2. Usar en CategoryList:
{
  id: 'bebidas',
  name: 'Bebidas',
  image: '/assets/categoria-bebidas.jpg',
  productCount: 5
}
```

## 🔧 Rutas Disponibles

### **Productos (Imágenes Reales):**
- `/assets/TermoVioleta.jpeg` ✅
- `/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg` ✅

### **Categorías (Placeholders):**
- `https://via.placeholder.com/300x200?text=Termos`
- `https://via.placeholder.com/300x200?text=Accesorios`

## 📱 Formatos Soportados

- `.jpg`, `.jpeg`
- `.png`
- `.gif`
- `.webp`
- `.svg`

## 🚨 Notas Importantes

1. **Las imágenes van en `public/assets/`** para acceso directo
2. **Usar rutas absolutas** como `/assets/imagen.jpg` (recomendado)
3. **Mantener nombres descriptivos** en las imágenes
4. **Optimizar imágenes** antes de subirlas
5. **Evitar espacios en nombres** de archivo (usar guiones)

## 🎯 Flujo de Trabajo

1. **Agregar imagen** → `public/assets/`
2. **Usar ruta absoluta** → `/assets/nombre-imagen.jpg`
3. **Probar** → Verificar que se muestre correctamente

## 🔍 Solución de Problemas

### **Si las imágenes no se ven:**

1. **Verificar nombre exacto** del archivo
2. **Usar ruta absoluta** `/assets/` en lugar de `./assets/`
3. **Verificar que el archivo existe** en `public/assets/`
4. **Probar en el navegador** accediendo directamente a `/assets/nombre-imagen.jpg`

### **Test de Imágenes:**
Accede a `http://localhost:5173/test-images.html` para probar las imágenes.

## 💡 Tips Útiles

- **Nombres de archivo:** Usar minúsculas y guiones: `termo-azul.jpg`
- **Extensiones:** Mantener consistencia en el formato
- **Espacios:** Evitar espacios en nombres de archivo
- **Rutas:** Usar `/assets/` (absoluta) en lugar de `./assets/` (relativa)

¡Así de simple! Solo `/assets/nombre-imagen.jpg` y listo! 🎉
