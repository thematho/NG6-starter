import angular from 'angular';
import AppModule from './app';

function DevConfig($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(function ($q) {
    return {
      'request': function (config) {
        config.url = 'http://localhost:8080' + config.url;
        return config || $q.when(config);
      }
    };
  });
}

const app = angular.module(AppModule);
const DevConfigModule = angular.module('meanTemplate.config.dev', [])
  .config(DevConfig)  
  .name;

app.requires.push(DevConfigModule);

export default DevConfigModule;

