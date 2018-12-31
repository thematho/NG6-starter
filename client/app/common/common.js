import angular from 'angular';
import directives from './directives/directives';
import filters from './filters/filters';

let commonModule = angular.module('meanTemplate.common', [
  directives,
  filters,
])

.name;

export default commonModule;
