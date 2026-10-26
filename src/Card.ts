export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export class Card {
  private _name: string;
  private _link: string;
  private _id: string;
  private _owner: string;
  private _isLiked: boolean;
  private _userId: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _handleLikeClick: (card: Card) => void;
  private _handleDeleteClick: (card: Card) => void;
  private _element!: HTMLElement;
  private _likeButton!: HTMLButtonElement;
  private _deleteButton!: HTMLButtonElement;
  private _cardImage!: HTMLImageElement;
  private _cardTitle!: HTMLElement;

  constructor(
    data: CardData,
    userId: string, // ID del usuario actual para comparar con el owner
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleLikeClick: (card: Card) => void,
    handleDeleteClick: (card: Card) => void
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._isLiked = data.isLiked;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  public getId(): string {
    return this._id;
  }

  public isLiked(): boolean {
    return this._isLiked;
  }

  // Método para actualizar visualmente el estado del like
  public setLikeState(isLiked: boolean): void {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  // Método público para eliminar la tarjeta del DOM cuando el servidor confirme
  public removeCard(): void {
    this._element.remove();
    this._element = null as unknown as HTMLElement;
  }

  private _getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
    return cardElement;
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
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

    // Aplicar estado inicial del like
    this.setLikeState(this._isLiked);

    // Ocultar el botón de basura si la tarjeta no es tuya
    if (this._owner !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }
}