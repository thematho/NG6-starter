function ApiConfigService(API_CONFIG) {
    'ngInject';

  return {
    URL: API_CONFIG.API_URL,
  };
}

export default ApiConfigService;
