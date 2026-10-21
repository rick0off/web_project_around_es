import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
//userInfo instancia
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});
//Popup image
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const handleCardClick = (name, link) => {
  imagePopup.open(name, link);
};
//Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements",
);
cardSection.renderItems();
// editProfile
const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.description,
  });
  profilePopup.close();
});
profilePopup.setEventListeners();
//
const addCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  const newCardData = {
    name: formData["place-name"],
    link: formData.link,
  };
  const card = new Card(newCardData, "#card-template", handleCardClick);
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();
// Validación de formularios
const forms = Array.from(document.querySelectorAll(".popup__form"));
forms.forEach((formElement) => {
  const formValidator = new FormValidator(defaultFormConfig, formElement);
  formValidator.enableValidation();
});
// Botones de apertura de modales
const editProfileButton = document.querySelector(".profile__edit-button");
if (editProfileButton) {
  editProfileButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    // Opcional: podrías precargar los inputs aquí si lo deseas
    profilePopup.open();
  });
}
const addCardButton = document.querySelector(".profile__add-button");
if (addCardButton) {
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });
}
