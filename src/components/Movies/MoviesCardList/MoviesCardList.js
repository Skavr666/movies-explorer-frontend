import MoviesCard from '../MoviesCard/MoviesCard';
import LoadButton from '../LoadButton/LoadButton.js';
import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movie, onSave, savedMovie, onDelete, toDelete }) {
  const location = useLocation();
  
  const [movieToRender, setMovieToRender] = useState(9);
  const inSaveMovies = location.pathname === '/saved-movies';
  const showMoreButton = !inSaveMovies;
  const screenWidth = window.innerWidth;
  const renderedMovies = movie.slice(0, movieToRender);
  const toRender = inSaveMovies? movie : renderedMovies;
  
  const handleExtraLoad = () => {
    if (screenWidth < 1280) {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 4);
    } else {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 9);
    }
  };

  React.useEffect(() => {
    if (screenWidth < 1280) {
      setMovieToRender(8);
    }
  }, [screenWidth]);

  return (
  <>
    <section className="movies">
        {toRender.map((item) => {
          return <div key={inSaveMovies ? item._id : item.id}>
            <MoviesCard
              inSaveMovies={inSaveMovies}
              key={inSaveMovies ? item._id : item.id}
              onSave={() => { onSave(item) }}
              onDelete={() => { onDelete(item) }}
              name={item.nameRU}
              image={inSaveMovies ? item.image : `https://api.nomoreparties.co${item.image.url}`}
              trailerLink={item.trailerLink}
              duration={item.duration}
              movieId={item.id}
              savedMovie={savedMovie}
              toDelete={toDelete}
            /></div>
        })}
    </section>
    {!toDelete ?
    <>
    {showMoreButton ? movie.length > movieToRender && (
      <>
        <LoadButton onClick={handleExtraLoad}/>
      </>)
      :
      <>
        <LoadButton onClick={handleExtraLoad}/>  
      </>
    }
    </>
    : ''}
  </>
  );
}

export default MoviesCardList;