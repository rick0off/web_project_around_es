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

initialCards.forEach((card) => {
  console.log(card.name);
});

//Segunda parte del proyecto 6

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

const addCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-card-popup");
const closeCardButton = cardModal.querySelector(".popup__close");
const cardForm = cardModal.querySelector(".popup__form");

const inputCardName = cardModal.querySelector(".popup__input_type_card-name");
const inputCardLink = cardModal.querySelector(".popup__input_type_url");

//imagen ampliada
const imageModal = document.querySelector("#image-popup");
const closeImageButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupImageCaption = imageModal.querySelector(".popup__caption");

//plantilla y contenedor
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

// funciones
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(editModal);
}

// funciones de tarjetas

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name || "Sin título";
  cardImage.src = data.link || "./images/placeholder.jpg";
  cardImage.alt = data.name || "Sin título";

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupImageCaption.textContent = cardTitle.textContent;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  renderCard(name, link, cardsContainer);

  cardForm.reset();
  closeModal(cardModal);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

editProfileButton.addEventListener("click", handleOpenEditModal);

closeEditButton.addEventListener("click", () => {
  closeModal(editModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => {
  cardForm.reset();
  openModal(cardModal);
});
closeCardButton.addEventListener("click", () => closeModal(cardModal));
cardForm.addEventListener("submit", handleCardFormSubmit);

closeImageButton.addEventListener("click", () => closeModal(imageModal));
