import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Auth({onRegister}) {
  const headerText = (`${onRegister ? 'Добро пожаловать!' : 'Рады видеть!'} `);
  const buttonText = (`${onRegister ? 'Зарегистрироваться' : 'Войти'} `);

  return (
    <main className="auth">
      <img src={logo} alt="Лого" className="auth__logo"/>
      <h2 className='auth__header'>{headerText}</h2>
      <form className='auth__form'>
        {onRegister && (
          <>
            <label className='auth__label'>Имя</label>
            <input type="text" className='auth__input' required minLength={2} maxLength={30} />
          </>
        )}
        <label className='auth__label'>E-mail</label>
        <input type="email" className='auth__input' required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
        <label className='auth__label'>Пароль</label>
        <input type="password" className='auth__input' required minLength={5}/>
        <span className='auth__prompt'>Что-то пошло не так...</span>
        <button type='submit' className='auth__button'>
          {buttonText}
        </button>
      </form>
      {onRegister ? (
      <p className='auth__footnote'>Уже зарегистрированы? <Link to='/signin' className='auth__link'>Войти</Link></p>
      ) : (
      <p className='auth__footnote'>Ещё не зарегистрированы? <Link to='/signup' className='auth__link'>Регистрация</Link></p>
      )}
    </main>
  )
}

export default Auth;