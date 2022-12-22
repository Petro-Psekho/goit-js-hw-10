const BASE_URL = 'https://restcountries.com/v2/name/';
const searchFields = '?fields=name,capital,population,flags,languages';

export function fetchCountries(countryName) {
  const url = `${BASE_URL}${countryName}${searchFields}`;

  return fetch(url).then(response => {
    return response.json().catch(error => console.log(error));
  });
}
