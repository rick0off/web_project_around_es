import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._form.querySelector(".popup__button");
    }
    // Método para asignar la acción que se ejecutará al confirmar
    setAction(action) {
        this._handleFormSubmit = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this._handleFormSubmit) {
                this._handleFormSubmit();
            }
        });
    }
    renderLoading(isLoading, loadingText = "Eliminando...") {
        if (this._submitButton) {
            if (isLoading) {
                this._submitButton.textContent = loadingText;
            }
            else {
                this._submitButton.textContent = "Sí"; // O el texto predeterminado de tu botón
            }
        }
    }
}
