import searchIcon from '../../../images/search-icon.png';

function SearchForm() {
  const onFocus = (e) => {
    e.target.placeholder = "";
  };

  const onBlur = (e) => {
    e.target.placeholder = "Фильм";
  };

  return (
    <form className='search-form' >
      <fieldset className="search-form__fieldset-main">
        <img className='search-form__icon' src={searchIcon} alt="Поиск" />
        <input className='search-form__input' placeholder="Фильм" type="text" required onFocus={onFocus} onBlur={onBlur}/>
        <button type="submit" className='search-form__button'></button>
      </fieldset>
      <fieldset className="search-form__fieldset-checkbox">
        <input type="checkbox" className="search-form__checkbox"/>
        <span className='search-form__checkbox-text'>Короткометражки</span>
      </fieldset>
    </form>
  )
}

export default SearchForm;