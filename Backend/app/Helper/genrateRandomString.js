const randomstring = require('randomstring');

function generateRandomString(length) {
  return randomstring.generate({ length: length, charset: 'alphanumeric' });
}

module.exports = { generateRandomString };
