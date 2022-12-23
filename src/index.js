import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(inputCountryName, DEBOUNCE_DELAY)
);

function inputCountryName(e) {
  e.preventDefault();

  const countryName = refs.inputField.value.trim();

  if (countryName === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }

  fetchCountries(countryName)
    .then(rendersMarkup)
    .catch(error => {
      console.log(error);
    });
}

function rendersMarkup(countries) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (countries.length > 10) {
    return tooManyCountries();
  } else if (countries.length === undefined) {
    return wrongCountryName();
  } else if (countries.length > 1 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return `<li class="country-list__item" >
          <img src="${country.flags.svg}" alt="${country.name}" width="50">
          <p>${country.name}</p>
        </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    const markup = countries
      .map(country => {
        const languages = country.languages.map(lang => {
          return lang.name;
        });
        return `<li>
          <img src="${country.flags.svg}" alt="${country.name}" width="50">
          <p>${country.name}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${languages}</p>
        </li>`;
      })
      .join('');
    refs.countryInfo.innerHTML = markup;
  }
}

// function wrongCountryName() {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
//   refs.inputField.value = '';
// }

// function tooManyCountries() {
//   Notiflix.Notify.info(
//     'Too many matches found. Please enter a more specific name'
//   );
//   refs.inputField.value = '';

function wrongCountryName() {
  Notiflix.Report.failure(
    'Oops',
    '"There is no country with that name" ',
    'Okay'
  );
  refs.inputField.value = '';
}

function tooManyCountries() {
  Notiflix.Report.info(
    'Too many matches found',
    '"Please enter a more specific name" ',
    'Okay'
  );
  // refs.inputField.value = '';
}
