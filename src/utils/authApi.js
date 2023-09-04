class AuthApi {
  constructor(config) {
    this._url = config.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`)
  }

  getUserData(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
    .then((res) => this._handleResponse(res));
  }

  handleSignUp(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password
      })
    })
    .then((res) => this._handleResponse(res));
  }

  handleSignIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => this._handleResponse(res));
  }

  handleEditUserData(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
      })
    })
    .then((res) => this._handleResponse(res));
  }
}

const authApi = new AuthApi({
  url: 'https://api.skavr.nomoredomains.rocks',
})

export default authApi;