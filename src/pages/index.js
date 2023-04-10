// Импорты

import './index.css'; // добавьте импорт главного файла стилей

import {buttonEditProfile, formEditProfile, popupProfile, nameInput, jobInput, formElementMesto, buttonMestoAdd, initialCards, validationConfig} from '../utils/constants.js';

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import {apiConfig} from '../utils/apiConfig.js';
import Api from '../scripts/Api';

// валидация
const validateProfile = new FormValidator(validationConfig, formEditProfile);
validateProfile.enableValidation();

const validateMesto = new FormValidator(validationConfig, formElementMesto);
validateMesto.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_image");

// Создаем экземпляр класса Section
const renderer = (item) => {

  // Создаём карточку и возвращаем наружу
  const cardElement = createCard(item);
  // Добавляем в DOM
  section.addItem(cardElement);
};



const profilePopup = new PopupWithForm(".popup_type_profile", {submitHandler:(item) => userInfo.setUserInfo(item)});

const mestoPopup = new PopupWithForm(".popup_type_mesto", {
  submitHandler:(item) => {
    api.addNewCard({name: item.nameImage, link: item.linkImage})
  .then((addedCard) => {
        renderer(addedCard);
        mestoPopup.close();
      })
  .catch(err => console.log(`Ошибка добавление карточки: ${err}`));
  }
});

buttonMestoAdd.addEventListener('click', function() {

  mestoPopup.open();
  validateMesto.disableSubmitButton();
  validateMesto.removeValidationErrors();
});

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-subname",
  imageSelector: ".profile__avatar"
});

profilePopup.setEventListeners({
  submitHandler: (data) => {
    api.updateUserInfo(data)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}`);
      });
  }
});




function createCard(item) {  // функция создания карточки

  const card = new Card(item, ".template-card", {
    handleImagePopup: (item) => {
      popupWithImage.open(item.image, item.text);
    },
  });

return card.generateCard();
}

// API

const api = new Api(apiConfig);

// const user = api.getUserInfo()
//   user.then(data => {
//     console.log(data)
//   })

  // Карточки на странце из api
let section
const apiCards = api.getInitialCards()
  apiCards.then(card => {
    section = new Section({ items: card, renderer}, ".elements", api);

    section.renderItems();
  })
  .catch(err => {
    alert(err)
  })
