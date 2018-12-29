import angular from 'angular';
import directives from './directives/directives';
import filters from './filters/filters';

import Navbar from './navbar/navbar';
import Hero from './hero/hero';

let commonModule = angular.module('meanTemplate.common', [
  directives,
  filters,
  Navbar,
  Hero,
])

.name;

export default commonModule;
