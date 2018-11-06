import angular from 'angular';
// Third Party Modules
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
// Third Party Styles
import './vendors.scss';
import 'normalize.css';
// Angular Modules
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

let VendorsModule = angular.module('app.vendors', [
    uiRouter,
    ngMaterial,
    ngAnimate,
    ngAria,
    ngMessages,
    ngResource,
    ngSanitize,
])
    .name;

export default VendorsModule;
