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
  public getUserInfo(): Promise<UserData> {
    return this._request<UserData>(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  // 2. Obtener tarjetas iniciales (GET)
  public getInitialCards(): Promise<CardData[]> {
    return this._request<CardData[]>(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  // 3. Actualizar perfil de usuario (PATCH)
  public updateUserInfo(data: { name: string; about: string }): Promise<UserData> {
    return this._request<UserData>(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  // 4. Agregar nueva tarjeta (POST)
  public addCard(data: { name: string; link: string }): Promise<CardData> {
    return this._request<CardData>(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  // 7. Eliminar tarjeta (DELETE)
  public deleteCard(cardId: string): Promise<{ message: string }> {
    return this._request<{ message: string }>(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  // 8. Dar "me gusta" a una tarjeta (PUT)
  public likeCard(cardId: string): Promise<CardData> {
    return this._request<CardData>(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    });
  }

  // 8. Quitar "me gusta" a una tarjeta (DELETE)
  public dislikeCard(cardId: string): Promise<CardData> {
    return this._request<CardData>(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  // 9. Actualizar foto de perfil / avatar (PATCH)
  public updateAvatar(avatarUrl: string): Promise<UserData> {
    return this._request<UserData>(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl })
    });
  }
}