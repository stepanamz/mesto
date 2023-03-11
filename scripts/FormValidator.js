const enableValidationList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-name',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__form-name_type_error',
  errorClass: 'popup__form-error'
};



class FormValidator{
  constructor(lists){
    this._ValidLists = lists;
  }


  _isValid(_formElement, _inputElement, _Lists) {
    if (!_inputElement.validity.valid) {
      // showInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(_formElement, _inputElement, _inputElement.validationMessage, _Lists);
    } else {
      // hideInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(_formElement, _inputElement, _Lists);
    }
  };

  _showInputError(_formElement, _inputElement, _errorMessage, _Lists) {
    // Находим элемент ошибки внутри самой функции
    const _errorElement = _formElement.querySelector(`.${_inputElement.id}-error`);

    _inputElement.classList.add(_Lists.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(_Lists.errorClass);
  };

  _hideInputError (_formElement, _inputElement, _Lists) {
    // Находим элемент ошибки
    const _errorElement = _formElement.querySelector(`.${_inputElement.id}-error`);

    _inputElement.classList.remove(_Lists.inputErrorClass);
    _errorElement.classList.remove(_Lists.errorClass);
    _errorElement.textContent = '';
  };


  _setEventListeners (_formElement, _Lists) {
    // Найдём все поля формы и сделаем из них массив
    const _inputList = Array.from(_formElement.querySelectorAll(_Lists.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const _buttonElement = _formElement.querySelector(_Lists.submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(_inputList, _buttonElement, _Lists);
    // Обойдём все элементы полученной коллекции
    _inputList.forEach((_inputElement) => {
          // каждому полю добавим обработчик события input
          _inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
        this._isValid(_formElement, _inputElement, _Lists);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(_inputList, _buttonElement, _Lists);
      });
    });
  };


   enableValidation () {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const _formList = Array.from(document.querySelectorAll(this._ValidLists.formSelector));

    // Переберём полученную коллекцию
    _formList.forEach((_formElement) => {
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      this._setEventListeners(_formElement, this._ValidLists);
    });
  };



  // Функция принимает массив полей
  _hasInvalidInput (_inputList) {
    // проходим по этому массиву методом some
    return _inputList.some((_inputElement) => {
      // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true

      return !_inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState (_inputList, _buttonElement, _Lists) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(_inputList)) {
      // сделай кнопку неактивной
      _buttonElement.setAttribute('disabled', true);
      _buttonElement.classList.add(_Lists.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      _buttonElement.classList.remove(_Lists.inactiveButtonClass);
      _buttonElement.removeAttribute('disabled');
    }
  };
}

const validate = new FormValidator(enableValidationList)
validate.enableValidation()


