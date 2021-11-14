const ApiBreedsUrl = ('https://api.TheDogAPI.com/v1/breeds');

const getBreeds = async () => {
  const response = await fetch(ApiBreedsUrl, {
    method: 'GET',
    headers: {
      'x-api-key': 'be1ccef0-f839-40e0-8774-5ff5eeb18b34',
    },
  });
  const json = await response.json();
  return json;
};

export default getBreeds;