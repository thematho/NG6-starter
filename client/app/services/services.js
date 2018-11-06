import angular from 'angular';
import Item from './item/item';
import ApiConfig from './api-config/api-config';

let serviceModule = angular.module('app.services', [
  Item,
  ApiConfig,
])

.name;

export default serviceModule;
