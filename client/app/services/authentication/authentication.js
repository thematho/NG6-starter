import angular from 'angular';
import service from './authentication.service';
import config from './authentication.config';
export default angular
  .module('meanTemplate.sevices.authentication', [])
  .config(config)
  .service('AuthenticationService', service)
  .name;
