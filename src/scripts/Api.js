export default class Api {

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getUserInfo() {  // данные текущего пользователя
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }


  setUserInfo({name, job}) {  // новые имя и профессию текущего пользователя
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }


  changeAvatar(link) { // новый аватар пользователя
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }


  getInitialCards() { //исходные карточки для отрисовки
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }

  addNewCard({name, link}) { // Добавляет новую карточку
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }


  deleteCard(cardId) {  // Удаляет карточку с сервера
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return Promise.resolve();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    });
  }


  _setLike(cardId) {  // лайк на карточку
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    })
    .then(res => {
      return res.likes;
    });
  }

  _deleteLike(cardId) {  // Удаляет лайк с карточки
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json()
      .then(res => {
        throw new Error(res.message);
      });
    })
    .then(res => {
      return res.likes;
    });
  }


  toggleLike(cardId, isLiked) {  // Переключает лайк карточки
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }
}
