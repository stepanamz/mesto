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
import Api from "../scripts/Api.js"

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

const section = new Section({ items: initialCards, renderer}, ".elements");

section.renderItems();

const profilePopup = new PopupWithForm(".popup_type_profile", {submitHandler:(item) => userInfo.setUserInfo(item)});

const mestoPopup = new PopupWithForm(".popup_type_mesto", {
  submitHandler:(item) => {
    renderer({
      name: item.nameImage,
      link: item.linkImage,
    })
  }
});

buttonMestoAdd.addEventListener('click', function() {

  mestoPopup.open();
  validateMesto.disableSubmitButton();
  validateMesto.removeValidationErrors();
});


// кнопка редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  api.getUserInfo()
    .then((userData) => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
      profilePopup.open();
      validateProfile.removeValidationErrors();
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных пользователя: ${err}`);
    });
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


// создаём экземпляр класса Api

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '7fac089b-5548-4e87-af58-0cf3b47eea4b',
    'Content-Type': 'application/json'
  }
});

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-subname",
  avatarSelector: ".profile__avatar"
});

// Получаем информацию о пользователе с сервера и обновляем соответствующие элементы на странице
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(`Ошибка: ${err}`));
