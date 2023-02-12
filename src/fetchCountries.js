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
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
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
