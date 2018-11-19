function AuthenticationService($window, $resource) {
  'ngInject';
  const USER_API_URL = '/api/users/:id/:action';
  const UserResource = $resource(USER_API_URL, { id: '@id', action: '@action' }, {
    authenticate: {
      method: 'POST',
      action: 'authenticate'
    },
    deauthenticate: {
      method: 'DELETE',
      action: 'authenticate'
    }
  });

  const logIn = (user, password) => {
    return UserResource.authenticate(user, password).$promise
      .then((response) => {
        $window.localStorage.setItem('user', response.user);
        $window.localStorage.setItem('token', response.token);
      });
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
