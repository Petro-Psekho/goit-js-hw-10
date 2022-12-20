import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

console.log(refs.inputField);
console.log(refs.countryList);
console.log(refs.countryInfo);

refs.inputField.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);

function inputFieldText() {
  console.log(refs.inputField.value);

  refs.countryList.insertAdjacentHTML(
    'beforeend',
    // galleryItems.map(galleryItem => `<li>1111</li>`).join('')
    `<li>{{capital}}</li>
    <li>${refs.inputField.value}</li>`
  );
}

function fetchCountries() {
  fetch(
    'https://restcountries.com/v3.1/name/poland?name.official&capital&population&flags.svg&languages'
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);

      const markup = inputFieldText(country);
      console.log(markup);
    })
    .catch(error => {
      console.log(error);
    });
}
