import getBreeds from './GET-breeds-home';
import likeIcon from '../../img/heart-icon.png';
import { KEY_PREFIX } from './keys';

export const loadBreeds = async () => {
  const dogBreeds = await getBreeds();
  const listContainer = document.querySelector('.list-container');
  const dogBreedsArray = [];
  dogBreeds.forEach((breed) => {
    dogBreedsArray.push(breed);
    breed.likeStatus = 'notLiked';
    breed.likeIcon = `like-icon${breed.id}`;
    // Counter
    if (document.querySelectorAll('.breed-card').length < 21) {
      breed.height = breed.height.metric;
      localStorage.setItem(`${KEY_PREFIX}-${breed.id}`, JSON.stringify(breed));
      listContainer.innerHTML += `<li id="${breed.id}" class="breed-card">
      <img class="breed-img" src="${breed.image.url}">
      <div class="name-like-container">
      <h2 class="names">${breed.name}</h2>
      <div id="likes-container${breed.id}" class="likes-container">
      <img id="like-icon${breed.id}" class="like-icon" src="${likeIcon}">
      <h4 id="likes-like-icon${breed.id}">0 Likes<h4/>
      </div>
      </div>
      <button id="comment-${breed.id}" class="comment-button">Comments</button>
      </li>`;
    }
  });
  localStorage.setItem('breedStorage', JSON.stringify(dogBreedsArray));
};

export const loadCounter = async () => {
  await loadBreeds();
  const counter = document.querySelectorAll('.breed-card').length;
  const counterCointainer = document.getElementById('counter');
  counterCointainer.innerHTML = `Total Breeds (${counter})`;
};