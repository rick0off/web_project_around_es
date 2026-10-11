"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeIcon();
        });
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard();
        });
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    _handleLikeIcon() {
        this._likeButton.classList.toggle("card__like-button_active");
    }
    _handleDeleteCard() {
        this._element.remove();
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
        this._setEventListeners();
        return this._element;
    }
}
exports.Card = Card;
