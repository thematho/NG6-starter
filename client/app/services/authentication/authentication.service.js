function AuthenticationService($window, $resource, EncryptionService) {
  'ngInject';

  const SECURITY_API_URL = '/api/public/:action';
  const UserResource = $resource(SECURITY_API_URL, { action: '@action' }, {
    authenticate: {
      method: 'POST',
      action: 'authenticate'
    },
    deauthenticate: {
      method: 'DELETE',
      action: 'authenticate'
    }
  });

  const authenticate = (user, pass) => (
    UserResource
      .authenticate(user, pass)
      .$promise
  );

  const storeUserInfo = (response) => {
    $window.localStorage.setItem('user', response.user);
    $window.localStorage.setItem('token', response.token);
  };

  const logIn = (user, password) => {
    return EncryptionService
      .encrypt(password)
      .then(encryptedPass => authenticate(user, encryptedPass))
      .then(storeUserInfo);
  };

  const logOut = () => {
    return UserResource.deauthenticate().$promise.then(() => {
      $window.localStorage.removeItem('user');
      $window.localStorage.removeItem('token');
    });
  };

  return {
    logIn,
    logOut,
  };
}

export default AuthenticationService;
