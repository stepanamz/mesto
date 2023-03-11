import Card from './Card.js';


const buttonEditProfile = document.querySelector('.profile__info-edit-button')
const popupProfile = document.querySelector('.popup_type_profile')
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close')
// Находим форму в DOM
const formElement = popupProfile.querySelector('.popup__form')
const nameInput = formElement.querySelector('input[name="name"]')
const jobInput = formElement.querySelector('input[name="subname"]')

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-subname')

const cardTemplate = document.querySelector('.template-card').content.querySelector('.element') // Шаблон карточки
const cardElements = document.querySelector('.elements') // секция куда будем вставлять карточки

const popupMesto = document.querySelector('.popup_type_mesto')
const nameImageInput = popupMesto.querySelector('input[name="nameImage"]')
const linkImageInput = popupMesto.querySelector('input[name="linkImage"]')
const popupMestoClose = popupMesto.querySelector('.popup__close')
const formElementMesto = popupMesto.querySelector('.popup__form')

const buttonMestoAdd = document.querySelector('.profile__button')

const popupImage = document.querySelector('.popup_type_image')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openBigPopup(popup) {  // вкл - попапа с кнопкой
   const popupButton = popup.querySelector('.popup__form-button')
   popupButton.setAttribute('disabled', true)
   popupButton.classList.add('popup__form-button_inactive')
   openPopup(popup)
}

function openPopup(popup) {  // вкл - попапа
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape);   // Добавили функцию закрытия по Escape
}


function closePopup(popup) {  // выкл - попапа

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);  // Удалили функцию закрытия по Escape
}

buttonEditProfile.addEventListener('click',function(){

  openBigPopup(popupProfile)

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})



buttonClosePopupProfile.addEventListener('click',function(){
  closePopup(popupProfile)
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// popup MESTO

buttonMestoAdd.addEventListener('click',function(){

  openBigPopup(popupMesto)  // Открываем попап
})

popupMestoClose.addEventListener('click', function() {

  closePopup(popupMesto) // закрываем попап
})

formElementMesto.addEventListener('submit', function(event){  // добавление корточек из формы
  event.preventDefault()

  const titleImage = nameImageInput.value
  const srcImage = linkImageInput.value
  const card = new Card({ name: titleImage,link: srcImage}, '.template-card');

  const cardElement = card.generateCard();
                  // Добавляем в DOM
  document.querySelector('.elements').prepend(cardElement);

  closePopup(popupMesto) // закрываем попап
  formElementMesto.reset();
})



popupImage.querySelector('.popup__close').addEventListener('click', function(){ // закрываем попап картинки
  closePopup(popupImage)

})

// закрытие попапа НЕ крестик

const popupWindow = Array.from(document.querySelectorAll('.popup'))

popupWindow.forEach((popupWindowElement) => {
  popupWindowElement.addEventListener('click',function(event){  // закрытие по оверлею
    if (event.target === event.currentTarget) {
      closePopup(popupWindowElement)
    }

  })

});


function closeByEscape(evt) {   // функция закрытия по Escape
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
    }
  }

  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item, '.template-card');
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements').append(cardElement);


  });

