
export default class Card{
  constructor(data, templateSelector){
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    // вернём DOM-элемент карточки
      return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners();  // обработчик лайка и мусорки
    // Добавим данные
    this._element.querySelector('.element__card-image').src = this._image;
    this._element.querySelector('.element__card-image').alt = this._text;
    this._element.querySelector('.element__card-title').textContent = this._text;

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() { //  обработчики
    this._element.querySelector('.element__card-like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.element__card-image').addEventListener('click', () => {
      this._openPopupImage();
      const popupImageImg = document.querySelector('.popup__image');
      popupImageImg.src = this._image;
      popupImageImg.alt = this._text;
      document.querySelector('.popup__image-title').textContent = this._text;
    });
  }


  _handleLikeClick() {
    this._element.querySelector('.element__card-like').classList.toggle('element__card-like_active');
  }

  _openPopupImage(){
    document.querySelector('.popup_type_image').classList.add('popup_opened')
  }



  _closePopup() {  // выкл - попапа

    document.querySelector('.popup_type_image').classList.remove('popup_opened');
  }

}

