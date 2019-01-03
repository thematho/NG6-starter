import login from './login'
import LoginController from './login.controller';
import loginComponent from './login.component';
import loginTemplate from './login.html';

describe('Component: login', () => {
  let $rootScope, makeController;

  beforeEach(window.module(login));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      let $ctrl = new LoginController();
      $ctrl.$onInit();
      return $ctrl;
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).toHaveProperty('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(loginTemplate).toMatch(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = loginComponent;

      it('includes the intended template',() => {
        expect(component.template).toEqual(loginTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).toEqual(LoginController);
      });
  });
});
