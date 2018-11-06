import angular from 'angular';
import component from './{{ dashCase name }}.component';

export default angular
  .module('{{ camelCase (pkg 'name') }}.{{ camelCase name }}', [])
  .component('{{ camelCase name }}', component)
  .name;
