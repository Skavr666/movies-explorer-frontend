import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import LoadButton from '../Movies/LoadButton/LoadButton.js';
import Footer from '../Footer/Footer.js';

function Movies() {
  return (
    <div>
      <Header colorScheme={{ isWhite: true }} />
      <main>
        <SearchForm />
        <MoviesCardList />
        <LoadButton />
      </main>
      <Footer />
    </div>
  )
}

export default Movies;