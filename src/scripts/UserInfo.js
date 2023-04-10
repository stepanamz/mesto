export default class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._imageSelector = document.querySelector(imageSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, subname, image }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = subname;
    this._imageSelector.src = image;

  }
}
