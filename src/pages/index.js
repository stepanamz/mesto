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

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-subname",
});

buttonEditProfile.addEventListener('click', (event)=>{
  const user = userInfo.getUserInfo()
  nameInput.value = user.name
  jobInput.value =  user.about
  profilePopup.open();
  validateProfile.removeValidationErrors();
})


function createCard(item) {  // функция создания карточки

  const card = new Card(item, ".template-card", {
    handleImagePopup: (item) => {
      popupWithImage.open(item.image, item.text);
    },
  });

return card.generateCard();
}
