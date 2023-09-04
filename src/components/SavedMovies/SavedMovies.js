import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import React, { useState} from 'react';
import moviesApi from '../../utils/moviesApi';

function SavedMovies() {
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || [];
    return data;
  });

  const [result, setResult] = useState(savedMovie);

  const handleSearch = (query = '', shortMovieState) => {
    const filtered = savedMovie.filter((movie) => {
      const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
      const isShort = movie.duration <= 40;
      if (shortMovieState) {
        return isIncluded && isShort;
      } else {
        return isIncluded;
      }
    })
    setResult(filtered);
  };

  function handleMovieDelete(movie) {
    const movieId = savedMovie.find((item) => (movie.movieId) === item.movieId)._id;
    return moviesApi
    .handleDeleteMovie(movieId)
    .then(() => {
      const newArr = savedMovie.filter((item) => item._id !== movieId);
      setSavedMovie(newArr);
      setResult(newArr);
    })
    .catch((error) => {
      console.log(`Ошибка ${error} при попытке удаления фильма`);
    });
  };

  React.useEffect(() => {
    localStorage.setItem('savedMovie', JSON.stringify(savedMovie))
  }, [savedMovie]);

  React.useEffect(() => {
    function getUserMovie() {
      return moviesApi
      .getUserMovies()
      .then(res => setSavedMovie(res))
      .catch((error) => {
        console.log(`Ошибка ${error} при получении сохраненных фильмов`);
      });
    }
    getUserMovie();
  }, []);

  return (
    <div>
      <Header colorScheme={{ isWhite: true }} />
      <main>
        <SearchForm onSearch={handleSearch}/>
        <MoviesCardList toDelete={true} inSaveMovies={true} isNeedMoreButton={false} onDelete={handleMovieDelete} movie={result}/>
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;