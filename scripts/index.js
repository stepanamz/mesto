const editProfile = document.querySelector('.profile__info-edit-button')
const popupProfile = document.querySelector('.popup-profile')
const closeProfile = popupProfile.querySelector('.popup__close')
// Находим форму в DOM
const formElement = popupProfile.querySelector('.popup__form')
const nameInput = formElement.querySelector('input[name="name"]')
const jobInput = formElement.querySelector('input[name="subname"]')

const profileName = document.querySelector('.profile__info-name')
const profileJob = document.querySelector('.profile__info-subname')

const cardTemplate = document.querySelector('.elements__template-card').content.querySelector('.elements__card') // Шаблон карточки
const cardElements = document.querySelector('.elements') // секция куда будем вставлять карточки

const popupMesto = document.querySelector('.popup-mesto')
const nameImageInput = popupMesto.querySelector('input[name="nameImage"]')
const linkImageInput = popupMesto.querySelector('input[name="linkImage"]')
const popupMestoClose = popupMesto.querySelector('.popup__close')
const formElementMesto = popupMesto.querySelector('.popup__form')

const buttonMestoAdd = document.querySelector('.profile__button')

const popupImage = document.querySelector('.popup-image')

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

editProfile.addEventListener('click',function(){

  popupProfile.classList.add('popup_opened')

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

closeProfile.addEventListener('click',function(){
  popupProfile.classList.remove('popup_opened')
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  popupProfile.classList.remove('popup_opened')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// popup MESTO

buttonMestoAdd.addEventListener('click',function(){

  popupMesto.classList.add('popup_opened')  // Открываем попап
})

popupMestoClose.addEventListener('click', function() {

  popupMesto.classList.remove('popup_opened') // закрываем попап
})

formElementMesto.addEventListener('submit', function(event){  // добавление корточек из формы
  event.preventDefault()

  const titleImage = nameImageInput.value
  const srcImage = linkImageInput.value
  const card = createdCard({name:titleImage,
                            link:srcImage}) // создаем объект из значений импутов и передаем его в функцию


  cardElements.prepend(card) // добавляем карточку в начало
  popupMesto.classList.remove('popup_opened') // закрываем попап

  nameImageInput.value = ''
  linkImageInput.value = ''
})


function renderCards() {  // функция добавл карточек на страницу заполение секции карточек из массива

  const cards = initialCards.map(function(item) {  // все карточки сохранились в cards

    return createdCard(item)
  })

  cardElements.prepend(...cards)  // в начало секции добавляем все созданные карточки
}

renderCards()

function createdCard(item) {  // создание карточек

  const card = cardTemplate.cloneNode(true)  // копируем содержимое шаблона карточки

  card.querySelector('.elements__card-image').src = item.link  // ищем src и присваеваем ему объект с link
  card.querySelector('.elements__card-image').alt = item.name  // ищем alt и присваеваем ему объект с name
  card.querySelector('.elements__card-title').textContent = item.name // ищем title карточки и присваеваем ему объект с name

  card.querySelector('.elements__card-like').addEventListener('click',function(){
    card.querySelector('.elements__card-like').classList.toggle('elements__card-like_active') // лайки
  })

  card.querySelector('.elements__trash').addEventListener('click',function(){ // удаление карточки
    card.remove()
  })

  card.querySelector('.elements__card-image').addEventListener('click',function(){ // открытие попап картинки
    popupImage.classList.add('popup_opened')
    popupImage.querySelector('.popup-image__img').src = item.link
    popupImage.querySelector('.popup-image__img').alt = item.name
    popupImage.querySelector('.popup-image__title').textContent = item.name

    popupImage.querySelector('.popup__close').addEventListener('click', function(){
      popupImage.classList.remove('popup_opened')
    })
  })



  return card // возвращает карточку
}


