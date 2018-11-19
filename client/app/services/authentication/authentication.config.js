import credentialsInterceptor from './unauthorized.interceptor';
import JWTInterceptor from './session-expiration.interceptor';
export default ($httpProvider) => {
  'ngInject';

  const list = [credentialsInterceptor, JWTInterceptor];
  list.forEach((interceptor) => {
    $httpProvider.interceptors.push(interceptor);
  });

};