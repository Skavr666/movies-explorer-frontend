import React, { useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import moviesApi from '../../utils/moviesApi';

function Movies() {
  const [beatMovie, setBeatMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('beatMovie')) || [];
    return data;
  });

  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || [];
    return data;
  });

  const [resultSearch, setResulstSearch] = useState(() => {
    const data = JSON.parse(localStorage.getItem('result')) || [];
    return data;
  })

  const [isNothingToSee, setIsNothingToSee] = useState(false);
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);

  function getMovies() {
    return moviesApi
    .getBeatFilmsMovies()
    .then((res) => {
      localStorage.setItem('beatMovie', JSON.stringify(res));
      setBeatMovie(res);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при получении фильмов с сервера`);
    });
  }

  function getUserMovies() {
    return moviesApi
    .getUserMovies()
    .then(res => setSavedMovie(res))
    .catch((error) => {
      console.log(`Ошибка ${error} при получении сохраненных фильмов`);
    });
  }

  function handleSaveMovie(movie) {
    return moviesApi
    .handleSaveMovie(movie)
    .then(res => {
      setSavedMovie(prev => [...prev, res]);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при сохранении фильма`);
    });
  }

  function handleDeleteMovie(movie) {
    const movieId = savedMovie.find((item) => (movie.id) === item.movieId)._id;
    return moviesApi
    .handleDeleteMovie(movieId)
    .then(() => {
      const newArr = savedMovie.filter((item) => item._id !== movieId)
      setSavedMovie(newArr);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при попытке удаления фильма`);
    });
  }

  function handleSubmit(query, shortMovieState) {
    if (query.length === 0) {
      setIsEmptyQuery(true)
    } else {
      setIsEmptyQuery(false)
      const filtered = beatMovie.filter((movie) => {
        const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
        const isShort = movie.duration <= 40;
        if (shortMovieState) {
          return isIncluded && isShort;
        } else {
          return isIncluded;
        }
      });

      setIsNothingToSee(filtered.length === 0)

      localStorage.setItem('result', JSON.stringify(filtered));
      setResulstSearch(filtered);
    }
  }

  React.useEffect(() => {
    getMovies();
    getUserMovies();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('savedMovie', JSON.stringify(savedMovie))
  }, [savedMovie]);
  
  return (
    <div>
      <Header colorScheme={{ isWhite: true }} />
      <main>
        <SearchForm onSearch={handleSubmit} />
        {!isEmptyQuery && !isNothingToSee && <MoviesCardList onDelete={handleDeleteMovie} onSave={handleSaveMovie} movie={resultSearch} savedMovie={savedMovie} />}
        {isNothingToSee && <p className='search-form__tooltip'>Такого нет 😞</p>}
      </main>
      <Footer />
    </div>
  )
}

export default Movies;