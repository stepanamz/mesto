let editProfile = document.querySelector('.profile__info-edit-button')
let popupProfile = document.querySelector('.popup-profile')
let closeProfile = popupProfile.querySelector('.popup-profile__close')
// Находим форму в DOM
let formElement = popupProfile.querySelector('.popup-profile__form')
let nameInput = formElement.querySelector('input[name="name"]')
let jobInput = formElement.querySelector('input[name="subname"]')

let profileName = document.querySelector('.profile__info-name')
let profileJob = document.querySelector('.profile__info-subname')

editProfile.addEventListener('click',function(){
  popupProfile.classList.add('popup-profile_opened')

  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

closeProfile.addEventListener('click',function(){
  popupProfile.classList.remove('popup-profile_opened')
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Выберите элементы, куда должны быть вставлены значения полей


  // Вставьте новые значения с помощью textContent

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  popupProfile.classList.remove('popup-profile_opened')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
