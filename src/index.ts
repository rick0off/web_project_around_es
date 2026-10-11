import { Card, CardData } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";

const initialCards: CardData[] = [
  {
    name: "Valle de México",
    link: "https://images.unsplash.com/photo-1585464231915-16d3f2762283"
  },
  {
    name: "Puebla",
    link: "https://images.unsplash.com/photo-1512813238178-98e09f8742fb"
  }
];

//userInfo instancia
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description"
});

//Popup image
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const handleCardClick = (name: string, link: string) => {
  imagePopup.open(name, link);
};

//Section
const cardSection = new Section<CardData>({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", handleCardClick);
    const cardElement = card.generateCard();
    cardSection.addItem(cardElement);
  }
}, ".elements");

cardSection.renderItems();

// editProfile
const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.description
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

//
const addCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  const newCardData: CardData = {
    name: formData["place-name"],
    link: formData.link
  };
  const card = new Card(newCardData, "#card-template", handleCardClick);
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Validación de formularios
const forms = Array.from(document.querySelectorAll(".popup__form")) as HTMLFormElement[];
forms.forEach((formElement) => {
  const formValidator = new FormValidator(defaultFormConfig, formElement);
  formValidator.enableValidation();
});

// Botones de apertura de modales
const editProfileButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
if (editProfileButton) {
  editProfileButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    // Opcional: podrías precargar los inputs aquí si lo deseas
    profilePopup.open();
  });
}

const addCardButton = document.querySelector(".profile__add-button") as HTMLButtonElement;
if (addCardButton) {
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });
}