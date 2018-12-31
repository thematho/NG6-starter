import angular from 'angular';
import {{ camelCase name }} from './{{ dashCase name }}';

describe('Directive: {{ dashCase name }}', () => {
  let $compile, $timeout, $scope,
    el, htmlStr;
  let focusStub = jest.fn();

  // Modules import
  beforeEach(window.module({{ camelCase name }}));
  beforeEach(inject(($injector) => {
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $scope = $injector.get('$rootScope').$new();
    htmlStr = `<input id="testInput" type="text" test/>`;
    // Make Angular resolve the string
    el = angular.element(htmlStr);
    el.on('focus', focusStub);

    // Trigger digest cycle in order to see changes if needed
    $scope.$digest();
    // Compile the Element into a new scope
    $compile(el)($scope)


  }));

  it('input text should have focus [REMOVE]' , () => {
    expect(focusStub).toBeCalled();
  });
});

