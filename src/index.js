import './css/styles.css';
import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// console.log(refs.inputField);
// console.log(refs.countryList);
// console.log(refs.countryInfo);

refs.inputField.addEventListener(
  'input',
  debounce(inputCountryName, DEBOUNCE_DELAY)
);

function inputCountryName(e) {
  e.preventDefault();

  const countryName = refs.inputField.value.trim();
  // console.log(countryName);

  fetchCountries(countryName)
    .then(renderCountryList)
    .catch(error => console.log(error));
}

function fetchCountries(countryName) {
  return fetch(
    'https://restcountries.com/v2/name/sw?fields=name,capital,population,flags,languages'
    // 'https://restcountries.com/v2/name/${countryName}'
  ).then(response => {
    return response.json();
  });
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
          <img src="${country.flags.svg}" alt="${country.name}" width="50">
          <p><b>Country</b>: ${country.name}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${country.languages[0].name}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}
