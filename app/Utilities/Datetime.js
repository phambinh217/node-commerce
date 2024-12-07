const dayjs = require('dayjs')

const now = () => {
  return dayjs();
};

module.exports = {
  now,
};
