import Header from '../Header/Header.js';
import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import LoadMore from '../Movies/LoadMore/LoadMore.js';
import Footer from '../Footer/Footer.js';

function Movies() {
  return (
    <div>
      <Header colorScheme={{ isWhite: true }} />
      <SearchForm />
      <MoviesCardList />
      <LoadMore />
      <Footer />
    </div>
  )
}

export default Movies;