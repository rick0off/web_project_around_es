"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
const Section_1 = require("./Section");
const PopupWithImage_1 = require("./PopupWithImage");
const PopupWithForm_1 = require("./PopupWithForm");
const UserInfo_1 = require("./UserInfo");
const FormValidator_1 = require("./FormValidator");
const constants_1 = require("./utils/constants");
const initialCards = [
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
const userInfo = new UserInfo_1.UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description"
});
//Popup image
const imagePopup = new PopupWithImage_1.PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
};
//Section
const cardSection = new Section_1.Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card_1.Card(item, "#card-template", handleCardClick);
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
    }
}, ".elements");
cardSection.renderItems();
// editProfile
const profilePopup = new PopupWithForm_1.PopupWithForm("#edit-popup", (formData) => {
    userInfo.setUserInfo({
        name: formData.name,
        about: formData.description
    });
    profilePopup.close();
});
profilePopup.setEventListeners();
//
const addCardPopup = new PopupWithForm_1.PopupWithForm("#add-card-popup", (formData) => {
    const newCardData = {
        name: formData["place-name"],
        link: formData.link
    };
    const card = new Card_1.Card(newCardData, "#card-template", handleCardClick);
    cardSection.addItem(card.generateCard());
    addCardPopup.close();
});
addCardPopup.setEventListeners();
// Validación de formularios
const forms = Array.from(document.querySelectorAll(".popup__form"));
forms.forEach((formElement) => {
    const formValidator = new FormValidator_1.FormValidator(constants_1.defaultFormConfig, formElement);
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
