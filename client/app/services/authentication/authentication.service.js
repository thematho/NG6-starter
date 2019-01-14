function AuthenticationService($window, $http, EncryptionService) {
  'ngInject';

  const SECURITY_API_URL = '/api/public/authenticate';

  const authenticate = (email, password) => (
    $http.post(SECURITY_API_URL, {
      email, password
    })
  );

  const storeUserInfo = ({ data }) => {
    $window.localStorage.setItem('user', JSON.stringify(data.user));
    $window.localStorage.setItem('token', data.token);
  };

  const logIn = (email, password) => {
    return EncryptionService
      .encrypt(password)
      .then(encryptedPass => authenticate(email, encryptedPass))
      .then(storeUserInfo);
  };

  const logOut = () => {
    return $http.delete(SECURITY_API_URL)
      .then(() => {
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
