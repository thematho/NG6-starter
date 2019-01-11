const { CRYPTO_PHRASE, CRYPTO_BITS } = require('../../config');
const cryptico = require('cryptico-js');

const PRIVATE_KEY = cryptico.generateRSAKey(CRYPTO_PHRASE, CRYPTO_BITS);
const PUBLIC_KEY = cryptico.publicKeyString(PRIVATE_KEY);

const SecurityController = {
  publicKey: PUBLIC_KEY,
  decrypt: (value) => cryptico.decrypt(value, PRIVATE_KEY),
};


module.exports = SecurityController;