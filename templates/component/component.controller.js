function {{ properCase name }}Controller() {
  'ngInject';

  let $ctrl = this;
  this.name = '{{ camelCase name }}';

  $ctrl.$onInit =  () => {};
  $ctrl.$onChanges = (changes) => {};
  $ctrl.$onDestroy = () => {};
  $ctrl.$postLink = () => {};
}

export default {{ properCase name }}Controller;
