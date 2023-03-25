import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;

  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll('.popup__form-name'));
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
