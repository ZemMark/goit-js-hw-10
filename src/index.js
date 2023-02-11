import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import CountriesAPI from './fetchCountries';
export default refs = {
  searchQuery: document.querySelector('#search-box'),
  container: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};
restoreValue();
const DEBOUNCE_DELAY = 300;

refs.searchQuery.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);
// const countriesAPI = new CountriesAPI();
function onSearchInput(e) {
  query = e.target.value.trim();
  setLocalStorage(query);
  fetchCountries(query).then(renderCard);
}

function renderCard(countries) {
  if (countries.length === 1) {
    const markup = countries.map(country => {
      return `<div><img src="${country.flags.svg}" width="320"><h1>${
        country.name.official
      }</h1></div>
        <p>${Object.values(country.languages)}</p>
        <p>${country.population}</p>`;
    });
    refs.container.innerHTML = '';
    refs.countryCard.innerHTML = markup;
    return;
  } else if (countries.length >= 20) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.container.innerHTML = '';
    return;
  }
  refs.countryCard.innerHTML = '';
  if (query !== '') {
    const markup2 = countries
      .map(country => {
        return `
        <li class="list-item">
          <img src="${country.flags.svg}" width="40">
          <h1>${country.name.official}</h1>
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
