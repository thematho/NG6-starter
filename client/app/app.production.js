import angular from 'angular';
import APIModule from './services/api-config/api-config';

// @see: https://docs.angularjs.org/guide/production
// for more details about produciton performance improvements
function ProductionConfig($compileProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
}

let app = angular.module('app');
let productionModule = angular.module('app.production', [APIModule])
  .run((API) => {
    'ngInject';
    API.URL = '/api';

  })
  .config(ProductionConfig)
  .name;

app.requires.push(productionModule);

export default productionModule;
