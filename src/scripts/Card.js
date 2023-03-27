export default class Card {

  constructor(data, templateSelector, {handleImagePopup}) {
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleImagePopup = handleImagePopup;
    this._cardImage = null;
    this._cardLike = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__card-image");
    this._cardLike = this._element.querySelector(".element__card-like");
    this._setEventListeners();

    this._elementCardTitle = this._element.querySelector(".element__card-title");

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._elementCardTitle.textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    //  обработчики
    this._cardLike.addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element.querySelector(".element__trash").addEventListener("click", () => {
        this._element.remove();
      });
    this._cardImage.addEventListener("click", () => {
      this._handleImagePopup({text: this._text, image: this._image});
      });
  }

  _handleLikeClick() {
    this._cardLike.classList.toggle("element__card-like_active");
  }
}
