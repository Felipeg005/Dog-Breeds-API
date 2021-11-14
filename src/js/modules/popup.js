import { KEY_PREFIX } from './keys';
import { fetchComments, postComments } from './comments-api-handler';

export const displayBreedInfo = (container, info) => {
  const imageContainer = container.querySelector('#popup-image');
  imageContainer.innerHTML = '';
  const breedImage = document.createElement('img');
  breedImage.alt = info.name;
  breedImage.src = info.image.url;
  breedImage.classList.add('popup-image');
  imageContainer.appendChild(breedImage);

  const breedName = container.querySelector('.popup-breed-name');
  breedName.innerHTML = info.name;

  const infoCategories = ['bred_for', 'breed_group', 'height', 'life_span',
    'temperament'];
  infoCategories.forEach((category) => {
    const categoryDisplay = container.querySelector(`#popup-${category}`);
    categoryDisplay.innerHTML = info[category];
  });
};

const displayComment = (container, comment) => {
  const commentDisplay = document.createElement('li');
  commentDisplay.innerHTML = `
    <span class="comment-date">${comment.creation_date}</span>
    <span class="commenter">${comment.username}:</span>
    <span class="comment-content">${comment.comment}</span>
`;
  container.appendChild(commentDisplay);
};

const displayCommentCounter = (container, comments) => {
  const counterDisplay = container.querySelector('#comments-counter');
  counterDisplay.innerHTML = `(${comments.length})`;
};

const removeListeners = (element) => {
  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
};

export const closePopupListener = (popup) => (event) => {
  event.preventDefault();
  removeListeners(popup.querySelector('#new-comment'));
  popup.classList.add('d-none');
};

export const displayComments = async (breedId, popup) => {
  let comments = await fetchComments(breedId);
  const commentsContainer = popup.querySelector('#comments-list');
  commentsContainer.innerHTML = '';
  if (comments.error) comments = [];
  displayCommentCounter(popup, comments);
  Array.from(comments)
    .forEach((comment) => { displayComment(commentsContainer, comment); });
};

const postCommentsListener = (breedId, commentButton, popup) => (event) => {
  event.preventDefault();
  const username = popup.querySelector('#new-comment-name');
  const content = popup.querySelector('#new-comment-content');
  postComments(breedId, username.value, content.value)
    .then(() => {
      username.value = '';
      content.value = '';
      displayComments(breedId, popup);
    });
};

const openPopupListener = (commentButton, popup) => async (event) => {
  event.preventDefault();
  const breedId = commentButton.closest('.breed-card').id;
  const storageKey = `${KEY_PREFIX}-${breedId}`;
  const breedInfo = JSON.parse(localStorage.getItem(storageKey));
  await displayBreedInfo(popup, breedInfo);
  await displayComments(breedId, popup);
  const form = popup.querySelector('#new-comment');
  form.addEventListener('submit',
    postCommentsListener(breedId, commentButton, popup));
  popup.classList.remove('d-none');
};

export default openPopupListener;
