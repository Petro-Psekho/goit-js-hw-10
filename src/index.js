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
  // console.log(countryName);

  if (countryName === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = ''); // condition to clear the input field and/or remove the created markup
  }

  fetchCountries(countryName).then(renderCountryInfo).catch(wrongCountryName);
}

function renderCountryInfo(countries) {
  // console.log(countries);
  const markup = countries
    .map(country => {
      const languages = country.languages.map(lang => {
        return lang.name;
      });
      // console.log(languages);

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

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
          <img src="${country.flags.svg}" alt="${country.name}" width="50">
          <p>${country.name}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function wrongCountryName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
