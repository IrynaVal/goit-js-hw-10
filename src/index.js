import './css/styles.css';
import Notiflix from 'notiflix';
// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Oops, there is no country with that name');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// console.log(countryInfo)

input.addEventListener('input', _.debounce(()=>{onInputSearch}, DEBOUNCE_DELAY) );

function onInputSearch(evt) {
    const searchQuery = evt.currentTarget.value;
// console.log(searchQuery)
    
    fetchCountries(searchQuery)
    .then(renderCountryInfo)
    .catch(onFetchError);
}

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name';
    const url = `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
    return fetch(url).then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
        console.log(response.json())
    return response.json();
  });
}
// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

function renderCountryInfo(country) {
    const markup = country.map(country => {
        return `
        <div><img src="${flags}" alt="${name}" /></div>
<div>
  <h2>${name}</h2>
  <p><b>Capital:</b>${capital}</p>
  <p><b>Population:</b>${population}</p>
  <p><b>Languages:</b>${languages}</p>
</div>`;
}).join("");
  countryInfo.innerHTML = markup;
}

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}


// const fetchPostsBtn = document.querySelector(".btn");
// const userList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", () => {
//   fetchPosts()
//     .then((posts) => renderPosts(posts))
//     .catch((error) => console.log(error));
// });

// function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: 5,
//     // Change the group number here
//     _page: 3
//   });

//   return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }




// const BASE_URL = `https://restcountries.com/v3.1`;
// function fetchCountries(name) {
//     const url = `${BASE_URL}/name/${name}?fields=name.official,capital,population,languages`
//     return fetch(url).then(response => {
//     if (!response.ok) {
//         throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }
// export default { fetchCountries };

// import API from './';

