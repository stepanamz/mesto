let editProfile = document.querySelector('.profile__info-edit-button')
let popupProfile = document.querySelector('.popup')
let closeProfile = popupProfile.querySelector('.popup__close')
// Находим форму в DOM
let formElement = popupProfile.querySelector('.popup__form')
let nameInput = formElement.querySelector('input[name="name"]')
let jobInput = formElement.querySelector('input[name="subname"]')

let profileName = document.querySelector('.profile__info-name')
let profileJob = document.querySelector('.profile__info-subname')
console.log(popupProfile)
editProfile.addEventListener('click',function(){

  popupProfile.classList.add('popup_opened')
  console.log('тык')
  console.log(popupProfile)
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
