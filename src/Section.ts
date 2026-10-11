export interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ items, renderer }: SectionConfig<T>, containerSelector: string) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
  }

  public renderItems(): void {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}