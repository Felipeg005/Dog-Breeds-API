export const getBreeds = () => {
  const dogBreeds = [];
  for (let i = 0; i < 200; i += 1) {
    dogBreeds.push({
      id: `${i}`,
    });
  }
  return dogBreeds;
};

export const KEY_PREFIX = 'breedsInfo';

export const loadBreeds = () => {
  const dogBreeds = getBreeds();
  const listContainer = document.querySelector('.list-container');
  const dogBreedsArray = [];
  dogBreeds.forEach((breed) => {
    dogBreedsArray.push(breed);
    // Counter
    if (document.querySelectorAll('li').length < 21) {
      listContainer.innerHTML += `<li id="${breed.id}" class="breed-card">
      <img class="breed-img" src="${breed.id}">
      <div class="name-like-container">
      <h2 class="names">${breed.id}</h2>
      <div id="likes-container${breed.id}" class="likes-container">
      <img id="like-icon${breed.id}" class="like-icon" src="">
      <h4 id="likes-like-icon${breed.id}">0 Likes<h4/>
      </div>
      </div>
      <button id="comment-${breed.id}" class="comment-button">Comments</button>
      </li>`;
    }
  });
  localStorage.setItem('breedStorage', JSON.stringify(dogBreedsArray));
};

export const loadCounter = () => {
  loadBreeds();
  const counter = document.querySelectorAll('.breed-card').length;
  const counterCointainer = document.getElementById('counter');
  counterCointainer.innerHTML = `Total Breeds (${counter})`;
};