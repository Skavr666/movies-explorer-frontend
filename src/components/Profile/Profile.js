import Header from '../Header/Header.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

function Profile({ onEdit, onSetIsLoggedIn }) {
  const navigate = useNavigate();
  const userData = useContext(CurrentUserContext);

  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSameData, setIsSameData] = useState(true);
  const [tooltip, setTooltip] = useState('');
  const [isGreenTooltip, setIsGreenTooltip] = useState(false);

  const disabledSubmiter = nameValid && emailValid;
  const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/;
  const isEmailValid = regexEmail.test(email);

  function handleEditName(e) {
    setName(e.target.value)
    setNameError(e.target.validationMessage)
    setNameValid(e.target.validity.valid)
  }

  function handleEditEmail(e) {
    setEmail(e.target.value)
    setEmailError(e.target.validationMessage)
    setEmailValid(e.target.validity.valid)
  }

  function handleCheckOut() {
    localStorage.clear();
    onSetIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  function handleEditAccount(e) {
    e.preventDefault();
    if (name === '') return;
    if (email === '') return;

    return onEdit(name, email)
      .then(() => {
        setIsGreenTooltip(true);
        setTooltip('Данные пользователя успешно изменены');
        setIsSameData(true);
        localStorage.setItem('savedUser', JSON.stringify({ name, email }));
      })
      .catch(err => {
        setIsGreenTooltip(false);
        if (err === '409') {
          setTooltip('Этот email уже занят');
        } else {
          setTooltip('Ошибка при изменении данных');
        }
      })
  };

  const onFocus = (e) => {
    e.target.value = "";
    setTooltip('');
  };

  const onBlur = (e) => {
    e.target.value = name;
  };

  const onBlurEmail = (e) => {
    e.target.value = email;
  };

  useEffect(() => {
    const disabled = isSameData || !isEmailValid || !disabledSubmiter
    setIsButtonDisabled(disabled)
  }, [disabledSubmiter, isEmailValid, email, name, isSameData])

  useEffect(() => {
    if (userData.name === name && userData.email === email) {
      setIsSameData(true)
    } else setIsSameData(false)
  }, [name, email, userData]);

  return (
    <div>
      <Header colorScheme={{ isWhite: true }}/>
      <main className='profile'>
        <h2 className='profile__greeting'>
        {`Привет, ${userData.name}!`}
        </h2>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <p className='profile__input-name'>Имя</p>
            <input className='profile__input' type="text" required onFocus={onFocus} onBlur={onBlur} onChange={handleEditName} value={name} minLength={2} maxLength={18}/>
          </fieldset>
          <span className='profile__tooltip'>{nameError || ''}</span>
          <fieldset className='profile__fieldset'>
            <p className='profile__input-name'>E-mail</p>
            <input className='profile__input' type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required value={email} onChange={handleEditEmail} onFocus={onFocus} onBlur={onBlurEmail}/>
          </fieldset>
          <span className='profile__tooltip'>{emailError || ''}</span>
          <span className={`profile__tooltip ${isGreenTooltip ? 'profile__tooltip_green' : ''}`}>{tooltip}</span>
          <button className='profile__button profile__button_edit' disabled={isButtonDisabled} onClick={handleEditAccount} type='submit'>
            Редактировать
          </button>
          <button onClick={handleCheckOut} className='profile__button'>
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </div>
  )
}

export default Profile;