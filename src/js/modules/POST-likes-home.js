const POSTLikes = (id) => {
  fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/aliNSyHfj9kbhiXrqKsy/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `${id}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.text()).then((json) => json);
};

export default POSTLikes;