import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Auth/Register/Register.js';
import Login from '../Auth/Login/Login.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import authApi from '../../utils/authApi.js';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function handleGetUserData() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return authApi
        .getUserData(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser({
            ...currentUser,
            ...res
          });
        })
        .then(() => {
          navigate(location, { replace: true });
        })
        .catch((error) => {
          console.log(`Ошибка ${error} при получении данных пользователя`);
        });
    }
  };

  function onSignUp(name, email, password) {
    return authApi
      .handleSignUp(name, email, password)
      .then(() => {
        navigate("/signin");
      })
  };

  function onSignIn(email, password) {
    return authApi
      .handleSignIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        navigate("/movies");
        return authApi
          .getUserData(res.token)
          .then((res) => {
            setCurrentUser({
              ...currentUser,
              ...res
            });
          })
      })
  };

  function onEditUserData(name, email) {
    return authApi
      .handleEditUserData(name, email)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          ...res
        })
      })
  };

  React.useEffect(() => {
    handleGetUserData();
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main isLoggedIn={isLoggedIn}/>} />
          <Route path='/movies' element={<ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />} />
          <Route path='/saved-movies' element={<ProtectedRoute isLoggedIn={isLoggedIn} element={SavedMovies} isloggedIn={isLoggedIn} />} />
          <Route path='/profile' element={<ProtectedRoute isLoggedIn={isLoggedIn} element={Profile} onEdit={onEditUserData} onSetIsLoggedIn={() => { setIsLoggedIn(false) }} />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <Register onSignUp={onSignUp} />} />
          <Route path='/signin' element={isLoggedIn ? <Navigate to='/' /> : <Login onSignIn={onSignIn} />} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
