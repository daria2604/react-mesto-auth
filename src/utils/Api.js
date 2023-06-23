class Api {
  #baseUrl
  #headers

  constructor(options) {
    this.#baseUrl = options.baseUrl
    this.#headers = options.headers
  }

  #checkResponse(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  #request(endpoint, options) {
    return fetch(this.#baseUrl + endpoint, options).then(this.#checkResponse)
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getInitialCards() {
    return this.#request('/cards', {
      headers: this.#headers
    })
  }

  getUserInfo() {
    return this.#request('/users/me', {
      headers: this.#headers
    })
  }

  updateUserInfo({ name, about }) {
    return this.#request('/users/me', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCard({ title, link }) {
    return this.#request('/cards', {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
  }

  updateAvatar(data) {
    return this.#request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  deleteCard(cardId) {
    return this.#request('/cards/' + cardId, {
      method: 'DELETE',
      headers: this.#headers
    })
  }

  likeCard(cardId) {
    return this.#request('/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this.#headers
    })
  }

  unlikeCard(cardId) {
    return this.#request('/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this.#headers
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '65b7fcf6-b316-4d1e-9510-010044d65d75',
    'Content-Type': 'application/json'
  }
})

export default api;

