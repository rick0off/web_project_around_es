import { Popup } from "./Popup.js";

export type FormSubmitCallback = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _inputList: NodeListOf<HTMLInputElement>;
  private _handleFormSubmit: FormSubmitCallback;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitCallback) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = this._form.querySelectorAll(".popup__input");
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
}