import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import CountriesAPI from './fetchCountries';
import { refs } from './refs.js';

// restoreValue();
const DEBOUNCE_DELAY = 300;

refs.searchQuery.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);
// const countriesAPI = new CountriesAPI();
function onSearchInput(e) {
  const query = e.target.value.trim();
  setLocalStorage(query);
  fetchCountries(query).then(renderCard);
}

function renderCard(countries) {
  if (refs.searchQuery.value === '') {
    return;
  } else if (countries.length === 1) {
    const markup = countries
      .map(country => {
        return `<ul class="list">
        <li><img class="flag" src="${country.flags.svg}"></li>
        <li><h1>${country.name.official}</h1></li></ul>
          <p>Languages: ${Object.values(country.languages)}</p>
          <p>Population: ${country.population}</p>`;
      })
      .join('');
    refs.container.innerHTML = '';
    refs.countryCard.innerHTML = markup;
  } else if (countries.length >= 20) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.container.innerHTML = '';
    return;
  } else {
    refs.countryCard.innerHTML = '';
    const markup2 = countries
      .map(country => {
        return `
          <li class="list-item">
            <img class="flag-mini" src="${country.flags.svg}">
            <h1 class="title-list">${country.name.official}</h1>
          </li>`;
      })
      .join('');
    refs.container.innerHTML = markup2;
  }
}

function setLocalStorage(query) {
  const fd = JSON.stringify(query);
  localStorage.setItem('query', fd);
}

function restoreValue() {
  refs.searchQuery.value = JSON.parse(localStorage.getItem('query'));
}
