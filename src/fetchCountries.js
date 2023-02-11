// import refs from './refs';
// export default class CountriesAPI {
//   constructor() {
//     this.name = name;
//     this.refs = refs;

import { Notify } from 'notiflix';

//   }
export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=false&fields=languages,flags,population,capital,name`
  )
    .then(response => {
      if (!response.ok && query !== '') {
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
      }
      return response.json();
    })
    .catch(error => {
      return error;
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
