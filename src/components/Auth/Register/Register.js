import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../images/logo.svg';

function Register({ onSignUp }) {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [formValue, setFormValue] = useState({});
  const [tooltip, setTooltip] = useState('');

  const isFormFieldsValid = !formErrorMessage.name &&
  !formErrorMessage.email &&
  !formErrorMessage.password &&
  formErrorMessage.name === '' &&
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

  function handleEditName(e) {
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
    const { name, email, password } = formValue;
    onSignUp(name, email, password)
    .then(() => {
      localStorage.setItem('savedUser', JSON.stringify({ name, email }));
    })
    .catch(err => {
      if (err === '409') {
        setTooltip('Такой пользователь уже существует');
      } else {
        setTooltip('Ошибка при регистрации пользователя')
      }
    })
  };
  
  return (
    <main className="auth">
      <img src={logo} alt="Лого" className="auth__logo"/>
      <h2 className='auth__header'>Добро пожаловать!</h2>
      <form className='auth__form' noValidate onSubmit={handleSubmit}>
        <label className='auth__label'>Имя</label>
        <input type="text" className='auth__input' required minLength={2} maxLength={30} onChange={handleEditName} name='name'/>
        <span className='auth__prompt'>{formErrorMessage.name || ''}</span>
        <label className='auth__label'>E-mail</label>
        <input type="email" className='auth__input' required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" onChange={handleEditEmail} name='email'/>
        <span className='auth__prompt'>{formErrorMessage.email || ''}</span>
        <label className='auth__label'>Пароль</label>
        <input type="password" className='auth__input' required minLength={5} onChange={handleEditPassword} name='password'/>
        <span className='auth__prompt'>{formErrorMessage.password}</span>
        <span className='auth__prompt'>{tooltip}</span>
        <button type='submit' className='auth__button' disabled={!isFormFieldsValid}>Зарегистрироваться</button>
      </form>
      <p className='auth__footnote'>Уже зарегистрированы? <Link to='/signin' className='auth__link'>Войти</Link></p>
    </main>
  )
}

export default Register;