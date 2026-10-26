# Tripleten web_project_around_es

# Around The U.S.

Aplicación web interactiva que permite a los usuarios explorar una galería de imágenes, gestionar su perfil de usuario y añadir o eliminar tarjetas de manera dinámica conectada a un servidor backend (API REST).

## Funcionalidades

- **Carga inicial sincronizada**: Obtención simultánea de los datos del usuario y la galería mediante `Promise.all`.
- **Edición de perfil**: Permite actualizar el nombre y la descripción del usuario con persistencia en el servidor mediante solicitudes `PATCH`.
- **Actualización de Avatar**: Funcionalidad para cambiar la foto de perfil en tiempo real a través de un formulario modal.
- **Agregar tarjetas**: Formulario interactivo para crear nuevas publicaciones con título e imagen enviadas al servidor (`POST`).
- **Me gusta (Likes)**: Permite marcar y desmarcar tarjetas como favoritas con sincronización de estado en tiempo real (`PUT` y `DELETE`).
- **Eliminación de tarjetas**: Funcionalidad segura para remover publicaciones propias de la galería con confirmación y petición al servidor (`DELETE`).
- **Vista previa (Lightbox)**: Abre una ventana emergente para ver la imagen ampliada con su descripción.
- **Experiencia de usuario (UX)**: Textos de carga dinámicos ("Guardando...", "Eliminando...") en los botones de todos los formularios.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- TypeScript (Tipado estático, interfaces para datos de usuario y tarjetas, y compilación de código).
- POO (Programación Orientada a Objetos): Arquitectura basada en clases independientes y reutilizables (`Api`, `Card`, `Section`, `Popup`, `PopupWithImage`, `PopupWithForm`, `UserInfo`, `FormValidator`, `PopupWithConfirmation`) con acoplamiento débil e implementación de herencia.
- **API REST & Fetch**: Consumo de endpoints del servidor mediante peticiones asíncronas (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`).
- Git y GitHub

## Validación

La validación de los formularios está gestionada de manera modular mediante la clase `FormValidator`.

El formulario **Editar perfil** valida:

- Nombre obligatorio.
- Entre 2 y 40 caracteres.
- Descripción obligatoria.
- Entre 2 y 200 caracteres.

El formulario **Nuevo lugar** valida:

- Título obligatorio.
- Entre 2 y 30 caracteres.
- URL de imagen obligatoria y válida.

El formulario **Actualizar avatar** valida:

- URL de imagen obligatoria y válida.

## Estructura del Proyecto

web_project_around_es/
├── blocks/
├── images/
├── pages/
├── src/
│ ├── components/
│ │ └── Api.ts
│ ├── utils/
│ │ └── constants.ts
│ ├── Card.ts
│ ├── FormValidator.ts
│ ├── Popup.ts
│ ├── PopupWithForm.ts
│ ├── PopupWithImage.ts
│ ├── PopupWithConfirmation.ts
│ ├── Section.ts
│ ├── UserInfo.ts
│ └── index.ts
├── vendor/
├── index.html
├── tsconfig.json
└── README.md
