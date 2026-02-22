# Generador de Layout V4.1.0

Este es un generador de plantillas web diseñado para facilitar la creación de layout y minimisar errores de cierre de servicios. La herramienta permite capturar datos de manera organizada, guardarlos localmente y generar un formato de texto listo para copiar y pegar para el correcto cierre de servicios.

## 🚀 Características principales

- **Modo Offline**: Historial local que permite guardar múltiples layouts para su posterior consulta.
- **Edición de Plantillas Guardadas**: Capacidad de recargar cualquier plantilla del historial directamente al formulario para realizar cambios rápidos.
- **Modo Oscuro/Claro**: Interfaz adaptable con un tema "Midnight Tech" optimizado para reducir la fatiga visual.
- **Persistencia de Datos Inteligente**: Utiliza `localStorage` para guardar el progreso del formulario y el historial de layouts, permitiendo trabajar sin conexión.
- **Generación de Layout**: Transforma los datos del formulario en un formato de texto estructurado.
- **Eliminación de información**: Permite la eliminación independiente de cada input text y text area para una facil corrección de datos.
- **Copiado Rápido**: Botón integrado para copiar el resultado directamente al portapapeles.
- **Diseño Responsivo**: Interfaz optimizada en una sola columna para facilitar su uso tanto en computadoras como en dispositivos móviles.

## 📁 Estructura del Proyecto

```text
├── css/
│   ├── app.css        # Estilos personalizados y variables de tema (Dark/Light)
│   └── normalize.css  # Reset de estilos para consistencia entre navegadores
├── js/
│   └── app.js         # Lógica del formulario, persistencia y generación de layout
├── icons/             # Recursos visuales
├── index.html         # Estructura principal de la aplicación
└── README.md          # Documentación del proyecto
```

## 🛠️ Tecnologías utilizadas

- **HTML5 Semantic**: Para una estructura web sólida y accesible.
- **Vanilla CSS3**: Uso de variables CSS, Flexbox y transiciones suaves.
- **JavaScript (ES6+)**: Manipulación del DOM, manejo de eventos y almacenamiento local.

## 📥 Instalación y Uso

1. Clonar o descargar el repositorio.
2. Ejecutar desde el siguiente link 
3. Ingresar el nombre del IDC cuando se solicite.
4. Seleccionar el tipo de atención ("Servicios" o "Instalaciones").
5. Llenar el formulario y hacer clic en **"Generar layout"**.
6. Usar el botón **"Copiar"** para obtener el texto final.

## 📝 Notas de Versión (V4.1.0)

- **Modo Offline mejorado**: Implementación de historial de layouts guardados con persistencia de datos.
- **Función de Edición**: Nuevo botón para recargar layouts guardados del historial en el formulario editable.
- **Guardado Automático de Carga**: Al editar un historial, los datos se sincronizan inmediatamente con el formulario activo.
- **Optimización de UI**: Ajustes de contraste en modo oscuro y rediseño a una sola columna.
- **Edición selectiva**: Eliminación independiente de cada input text y text area para una facil corrección de datos.

---
*Desarrollado por J0S3-C4RL05-R0BL35*
