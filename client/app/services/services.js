import angular from 'angular';
import AuthenticationModule from './authentication/authentication';
import EncryptionModule from './encryption/encryption';

let serviceModule = angular.module('meanTemplate.services', [
  AuthenticationModule,
  EncryptionModule,
])

  .name;

export default serviceModule;
