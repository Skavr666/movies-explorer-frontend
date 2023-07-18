import movieImage from '../../../images/movie.png';

function MoviesCard({isSaved, toDelete}) {
  const movieButtonClasses = (
    `movie__button ${isSaved ? 'movie__button_saved' : ''}`
  );

  const movieButtonText = (
    `${isSaved ? '' : 'Сохранить'}`
  );

  return (
    <div className="movie">
      <div className='movie__header'>
        <h2 className="movie__name">В погоне за Бенкси</h2>
        <p className="movie__length">27 минут</p>
      </div>
      <img className="movie__image" src={movieImage} alt="В погоне за Бенкси" />
      {toDelete ? (
        <button className='movie__button movie__button_delete'></button>
      ) : (
        <button className={movieButtonClasses}>{movieButtonText}</button>
      )}
      
    </div>
  )
}

export default MoviesCard;