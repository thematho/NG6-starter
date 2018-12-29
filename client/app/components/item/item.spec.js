import ItemModule from './item'
import ItemController from './item.controller';

// Jest doesn't support flush pending promises so we use this module which is actually using
// setTimeout under the hood, but is good enought for now
import flushPromises from 'flush-promises';

import MockedItemService from './__mocks__/item.service';
jest.mock('./__mocks__/item.service');

// [NOTE] This Spec example is only for show how to stub a service which is
// using $http requests

describe('Component: item', () => {
  const mockedService = new MockedItemService();
  let makeController = () => {
    let $ctrl = new ItemController(mockedService);
    $ctrl.$onInit();
    return $ctrl;
  };

  beforeEach(() => {
    // Modules import
    window.module(ItemModule);
    mockedService.getName.mockImplementation(() => 'MockedName');
    mockedService.getItems.mockImplementation(() => {
      return Promise.resolve({ data: ['Item 1', 'Item 2'] });
      let ctrl = new ItemController(stubItemService);
      ctrl.$onInit();
      return ctrl;
    });
  });

  describe('Controller', () => {
    it('has a serviceName property provided by the ItemService[REMOVE]', async () => { // erase if removing this.name from the controller
      let controller = makeController();
      await flushPromises();
      expect(controller).toHaveProperty('serviceName');
      expect(mockedService.getName).toHaveBeenCalled();
    });

    it('has an items properties provided by a promise from the ItemService[REMOVE]', async () => { // erase if removing this.name from the controller
      let controller = makeController();
      await flushPromises();
      expect(mockedService.getItems).toHaveBeenCalled();
      expect(controller).toHaveProperty('items', ['Item 1', 'Item 2']);
    });
  });
});
