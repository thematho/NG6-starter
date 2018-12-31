function credentialsInterceptor() {
  'ngInject';

  return {
    responseError: (res) => {
      if (res.status === 401 || res.status === 403) {
        //TODO redirect to login page
      }
      return Promise.reject(res);
    }
  };
}
export default credentialsInterceptor;
