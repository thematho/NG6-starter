import JWTInterceptor from './jwt.interceptor';
import sessionExpirationInterceptor from './session-expiration.interceptor';
export default ($httpProvider) => {
  'ngInject';

  const list = [JWTInterceptor, sessionExpirationInterceptor];
  list.forEach((interceptor) => {
    $httpProvider.interceptors.push(interceptor);
  });

};