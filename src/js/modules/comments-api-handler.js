import { APP_KEY } from './keys';

const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const URL = `${BASE_URL}/apps/${APP_KEY}/comments`;
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const fetchComments = async (breedId) => {
  const query = `?item_id=${breedId.toString()}`;
  let allComments = await fetch(`${URL}${query}`);
  allComments = await allComments.json();
  return allComments;
};

export const postComments = (breedId, username, comment) => {
  const body = JSON.stringify({
    item_id: breedId,
    username,
    comment,
  });
  return fetch(URL, {
    method: 'POST',
    body,
    headers,
  });
};
