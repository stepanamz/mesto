// Импорты

import './index.css'; // добавьте импорт главного файла стилей

import {buttonEditProfile, formEditProfile, nameInput, jobInput, formElementMesto, buttonMestoAdd, initialCards, validationConfig} from '../scripts/utils/constants.js';

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";

// Создание экз Класса

const validateProfile = new FormValidator(validationConfig, formEditProfile);
const validateMesto = new FormValidator(validationConfig, formElementMesto);
const popupWithImage = new PopupWithImage(".popup_type_image");
const section = new Section({ items: initialCards, renderer}, ".elements");

const renderer = (item) => {
  const cardElement = createCard(item);      // Создаём карточку и возвращаем наружу -  Добавляем в DOM
  section.addItem(cardElement);
};

const profilePopup = new PopupWithForm(".popup_type_profile", {submitHandler:(item) => userInfo.setUserInfo(item)});

const mestoPopup = new PopupWithForm(".popup_type_mesto", {
  submitHandler:(item) => {
    renderer({
      name: item.nameImage,
      link: item.linkImage,
    })
  }
});

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-subname",
});

// валидация

validateProfile.enableValidation();

validateMesto.enableValidation();

// Отображение всех элементов на странице

section.renderItems();

// Слушатели

buttonMestoAdd.addEventListener('click', function() {
  mestoPopup.open();
  validateMesto.disableSubmitButton();
  validateMesto.removeValidationErrors();
});

buttonEditProfile.addEventListener('click', (event)=>{
  const user = userInfo.getUserInfo()
  nameInput.value = user.name
  jobInput.value =  user.about
  profilePopup.open();
  validateProfile.removeValidationErrors();
})

// функция создания карточки

function createCard(item) {

  const card = new Card(item, ".template-card", {
    handleImagePopup: (item) => {
      popupWithImage.open(item.image, item.text);
    },
  });

return card
}
