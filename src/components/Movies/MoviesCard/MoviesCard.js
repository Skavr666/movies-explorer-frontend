import defaultImage from '../../../images/movie.png';
import React, { useState } from 'react';

function MoviesCard({ name, image, trailerLink, duration, onSave, savedMovie, movieId, onDelete, inSaveMovies, toDelete }) {
   const [isSaved, setisSaved] = useState(false);

  const movieButtonClasses = (
    `movie__button ${isSaved ? 'movie__button_saved' : ''} ${toDelete ? 'movie__button_delete' : ''}`
  );

  const movieButtonText = (
    `${toDelete ? '' : `${isSaved ? '' : 'Сохранить'}`}`
  );

  React.useEffect(() => {
    if (savedMovie) {
      const result = savedMovie.some((item) => (movieId) === item.movieId)
      setisSaved(result)
    }
  }, [savedMovie]);

  return (
    <div className="movie">
      <div className='movie__header'>
        <h2 className="movie__name">{name}</h2>
        <p className="movie__length">{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</p>
      </div>
      <a href={trailerLink || '/notfound'} target="_blank" rel='noreferrer'>
        <img className="movie__image" src={image || defaultImage} alt={name} />
      </a>
      <button onClick={inSaveMovies ? onDelete : !isSaved ? onSave : onDelete} type='button' className={movieButtonClasses}>{movieButtonText}</button>
    </div>
  )
}

export default MoviesCard;