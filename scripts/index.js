import { enableValidation } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Elementos del perfil
const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeEditButton = editModal.querySelector(".popup__close");
const profileForm = editModal.querySelector(".popup__form");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const inputName = editModal.querySelector(".popup__input_type_name");
const inputDescription = editModal.querySelector(
  ".popup__input_type_description",
);

// Elementos para agregar tarjetas
const addCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-popup");
const closeCardButton = cardModal.querySelector(".popup__close");
const cardForm = cardModal.querySelector(".popup__form");

const inputCardName = cardModal.querySelector(
  ".popup__input_type_card-name",
);
const inputCardLink = cardModal.querySelector(".popup__input_type_url");

// Elementos de la ventana de imagen
const imageModal = document.querySelector("#image-popup");
const closeImageButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupImageCaption = imageModal.querySelector(".popup__caption");

// Plantilla y contenedor de tarjetas
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

// Cerrar popup con Escape
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");

    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Abrir popup
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Cerrar popup
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Cerrar popup haciendo clic en el overlay
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Rellenar formulario de perfil
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

// Abrir formulario de perfil
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

// Guardar cambios del perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(editModal);
}

// Crear elemento de tarjeta
function getCardElement(data) {
  const cardElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name || "Sin título";

  cardImage.src = data.link || "./images/placeholder.jpg";
  cardImage.alt = data.name || "Sin título";

  // Like
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Eliminar tarjeta
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Abrir imagen
  cardImage.addEventListener("click", () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupImageCaption.textContent = cardTitle.textContent;

    openModal(imageModal);
  });

  return cardElement;
}

// Renderizar tarjeta
function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

// Guardar nueva tarjeta
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  renderCard(name, link, cardsContainer);

  cardForm.reset();
  closeModal(cardModal);
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// Eventos del perfil
editProfileButton.addEventListener("click", handleOpenEditModal);

closeEditButton.addEventListener("click", () => {
  closeModal(editModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Eventos de nueva tarjeta
addCardButton.addEventListener("click", () => {
  cardForm.reset();
  openModal(cardModal);
});

closeCardButton.addEventListener("click", () => {
  closeModal(cardModal);
});

cardForm.addEventListener("submit", handleCardFormSubmit);

// Evento para cerrar imagen
closeImageButton.addEventListener("click", () => {
  closeModal(imageModal);
});

// Iniciar validación
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
3. validate.js

Este sería el archivo encargado únicamente de la validación.

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  config,
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`,
  );

  inputElement.classList.add(config.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  config,
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`,
  );

  inputElement.classList.remove(config.inputErrorClass);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (
  formElement,
  inputElement,
  config,
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(
      formElement,
      inputElement,
      config,
    );
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  config,
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(
      config.inactiveButtonClass,
    );

    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(
      config.inactiveButtonClass,
    );

    buttonElement.disabled = false;
  }
};

export const setEventListeners = (
  formElement,
  config,
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(
      config.inputSelector,
    ),
  );

  const buttonElement = formElement.querySelector(
    config.submitButtonSelector,
  );

  toggleButtonState(
    inputList,
    buttonElement,
    config,
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        config,
      );

      toggleButtonState(
        inputList,
        buttonElement,
        config,
      );
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(
      config.formSelector,
    ),
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};