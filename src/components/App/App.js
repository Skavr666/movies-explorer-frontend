import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Auth/Register/Register.js';
import Login from '../Auth/Login/Login.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';

function App() {
  const [ currentUser, setCurrentUser ] = useState({
    name: 'user',
    email: 'skavr777@yandex.ru',
    loggedIn: false,
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/saved-movies' element={<SavedMovies/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/signin' element={<Login/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
