import EncryptionModule from './encryption';
import EncryptionService from './encryption.service';

describe('Module meanTemplate.encryption', () => {

  // Load involved Modules
  beforeEach(window.module(EncryptionModule));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    // [CAVEAT] If you have several services in one module you should
    // create a separate spec file for the module and for each module and service
  });

  describe('EncryptionService', () => {
    let $httpBackend, getService, mockHttp;

    beforeEach(inject(($injector) => {
      let injections = [ $injector.get('$resource') /*[, otherDependency]*/];

      $httpBackend = $injector.get('$httpBackend');
      getService = () => {
        // You can use injection to obtain the service but you really should
        // test the service alone as a function and provide the injections yourself
        // return $injector.get('EncryptionService');
        return new EncryptionService(...injections);
      },
      mockHttp = (url, response) => {
        $httpBackend.whenGET(url)
          .respond(() => {
            return response;
          });
      };
    }));

it('has a getName property [REMOVE]', () => { // erase if removing this.items from the service
      let service = getService();
      expect(service).toHaveProperty('getName');
    });

    describe('HTTP requests', () => {
      let itemsUrl = /services\/items/;

      // Verify no outstanding expectation or request
      afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      describe('When response is successful', () => {
        beforeEach(() => {
          let data = [{name: 'Item1'}, {name: 'Item2'}];
          mockHttp(itemsUrl, [200, data, {}]);
        });

        it('Should return items [REMOVE]', (done) => { // erase if removing this.items from the service
          let service = getService();

          service.getItems().then((response) => {
            expect(response.data).toHaveLength(2);
            done();
          });

          $httpBackend.flush();
        });
      });

      describe('When request returns error', () => {
        beforeEach(() => {
          mockHttp(itemsUrl, [500]);
        });

        it('should return items [REMOVE]', (done) => { // erase if removing this.items from the service
          let service = getService();

          service.getItems()
          .then((response) => {}, (response) => {
              expect(response.data).toBeUndefined;
              done();
            });

          $httpBackend.flush();
        });
      });
    });

  });
});
0
