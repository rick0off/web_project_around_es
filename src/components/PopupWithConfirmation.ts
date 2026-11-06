import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private _form: HTMLFormElement;
  private _submitButton: HTMLButtonElement;
  private _handleFormSubmit!: () => void;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._submitButton = this._form.querySelector(".popup__button") as HTMLButtonElement;
  }

  // Método para asignar la acción que se ejecutará al confirmar
  public setAction(action: () => void): void {
    this._handleFormSubmit = action;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      if (this._handleFormSubmit) {
        this._handleFormSubmit();
      }
    });
  }

  public renderLoading(isLoading: boolean, loadingText: string = "Eliminando..."): void {
    if (this._submitButton) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = "Sí"; // O el texto predeterminado de tu botón
      }
    }
  }
}