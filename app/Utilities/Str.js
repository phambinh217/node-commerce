const base64Encode = (input) => {
  return Buffer.from(input).toString("base64");
};

const base64Decode = (input) => {
  return Buffer.from(input, "base64").toString();
};

module.exports = {
  base64Encode,
  base64Decode,
};
