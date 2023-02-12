// import refs from './refs';
// export default class CountriesAPI {
//   constructor() {
//     this.name = name;
//     this.refs = refs;
import { refs } from './refs.js';

import { Notify } from 'notiflix';

//   }
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=false&fields=languages,flags,population,capital,name`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (refs.searchQuery.value === '') {
        refs.container.innerHTML = '';
        refs.countryCard.innerHTML = '';
        return;
      } else if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        throw new Error('');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//   get name() {
//     return this.name;
//   }
//   set name(newName) {
//     newName = refs.searchQuery.value;
//     this.name = newName;
//   }
// }
export default { fetchCountries };
