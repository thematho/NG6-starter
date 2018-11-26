import angular from 'angular';
import AuthenticationModule from './authentication/authentication';

let serviceModule = angular.module('meanTemplate.services', [
  AuthenticationModule,
])

.name;

export default serviceModule;
