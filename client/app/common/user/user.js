import angular from 'angular';
import UserFactory from './user.factory';

let userModule = angular.module('meanTemplate.common.user', [])

.factory('User', UserFactory)
  
.name;

export default userModule;
