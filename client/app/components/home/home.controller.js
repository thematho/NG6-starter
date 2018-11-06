function HomeController($http) {
  'ngInject';
  let $ctrl = this;

  this.name = 'home';
  this.$onInit = () => {
    $http.get('/api/users')
      .then((response) => {
        this.name = response.data.name;
      });
  };
  this.$onChanges = (changes) => { };
  this.$onDestroy = () => { };
  this.$postLink = () => { };
};

export default HomeController;
