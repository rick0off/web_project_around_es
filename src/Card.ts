export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _element!: HTMLElement;
  private _likeButton!: HTMLButtonElement;
  private _deleteButton!: HTMLButtonElement;
  private _cardImage!: HTMLImageElement;
  private _cardTitle!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  private _getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
    return cardElement;
  }

  private _setEventListeners(): void {
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

  private _handleLikeIcon(): void {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  private _handleDeleteCard(): void {
    this._element.remove();
  }

  public generateCard(): HTMLElement {
    this._element = this._getTemplate();
    
    this._cardImage = this._element.querySelector(".card__image") as HTMLImageElement;
    this._cardTitle = this._element.querySelector(".card__title") as HTMLElement;
    this._likeButton = this._element.querySelector(".card__like-button") as HTMLButtonElement;
    this._deleteButton = this._element.querySelector(".card__delete-button") as HTMLButtonElement;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}