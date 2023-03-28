export const buttonEditProfile = document.querySelector(".profile__info-edit-button");
export const popupProfile = document.querySelector(".popup_type_profile");
export const buttonClosePopupProfile = popupProfile.querySelector(".popup__close");
// Находим форму в DOM
export const formEditProfile = popupProfile.querySelector(".popup__form");
export const nameInput = formEditProfile.querySelector('input[name="name"]');
export const jobInput = formEditProfile.querySelector('input[name="subname"]');

export const profileName = document.querySelector(".profile__info-name");
export const profileJob = document.querySelector(".profile__info-subname");

export const cardTemplate = document.querySelector(".template-card").content.querySelector(".element"); // Шаблон карточки
export const cardElements = document.querySelector(".elements"); // секция куда будем вставлять карточки

export const popupMesto = document.querySelector(".popup_type_mesto");
export const nameImageInput = popupMesto.querySelector('input[name="nameImage"]');
export const linkImageInput = popupMesto.querySelector('input[name="linkImage"]');
export const popupMestoClose = popupMesto.querySelector(".popup__close");
export const formElementMesto = popupMesto.querySelector(".popup__form");

export const buttonMestoAdd = document.querySelector(".profile__button");

export const popupImage = document.querySelector(".popup_type_image");
export const popupImageImg = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");

export const initialCards = [
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

export const cardData = {
  name: nameImageInput.value,
  link: linkImageInput.value,
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-name",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup__form-name_type_error",
  errorClass: "popup__form-error",
};
