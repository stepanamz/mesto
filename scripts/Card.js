const popupImage = document.querySelector('.popup_type_image')
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

export default class Card {

  constructor(data, templateSelector) {
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;

  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners(); // обработчик лайка и мусорки
    //отдельные свойства
    this._elementCardImage = this._element.querySelector(".element__card-image");
    this._elementCardTitle = this._element.querySelector(".element__card-title");
    // Добавим данные
    this._elementCardImage.src = this._image;
    this._elementCardImage.alt = this._text;
    this._elementCardTitle.textContent = this._text;
    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    //  обработчики
    this._element.querySelector(".element__card-like").addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element.querySelector(".element__trash").addEventListener("click", () => {
        this._element.remove();
      });
    this._element.querySelector(".element__card-image").addEventListener("click", () => {
        this._openPopupImage();
        popupImageImg.src = this._image;
        popupImageImg.alt = this._text;
        popupImageTitle.textContent = this._text;
      });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__card-like")
      .classList.toggle("element__card-like_active");
  }

  _openPopupImage() {
    popupImage.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        popupImage.classList.remove("popup_opened");
      }
    });
  }


}
