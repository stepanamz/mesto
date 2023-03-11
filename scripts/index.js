import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const buttonEditProfile = document.querySelector(".profile__info-edit-button");
const popupProfile = document.querySelector(".popup_type_profile");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");
// Находим форму в DOM
const formEditProfile = popupProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector('input[name="name"]');
const jobInput = formEditProfile.querySelector('input[name="subname"]');

const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-subname");

const cardTemplate = document.querySelector(".template-card").content.querySelector(".element"); // Шаблон карточки
const cardElements = document.querySelector(".elements"); // секция куда будем вставлять карточки

const popupMesto = document.querySelector(".popup_type_mesto");
const nameImageInput = popupMesto.querySelector('input[name="nameImage"]');
const linkImageInput = popupMesto.querySelector('input[name="linkImage"]');
const popupMestoClose = popupMesto.querySelector(".popup__close");
const formElementMesto = popupMesto.querySelector(".popup__form");

const buttonMestoAdd = document.querySelector(".profile__button");

const popupImage = document.querySelector(".popup_type_image");

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-name_type_error",
  errorClass: "popup__form-error",
};



function openPopup(popup) {
  // вкл - попапа
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape); // Добавили функцию закрытия по Escape
}

function closePopup(popup) {
  // выкл - попапа

  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape); // Удалили функцию закрытия по Escape
}

buttonEditProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  validateProfile.disableSubmitButton();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function submitEditProfilePopup(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", submitEditProfilePopup);

// popup MESTO

buttonMestoAdd.addEventListener("click", function () {
  openPopup(popupMesto); // Открываем попап
  validateMesto.disableSubmitButton();
});

popupMestoClose.addEventListener("click", function () {
  closePopup(popupMesto); // закрываем попап
});

formElementMesto.addEventListener("submit", function (event) {
  // добавление корточек из формы
  event.preventDefault();

  const titleImage = nameImageInput.value;
  const srcImage = linkImageInput.value;
  createCard({ name: titleImage, link: srcImage })

  closePopup(popupMesto); // закрываем попап
  formElementMesto.reset();
});

popupImage
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    // закрываем попап картинки
    closePopup(popupImage);
  });

// закрытие попапа НЕ крестик

const popupsWindow = Array.from(document.querySelectorAll(".popup"));

popupsWindow.forEach((popupWindowElement) => {
  popupWindowElement.addEventListener("click", function (event) {
    // закрытие по оверлею
    if (event.target === event.currentTarget) {
      closePopup(popupWindowElement);
    }
  });
});

function closeByEscape(evt) {
  // функция закрытия по Escape
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

initialCards.forEach((item) => {
    createCard(item)
});

function createCard(item) {
    // Создадим экземпляр карточки
    const card = new Card(item, ".template-card");
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
    // Добавляем в DOM
    cardElements.prepend(cardElement);
}

// валидация
const validateProfile = new FormValidator(validationConfig, formEditProfile);
validateProfile.enableValidation();

const validateMesto = new FormValidator(validationConfig, formElementMesto);
validateMesto.enableValidation();


