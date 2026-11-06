export interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export class Api {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(options: ApiConfig) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Método privado para verificar respuestas
  private async _request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  // 1. Obtener información del usuario (GET)
  public async getUserInfo(): Promise<UserData> {
    try {
      return await this._request<UserData>(`${this._baseUrl}/users/me`, {
        headers: this._headers
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 2. Obtener tarjetas iniciales (GET)
  public async getInitialCards(): Promise<CardData[]> {
    try {
      return await this._request<CardData[]>(`${this._baseUrl}/cards`, {
        headers: this._headers
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 3. Actualizar perfil de usuario (PATCH)
  public async updateUserInfo(data: { name: string; about: string }): Promise<UserData> {
    try {
      return await this._request<UserData>(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 4. Agregar nueva tarjeta (POST)
  public async addCard(data: { name: string; link: string }): Promise<CardData> {
    try {
      return await this._request<CardData>(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 7. Eliminar tarjeta (DELETE)
  public async deleteCard(cardId: string): Promise<{ message: string }> {
    try {
      return await this._request<{ message: string }>(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 8. Dar "me gusta" a una tarjeta (PUT)
  public async likeCard(cardId: string): Promise<CardData> {
    try {
      return await this._request<CardData>(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 8. Quitar "me gusta" a una tarjeta (DELETE)
  public async dislikeCard(cardId: string): Promise<CardData> {
    try {
      return await this._request<CardData>(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 9. Actualizar foto de perfil / avatar (PATCH)
  public async updateAvatar(avatarUrl: string): Promise<UserData> {
    try {
      return await this._request<UserData>(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: avatarUrl })
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}