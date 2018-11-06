import angular from 'angular';
import AppModule from './app';

function DevConfig($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(function ($q) {
    return {
      'request': function (config) {
        config.url = 'localhost:3000' + config.url;
        return config || $q.when(config);
      }
    };
  });
}

const app = angular.module(AppModule);
const DevConfigModule = angular.module('app.config.dev', [])
  .config(DevConfig)  
  .name;

app.requires.push(DevConfigModule);

export default DevConfigModule;

