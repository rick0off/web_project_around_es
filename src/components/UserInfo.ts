export interface UserInfoData {
  name: string;
  about: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _aboutElement: HTMLElement;

  constructor({ nameSelector, aboutSelector }: { nameSelector: string; aboutSelector: string }) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._aboutElement = document.querySelector(aboutSelector) as HTMLElement;
  }

  public getUserInfo(): UserInfoData {
    return {
      name: this._nameElement.textContent || "",
      about: this._aboutElement.textContent || ""
    };
  }

  public setUserInfo({ name, about }: UserInfoData): void {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
  }
}