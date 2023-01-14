import './css/styles.css';
import {fetchCountries} from './fetchCountries.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  const searchQuery = evt.target.value.trim();
 
  if (!searchQuery) {
    clearFields();
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      
      if (data.length > 10) {
        clearFields();
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

      } else if (data.length >= 2 && data.length <= 10) {
        countryInfo.innerHTML = '';
        createCountryListMarkup(data);
          
      } else {
        countryList.innerHTML = '';
        createCountryInfoMarkup(data);
      }
    }
    )
    .catch((error) => {
      clearFields();
      onFetchError();
    });
}

function createCountryInfoMarkup(country) {
  const markup = country
    .map(({ flags: { svg: flag }, name: { official: name }, capital, population, languages }) => 
      `<div class="title"><img src="${flag}" alt="${name}" width="40"/>
  <h2>${name}</h2></div>
  <p><b>Capital: </b>${capital[0]}</p>
  <p><b>Population: </b>${population}</p>
  <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`
).join("");
  countryInfo.innerHTML = markup;

  setStyles();
}

function createCountryListMarkup(country) {
  const markup = country
    .map(({ flags: { svg: flag }, name: { official: name } }) =>
      `<li class="title"><img src="${flag}" alt="${name}" width="40"/>
  <h2>${name}</h2></li>`).join('');
  countryList.innerHTML = markup;

  const list = document.querySelectorAll('li');
  list.forEach(listEl => {
    listEl.style.listStyle = 'none';
  });

  setStyles();
}

function clearFields() {
  countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function setStyles() {
  const title = document.querySelectorAll('.title');
  title.forEach(listEl => {
    listEl.style.display = 'flex';
    listEl.style.gap = '20px';
    listEl.style.alignItems = 'center';
  });
 }
