import { Card, CardData } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";

// 1. Instancia de la API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "ae7fa8c1-c48e-4413-9590-c3f781a5b001",
    "Content-Type": "application/json"
  }
});

// 2. Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description"
});

// 3. Popups
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation("#confirm-popup");
confirmDeletePopup.setEventListeners();

const handleCardClick = (name: string, link: string) => {
  imagePopup.open(name, link);
};

// Variables globales
let cardSection: Section<CardData>;
let userId: string = "";

// Función reutilizable para crear tarjetas (evita código duplicado)
const createCard = (item: CardData): HTMLElement => {
  const card = new Card(
    item,
    userId,
    "#card-template",
    handleCardClick,
    (cardInstance) => {
      // Manejador de Like / Dislike
      const cardId = cardInstance.getId();
      if (cardInstance.isLiked()) {
        api.dislikeCard(cardId)
          .then((updatedCard) => cardInstance.setLikeState(updatedCard.isLiked))
          .catch((err) => console.error("Error al quitar like:", err));
      } else {
        api.likeCard(cardId)
          .then((updatedCard) => cardInstance.setLikeState(updatedCard.isLiked))
          .catch((err) => console.error("Error al dar like:", err));
      }
    },
    (cardInstance) => {
      // Manejador de eliminación usando PopupWithConfirmation
      confirmDeletePopup.setAction(() => {
        confirmDeletePopup.renderLoading(true, "Eliminando...");
        api.deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            confirmDeletePopup.close();
          })
          .catch((err) => console.error("Error al eliminar la tarjeta:", err))
          .then(() => {
            confirmDeletePopup.renderLoading(false);
          });
      });
      confirmDeletePopup.open();
    }
  );
  return card.generateCard();
};

// 4. Carga inicial optimizada con Promise.all
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about
    });

    const avatarElement = document.querySelector(".profile__image") as HTMLImageElement;
    if (avatarElement) {
      avatarElement.src = userData.avatar;
    }

    cardSection = new Section<CardData>({
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      }
    }, ".elements");

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Fallo al cargar datos iniciales:", err);
  });

// 5. Popup de editar perfil
const profilePopup = new PopupWithForm("#edit-popup", (formData) => {
  profilePopup.renderLoading(true, "Guardando...");
  api.updateUserInfo({
    name: formData.name,
    about: formData.description
  })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about
      });
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el perfil:", err);
    })
    .then(() => {
      profilePopup.renderLoading(false);
    });
});
profilePopup.setEventListeners();

// 6. Popup de agregar tarjeta
const addCardPopup = new PopupWithForm("#add-card-popup", (formData) => {
  addCardPopup.renderLoading(true, "Guardando...");
  api.addCard({
    name: formData["place-name"],
    link: formData.link
  })
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      if (cardSection) {
        cardSection.addItem(cardElement);
      }
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error al crear la tarjeta:", err);
    })
    .then(() => {
      addCardPopup.renderLoading(false);
    });
});
addCardPopup.setEventListeners();

// 7. Popup de actualizar avatar
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.renderLoading(true, "Guardando...");
  api.updateAvatar(formData.avatar)
    .then((userData) => {
      const avatarElement = document.querySelector(".profile__image") as HTMLImageElement;
      if (avatarElement) {
        avatarElement.src = userData.avatar;
      }
      avatarPopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el avatar:", err);
    })
    .then(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

// 8. Validación de formularios
const forms = Array.from(document.querySelectorAll(".popup__form")) as HTMLFormElement[];
forms.forEach((formElement) => {
  const formValidator = new FormValidator(defaultFormConfig, formElement);
  formValidator.enableValidation();
});

// 9. Botones de apertura de modales
const editProfileButton = document.querySelector(".profile__edit-button") as HTMLButtonElement;
if (editProfileButton) {
  editProfileButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    const nameInput = document.querySelector(".popup__input_type_name") as HTMLInputElement;
    const aboutInput = document.querySelector(".popup__input_type_description") as HTMLInputElement;
    if (nameInput && aboutInput) {
      nameInput.value = currentUser.name;
      aboutInput.value = currentUser.about;
    }
    profilePopup.open();
  });
}

const addCardButton = document.querySelector(".profile__add-button") as HTMLButtonElement;
if (addCardButton) {
  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
  });
}

const profileImageContainer = document.querySelector(".profile__image") as HTMLElement;
if (profileImageContainer) {
  profileImageContainer.addEventListener("click", () => {
    avatarPopup.open();
  });
}