export class Card {
    constructor(data, userId, // ID del usuario actual para comparar con el owner
    templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._owner = data.owner;
        this._isLiked = data.isLiked;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }
    getId() {
        return this._id;
    }
    isLiked() {
        return this._isLiked;
    }
    // Método para actualizar visualmente el estado del like
    setLikeState(isLiked) {
        this._isLiked = isLiked;
        if (this._isLiked) {
            this._likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this._likeButton.classList.remove("card__like-button_is-active");
        }
    }
    // Método público para eliminar la tarjeta del DOM cuando el servidor confirme
    removeCard() {
        this._element.remove();
        this._element = null;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick(this);
        });
        if (this._deleteButton) {
            this._deleteButton.addEventListener("click", () => {
                this._handleDeleteClick(this);
            });
        }
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardTitle = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        // Aplicar estado inicial del like
        this.setLikeState(this._isLiked);
        // Ocultar el botón de basura si la tarjeta no es tuya
        if (this._owner !== this._userId) {
            this._deleteButton.remove();
        }
        this._setEventListeners();
        return this._element;
    }
}
