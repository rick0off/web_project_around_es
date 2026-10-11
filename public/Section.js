"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
exports.Section = Section;
