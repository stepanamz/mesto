import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-title');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();

        // Найти кнопку закрытия попапа
        const closeButton = this._popup.querySelector('.popup__close');

        // Добавить обработчик события на клик по кнопке закрытия
        closeButton.addEventListener('click', () => {
          this.close();
        });
  }
}
