function JWTInterceptor($window) {
  'ngInject';

  return {
    request: (req) => {
      const token = $window.localStorage.getItem('token');
      if (token) {
        req.headers.push('x-access-token', token || '');
      }
      return req;
    },
  };
}
export default JWTInterceptor;
