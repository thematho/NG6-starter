import angular from 'angular';
import service from './encryption.service';

export default angular
  .module('meanTemplate.encryption', [])
  .service('EncryptionService', service)
  .name;
