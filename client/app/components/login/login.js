import angular from 'angular';
import component from './login.component';
import AuthenticationModule from '../../services/authentication/authentication';

export default angular
  .module('meanTemplate.login', [
    AuthenticationModule
  ])
  .component('login', component)
  .name;
