export class Popup {
  protected _popupElement: HTMLElement;
  private _handleEscClose: (evt: KeyboardEvent) => void;

  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector) as HTMLElement;
    this._handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  }

  public open(): void {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    this._popupElement.addEventListener("mousedown", (evt: MouseEvent) => {
      if (
        evt.target === this._popupElement ||
        (evt.target as HTMLElement).classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}