import angular from 'angular';

import Common from './common/common';
import Components from './components/components';
import Factories from './factories/factories';
import Services from './services/services';
import AppComponent from './app.component';


import AppConfig from './app.config';
import AppRouter from './app.router';

import Vendors from './vendors/vendors';

export default angular.module('meanTemplate', [
  Common,
  Components,
  Factories,
  Services,
  Vendors,
])
  .config(AppConfig)
  .config(AppRouter)
  .component('app', AppComponent)
  .name;

