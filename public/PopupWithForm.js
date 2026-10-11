"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupWithForm = void 0;
const Popup_js_1 = require("./Popup.js");
class PopupWithForm extends Popup_js_1.Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }
    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}
exports.PopupWithForm = PopupWithForm;
