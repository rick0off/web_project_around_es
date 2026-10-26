import { Popup } from "./Popup.js";

export type FormSubmitCallback = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _inputList: NodeListOf<HTMLInputElement>;
  private _handleFormSubmit: FormSubmitCallback;
  private _submitButton: HTMLButtonElement; // <-- Declaramos el botón aquí

  constructor(popupSelector: string, handleFormSubmit: FormSubmitCallback) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__button") as HTMLButtonElement; // <-- Seleccionamos el botón de envío
  }

  private _getInputValues(): Record<string, string> {
    const formValues: Record<string, string> = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  public close(): void {
    super.close();
    this._form.reset();
  }

  // Método renderLoading correctamente DENTRO de la clase
  public renderLoading(isLoading: boolean, loadingText: string = "Guardando...") {
    if (this._submitButton) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = "Guardar"; // Texto predeterminado del botón
      }
    }
  }
}