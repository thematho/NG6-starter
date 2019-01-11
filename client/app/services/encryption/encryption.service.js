import cryptico from 'cryptico-js';

function EncryptionService($resource) {
  'ngInject';
  const ENCRYP_API_URL = '/api/public/publicKey';
  const encryptionResource = $resource(ENCRYP_API_URL, { key: '@key' }, {
    publicKey: {
      method: 'GET',
    }
  });

  let publicKey = () => {
    return encryptionResource.publicKey().$promise;
  };

  let encrypt = (value) => {
    return publicKey()
      .then(({ publicKey }) => (
        cryptico.encrypt(value, publicKey)).cipher
      );
  };

  return {
    encrypt
  };
}

export default EncryptionService;
