import angular from 'angular';
import Home from './home/home';
import Login from './login/login';
import About from './about/about';

let componentModule = angular.module('meanTemplate.components', [
  Home,
  Login,
  About
])

.name;

export default componentModule;
