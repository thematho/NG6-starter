import angular from 'angular';
import aboutComponent from './about.component';

let aboutModule = angular.module('about', [])
.component('about', aboutComponent)
  
.name;

export default aboutModule;
