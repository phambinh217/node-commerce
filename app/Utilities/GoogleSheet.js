const { toSnakeCase, toCamelCase } = require("./Obj");

const sendRequest = (url, payload) => {
  const body = JSON.stringify(toSnakeCase(payload));

  console.log(body);

  return fetch(url, {
    method: "POST",
    body,
  }).then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      return toCamelCase(json);
    }
  });
};

module.exports = {
  sendRequest,
};
