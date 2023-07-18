import { Link } from 'react-router-dom';
import profileIcon from '../../images/profile_icon.png';

function Header({ colorScheme }) {
  return (
    <header className={`header ${colorScheme.isWhite && 'header_white'}`}>
      <Link className='header__logo' to='/' />
        {!colorScheme.isWhite ? (
        <nav className='header__nav'>
          <Link to="/signup" className='header__link'>Регистрация</Link>
          <Link to="/signin" className='header__button'>Войти</Link>
        </nav>
        ) : (
        <>
          <nav className='header__nav header__nav_white'>
            <div className='header__nav-item'>
              <Link to="/movies" className='header__link header__link_white'>Фильмы</Link>
              <Link to="/saved-movies" className='header__link header__link_white'>Сохраненные фильмы</Link>
            </div>
            <Link to="/profile" className='header__link header__link_white'>
              <div className='header__nav-item'>
                <p className='header__account'>Аккаунт</p>
                <img src={profileIcon} className='header__profile-icon' alt='' />
              </div>
            </Link>
          </nav>
          <nav className='header__burger-nav'>
          <input type="checkbox" className="header__toggler" />
            <div className="header__hamburger"><div></div></div>
            <div className="header__menu">
                <div className='header__items-wrapper'>
                    <ul className='header__items'>
                        <li className='header__menu-item'><Link to="/" className='header__menu-link'>Главная</Link></li>
                        <li className='header__menu-item'><Link to="/movies" className='header__menu-link'>Фильмы</Link></li>
                        <li className='header__menu-item'><Link to="/saved-movies" className='header__menu-link'>Сохраненные фильмы</Link></li>
                        <li className='header__menu-item'>
                          <Link to="/profile" className='header__menu-link'>
                            <div className='header__nav-item'>
                              <p className='header__account'>Аккаунт</p>
                              <img src={profileIcon} className='header__profile-icon' alt='' />
                            </div>
                          </Link>
                        </li>
                    </ul>
                </div>
            </div>
          </nav>
        </>
        )}
    </header>
  )
}

export default Header;
