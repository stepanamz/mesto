// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidationList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-name',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-name_type_error',
  errorClass: 'popup__form-error'
};
// Функция isValid  принимает formElement и inputElement,

const isValid = (formElement, inputElement, Lists) => {
  if (!inputElement.validity.valid) {
    // showInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, Lists);
  } else {
    // hideInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, Lists);
  }
};

const showInputError = (formElement, inputElement, errorMessage, Lists) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(Lists.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(Lists.errorClass);
};

const hideInputError = (formElement, inputElement, Lists) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(Lists.inputErrorClass);
  errorElement.classList.remove(Lists.errorClass);
  errorElement.textContent = '';
};


const setEventListeners = (formElement, Lists) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(Lists.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(Lists.submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, Lists);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, Lists);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, Lists);
    });
  });
};


const enableValidation = (Lists) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(Lists.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, Lists);
  });
};



// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, Lists) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(Lists.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(Lists.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

// Вызовем функцию
enableValidation(enableValidationList);


