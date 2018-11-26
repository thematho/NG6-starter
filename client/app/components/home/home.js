import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('meanTemplate.home', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";
})

.component('home', homeComponent)
  
.name;

export default homeModule;
