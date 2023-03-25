import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__info-edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");
// Находим форму в DOM
const formEditProfile = popupProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="subname"]');

const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-subname");

const cardTemplate = document
  .querySelector(".template-card")
  .content.querySelector(".element"); // Шаблон карточки
const cardElements = document.querySelector(".elements"); // секция куда будем вставлять карточки

const popupMesto = document.querySelector(".popup_type_mesto");
const nameImageInput = popupMesto.querySelector('input[name="nameImage"]');
const linkImageInput = popupMesto.querySelector('input[name="linkImage"]');
const popupMestoClose = popupMesto.querySelector(".popup__close");
const formElementMesto = popupMesto.querySelector(".popup__form");

const buttonMestoAdd = document.querySelector(".profile__button");

const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardData = {
  name: nameImageInput.value,
  link: linkImageInput.value,
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-name_type_error",
  errorClass: "popup__form-error",
};

// function openPopup(popup) {
//   // вкл - попапа
//   // popup.classList.add("popup_opened");
//   // document.addEventListener("keydown", closeByEscape); // Добавили слушатель и функцию закрытия по Escape
//   classPopup.open();
// }

// function closePopup(popup) {
//   // выкл - попапа
//   classPopup.setEventListeners();
//   // popup.classList.remove("popup_opened");
//   // document.removeEventListener("keydown", closeByEscape); // Удалили функцию закрытия по Escape
// }

/*
buttonEditProfile.addEventListener("click", function () {
  profilePopup.open();
  validateProfile.disableSubmitButton();
  validateProfile.removeValidationErrors();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonClosePopupProfile.addEventListener("click", function () {
  profilePopup.setEventListeners();
});

// Обработчик «отправки» формы
function submitEditProfilePopup(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profilePopup.setEventListeners();
  profilePopup.close();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", submitEditProfilePopup);

// popup MESTO

buttonMestoAdd.addEventListener("click", function () {
  formElementMesto.reset();
  mestoPopup.open();
  validateMesto.disableSubmitButton();
  validateMesto.removeValidationErrors();
});

popupMestoClose.addEventListener("click", function () {
  mestoPopup.setEventListeners(); // закрываем попап
});

formElementMesto.addEventListener("submit", function (event) {
  // добавление корточек из формы
  event.preventDefault();

  const titleImage = nameImageInput.value;
  const srcImage = linkImageInput.value;
  createCard({ name: titleImage, link: srcImage })

  mestoPopup.setEventListeners(); // закрываем попап
  mestoPopup.close();
  formElementMesto.reset();
});

popupImage.querySelector(".popup__close").addEventListener("click", function () {
    // закрываем попап картинки
    imagePopup.setEventListeners();
  });

// закрытие попапа НЕ крестик

// const popupsWindow = Array.from(document.querySelectorAll(".popup"));

// popupsWindow.forEach((popupWindowElement) => {
//   popupWindowElement.addEventListener("click", function (event) {
//     // закрытие по оверлею
//     if (event.target === event.currentTarget) {
//       closePopup(popupWindowElement);
//     }
//   });
// });

// function closeByEscape(evt) {
//   // функция закрытия по Escape
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// initialCards.forEach((item) => {
//     createCard(item)
// });


function createCard(item) {
    // Создадим экземпляр карточки
    const card = new Card(item, ".template-card", openPopupImage);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    cardElements.prepend(cardElement);
}


 */
// функция открытия картинки
function openPopupImage() {
  const popupWithImage = new PopupWithImage(".popup_type_image");
  popupWithImage.open(image, text);
}

// валидация
const validateProfile = new FormValidator(validationConfig, formEditProfile);
validateProfile.enableValidation();

const validateMesto = new FormValidator(validationConfig, formElementMesto);
validateMesto.enableValidation();

// Создаем экземпляр класса Section

// Вынесли Renderer из создания класса, он понадобится еще и для отрисовки новых карточек
const renderer = (item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, ".template-card", {
    handleImagePopup: (item) => {
      const popupWithImage = new PopupWithImage(".popup_type_image");
      popupWithImage.open(item.image, item.text);
    },
  });
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardElements.prepend(cardElement);
};



const section = new Section({ items: initialCards, renderer}, ".elements");
section.renderItems();

// function submitHandler(formData) {
//   // обработка данных формы
//   console.log(formData);
// }


const profilePopup = new PopupWithForm(".popup_type_profile", {submitHandler:(item) => userInfo.setUserInfo(item)}); // вместо этого new PopupWithForm. Здесь устанавливаем новые данные пользователя.
//Потом навесить открытие этого класса на нужную кнопку, и в этой же функции прописать внесение данных профиля в инпуты

const mestoPopup = new PopupWithForm(".popup_type_mesto", {submitHandler:(item) => renderer(item)}); // вместо этого new PopupWithForm. Здесь как раз используем renderer еще раз.
// Потом навесить открытие этого класса на нужную кнопку
mestoPopup.setEventListeners();

buttonMestoAdd.addEventListener('click', function() {
  mestoPopup.open();
  validateMesto.removeValidationErrors();
});



// Создаем экземпляр класса UserInfo

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-subname",
});

// Устанавливаем новые данные пользователя
userInfo.setUserInfo({
  name: nameImageInput.value,
  about: linkImageInput.value,
}); // Присваивать значения не нужно, эта функция должна брать значения из инпутов формы

// Сброс ошибок форм тоже вписать в функции слушателей открытия форм

buttonEditProfile.addEventListener('click', (event)=>{
  const user = userInfo.getUserInfo()
  nameInput.value = user.name
  jobInput.value =  user.about
  profilePopup.open();
  validateProfile.removeValidationErrors();
})
