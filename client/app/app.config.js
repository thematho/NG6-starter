import translationsEN from '../translate/en.json';
import translationsES from '../translate/es.json';

function AppConfig(
  $compileProvider, $locationProvider,
  $translateProvider,
) {
  'ngInject';

  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');

  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('es', translationsES);
  $translateProvider.fallbackLanguage('en');
  $translateProvider.preferredLanguage('en');
};

export default AppConfig;
