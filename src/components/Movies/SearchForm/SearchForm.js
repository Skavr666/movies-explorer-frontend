import searchIcon from '../../../images/search-icon.png';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const location = useLocation();
  const inSavedMoviePage = location.pathname === '/saved-movies';

  const [searchString, setSearchString] = useState(() => {
    if (inSavedMoviePage) return ''
    else {
      const query = localStorage.getItem('lastQuery') || '';
      return query;
    }
  });

  const [isChecked, setIsChecked] = useState(() => {
    if (inSavedMoviePage) return false
    else {
      const checkboxState = localStorage.getItem('lastCheckboxState') || false;
      const toBooleanValue = checkboxState === 'true';
      return toBooleanValue;
    }
  });

  function handleSearch(checkBoxState) {
    if (inSavedMoviePage) onSearch(searchString, checkBoxState)
    else {
      localStorage.setItem('lastQuery', searchString);
      localStorage.setItem('lastCheckboxState', checkBoxState);
      onSearch(searchString, checkBoxState);
    }
  };

  const handleInputEdit = (e) => {
    setSearchString(e.target.value);
  };

  const handleCheckboxEdit = (e) => {
    setIsChecked(e.target.checked);
    handleSearch(e.target.checked);
  };

  function onRequest(e) {
    e.preventDefault();
    handleSearch(isChecked);
  };

  const onFocus = (e) => {
    e.target.placeholder = "";
  };

  const onBlur = (e) => {
    e.target.placeholder = "Фильм";
  };

  return (
    <form className='search-form' onSubmit={onRequest}>
      <fieldset className="search-form__fieldset-main">
        <img className='search-form__icon' src={searchIcon} alt="Поиск" />
        <input className='search-form__input' placeholder="Фильм" type="text" required onFocus={onFocus} onBlur={onBlur} onChange={handleInputEdit} maxLength={24} value={searchString}/>
        <button type="submit" className='search-form__button'></button>
      </fieldset>
      <fieldset className="search-form__fieldset-checkbox">
        <input type="checkbox" className="search-form__checkbox" onChange={handleCheckboxEdit} id='search-form__checkbox' checked={isChecked}/>
        <span className='search-form__checkbox-text'>Короткометражки</span>
      </fieldset>
    </form>
  )
}

export default SearchForm;