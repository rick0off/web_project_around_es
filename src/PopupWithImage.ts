import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement;
  private _captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image") as HTMLImageElement;
    this._captionElement = this._popupElement.querySelector(".popup__caption") as HTMLElement;
  }

  public open(name?: string, link?: string): void {
    if (name && link) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
    }
    super.open();
  }
}