export function fetchCountries(countryName) {
  const url = `https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => {
    return response.json();
  });
}
