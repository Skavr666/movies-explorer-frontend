import Header from '../Header/Header.js';

function Profile() {
  const userName = 'Егор';
  const userEmail = 'pochta@yandex.ru';

  const onFocus = (e) => {
    e.target.value = "";
  };

  const onBlur = (e) => {
    e.target.value = userName;
  };

  const onBlurEmail = (e) => {
    e.target.value = userEmail;
  };

  return (
    <div>
      <Header colorScheme={{ isWhite: true }}/>
      <main className='profile'>
        <h2 className='profile__greeting'>
          Привет, {userName}!
        </h2>
        <form className='profile__form'>
          <fieldset className='profile__fieldset'>
            <p className='profile__input-name'>Имя</p>
            <input className='profile__input' type="text" required value={userName || ''} onFocus={onFocus} onBlur={onBlur}/>
          </fieldset>
          <fieldset className='profile__fieldset'>
            <p className='profile__input-name'>E-mail</p>
            <input className='profile__input' type="text" required value={userEmail || ''} onFocus={onFocus} onBlur={onBlurEmail}/>
          </fieldset>
          <button className='profile__button profile__button_edit' type='submit'>
            Редактировать
          </button>
          <button className='profile__button'>
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </div>
  )
}

export default Profile;