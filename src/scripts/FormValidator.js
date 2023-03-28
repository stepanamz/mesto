export default class FormValidator {
  constructor(lists, formElement) {
    this._validationConfig = lists;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
  }

  _isValid(_formElement, _inputElement, _Lists) {
    if (!_inputElement.validity.valid) {
      // showInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(
        _formElement,
        _inputElement,
        _inputElement.validationMessage,
        _Lists
      );
    } else {
      // hideInputError  получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._hideInputError(_formElement, _inputElement, _Lists);
    }
  }

  _showInputError(_formElement, _inputElement, _errorMessage, _Lists) {
    // Находим элемент ошибки внутри самой функции
    const _errorElement = _formElement.querySelector(
      `.${_inputElement.id}-error`
    );

    _inputElement.classList.add(_Lists.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(_Lists.errorClass);
  }

  _hideInputError(_formElement, _inputElement, _Lists) {
    // Находим элемент ошибки
    const _errorElement = _formElement.querySelector(
      `.${_inputElement.id}-error`
    );

    _inputElement.classList.remove(_Lists.inputErrorClass);
    _errorElement.classList.remove(_Lists.errorClass);
    _errorElement.textContent = "";
  }

  _setEventListeners(_formElement, _Lists) {
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._toggleButtonState(this._inputList, _Lists);
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((_inputElement) => {
      // каждому полю добавим обработчик события input
      _inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
        this._isValid(_formElement, _inputElement, _Lists);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(this._inputList, _Lists);
      });
    });
  }

  enableValidation() {
    // Для  формы вызовем функцию setEventListeners, передав ей элемент формы
    this._setEventListeners(this._formElement, this._validationConfig);
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.disableSubmitButton();
    });
  }

  // Функция принимает массив полей
  _hasInvalidInput(_inputList) {
    // проходим по этому массиву методом some
    return _inputList.some((_inputElement) => {
      // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true

      return !_inputElement.validity.valid;
    });
  }

  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(_inputList, _Lists) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(_inputList)) {
      // сделай кнопку неактивной
      this.disableSubmitButton();
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(_Lists.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(
      this._validationConfig.inactiveButtonClass
    );
  }

  removeValidationErrors() {
    // управляем кнопкой
    this._toggleButtonState(this._inputList, this._validationConfig);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(
        this._formElement,
        inputElement,
        this._validationConfig
      );
    });
  }
}
