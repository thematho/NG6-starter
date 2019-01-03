function AppRouter($compileProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  // $locationProvider.html5Mode(true).hashPrefix('!');

  $httpProvider.defaults.withCredentials = true;

  //Routing
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('about', {
      url: '/about',
      component: 'about'
    });
};

export default AppRouter;
