class MoviesApi {
  constructor(config) {
    this._url = config.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`)
  }

  getBeatFilmsMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
    })
    .then((res) => this._handleResponse(res));
  }

  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((res) => this._handleResponse(res));
  }

  handleSaveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: `${movie.id}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    })
    .then((res) => this._handleResponse(res));
  }

  handleDeleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then((res) => this._handleResponse(res));
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.skavr.nomoredomains.rocks',
})

export default moviesApi;