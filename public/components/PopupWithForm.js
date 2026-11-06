import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._submitButton = this._form.querySelector(".popup__button"); // <-- Seleccionamos el botón de envío
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
    // Método renderLoading correctamente DENTRO de la clase
    renderLoading(isLoading, loadingText = "Guardando...") {
        if (this._submitButton) {
            if (isLoading) {
                this._submitButton.textContent = loadingText;
            }
            else {
                this._submitButton.textContent = "Guardar"; // Texto predeterminado del botón
            }
        }
    }
}
