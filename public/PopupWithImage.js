"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupWithImage = void 0;
const Popup_js_1 = require("./Popup.js");
class PopupWithImage extends Popup_js_1.Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._captionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        if (name && link) {
            this._imageElement.src = link;
            this._imageElement.alt = name;
            this._captionElement.textContent = name;
        }
        super.open();
    }
}
exports.PopupWithImage = PopupWithImage;
