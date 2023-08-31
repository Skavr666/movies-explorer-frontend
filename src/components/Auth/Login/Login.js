import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

function Login({ onSignIn }) {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [formValue, setFormValue] = useState({});
  const [tooltip, setTooltip] = useState('');

  const isFormFieldsValid = !formErrorMessage.email &&
  !formErrorMessage.passwordform &&
  formErrorMessage.email === '' &&
  formErrorMessage.password === '';

  function handleEditEmail(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormErrorMessage({
      ...formErrorMessage,
      [name]: e.target.validationMessage
    });
  };

  function handleEditPassword(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormErrorMessage({
      ...formErrorMessage,
      [name]: e.target.validationMessage
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    onSignIn(email, password)
    .catch((err) => {
      if (err === '401') {
        setTooltip('Неверный логин или пароль');
      } else {
        setTooltip('Ошибка авторизации');
      }
    });
  };

  return (
    <main className="auth">
      <Link className='auth__logo-link' to='/'>
        <img src={logo} alt="Лого" className="auth__logo"/>
      </Link>
      <h2 className='auth__header'>Рады видеть!</h2>
      <form className='auth__form' noValidate onSubmit={handleSubmit}>
        <label className='auth__label'>E-mail</label>
        <input type="email" className='auth__input' required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" onChange={handleEditEmail} name='email'/>
        <span className='auth__prompt'>{formErrorMessage.email || ''}</span>
        <label className='auth__label'>Пароль</label>
        <input type="password" className='auth__input' required minLength={5} onChange={handleEditPassword} name='password'/>
        <span className='auth__prompt'>{formErrorMessage.password}</span>
        <span className='auth__prompt'>{tooltip}</span>
        <button type='submit' className='auth__button' disabled={!isFormFieldsValid}>Войти</button>
      </form>
      <p className='auth__footnote'>Ещё не зарегистрированы? <Link to='/signup' className='auth__link'>Регистрация</Link></p>
    </main>
  )
}

export default Login;