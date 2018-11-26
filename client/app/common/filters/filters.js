import angular from 'angular';
import camelcase from './camelcase';

let filtersModule = angular.module('meanTemplate.common.filters', [])

.filter('camelcase', camelcase)

.name;

export default filtersModule;
