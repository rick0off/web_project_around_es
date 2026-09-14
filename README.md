# Tripleten web_project_around_es

# Around The U.S.

Aplicación web interactiva que permite a los usuarios explorar una galería de imágenes, gestionar su perfil de usuario y añadir o eliminar tarjetas de manera dinámica.

## Funcionalidades

- Edición de perfil: Permite actualizar el nombre y la descripción del usuario.
- Agregar tarjetas: Formulario interactivo para crear nuevas publicaciones con título e imagen.
- Me gusta: Permite marcar y desmarcar tarjetas como favoritas.
- Eliminar tarjetas: Funcionalidad para remover publicaciones de la galería.
- Vista previa (Lightbox): Abre una ventana emergente para ver la imagen ampliada con su descripción.

## Tecnologías Utilizadas

HTML5
CSS3
JavaScript (ES6+)
Manipulación del DOM
Eventos
Plantillas HTML (<template>)
Validación de formularios
JavaScript modular (import / export)
Git y GitHub

## Validación

La validación de los formularios separada en el archivo validate.js.

El formulario Editar perfil valida:

Nombre obligatorio.
Entre 2 y 40 caracteres.
Descripción obligatoria.
Entre 2 y 200 caracteres.

El formulario Nuevo lugar valida:

Título obligatorio.
Entre 2 y 30 caracteres.
URL de imagen obligatoria y válida.

## Estructura

web_project_around_es/
├── blocks/
├── images/
├── pages/
├── scripts/
│ ├── index.js
│ └── validate.js
├── vendor/
├── index.html
└── README.md
