const sendRequest = (url, payload) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  });
};

module.exports = {
  sendRequest,
};
