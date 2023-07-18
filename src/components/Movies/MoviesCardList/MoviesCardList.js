import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList({toDelete}) {
  return (
    <section className="movies">
      {toDelete ? (
        <>
          <MoviesCard toDelete={toDelete}/>
          <MoviesCard toDelete={toDelete}/>
          <MoviesCard toDelete={toDelete}/>
        </>
      ) : (
        <>
          <MoviesCard />
          <MoviesCard isSaved={true}/>
          <MoviesCard />
          <MoviesCard isSaved={true}/>
          <MoviesCard />
          <MoviesCard isSaved={true}/>
        </>
      )}
      
    </section>
  )
}

export default MoviesCardList;