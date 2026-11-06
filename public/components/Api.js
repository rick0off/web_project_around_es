var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Método privado para verificar respuestas
    _request(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(url, options);
            if (res.ok) {
                return yield res.json();
            }
            throw new Error(`Error: ${res.status}`);
        });
    }
    // 1. Obtener información del usuario (GET)
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
    }
    // 2. Obtener tarjetas iniciales (GET)
    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
    }
    // 3. Actualizar perfil de usuario (PATCH)
    updateUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        });
    }
    // 4. Agregar nueva tarjeta (POST)
    addCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        });
    }
    // 7. Eliminar tarjeta (DELETE)
    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        });
    }
    // 8. Dar "me gusta" a una tarjeta (PUT)
    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers
        });
    }
    // 8. Quitar "me gusta" a una tarjeta (DELETE)
    dislikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers
        });
    }
    // 9. Actualizar foto de perfil / avatar (PATCH)
    updateAvatar(avatarUrl) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatarUrl })
        });
    }
}
