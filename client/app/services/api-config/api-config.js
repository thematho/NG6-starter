import angular from 'angular';
import service from './api-config.service';
import API_CONFIG from './api-config.value';

export default angular
  .module('app.services.apiConfig', [])
  .service('API', service)
  .value('API_CONFIG', API_CONFIG)
  .name;
