"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent || "",
            about: this._aboutElement.textContent || ""
        };
    }
    setUserInfo({ name, about }) {
        if (name)
            this._nameElement.textContent = name;
        if (about)
            this._aboutElement.textContent = about;
    }
}
exports.UserInfo = UserInfo;
