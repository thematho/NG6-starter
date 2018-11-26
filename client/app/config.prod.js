import angular from 'angular';

// @see: https://docs.angularjs.org/guide/production
// for more details about produciton performance improvements
function ProductionConfig($compileProvider) {
  'ngInject';

  $compileProvider.debugInfoEnabled(false);
}

const ProdConfigModule = angular.module('meanTemplate.config.prod', [])
  .config(ProductionConfig)
  .name;

app = angular.module('app').requires.push(ProdConfigModule);

export default ProdConfigModule;
