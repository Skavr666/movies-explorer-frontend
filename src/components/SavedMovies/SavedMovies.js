import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';

function SavedMovies() {
  return (
    <div>
      <Header colorScheme={{ isWhite: true }} />
      <main>
        <SearchForm />
        <MoviesCardList toDelete={true} />
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;