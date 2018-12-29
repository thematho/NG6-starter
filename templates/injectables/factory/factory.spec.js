import {{ camelCase name }} from './{{ dashCase name }}.factory'

describe('Factory: {{ camelCase name }}', () => {
  let factory;

  // Modules import
  beforeEach(() => {
    factory = {{ camelCase name }};
  });

  it('should create a {{ camelCase name }}Service [REMOVE]' , () => {
    let service = factory();
      expect(service).toHaveProperty('getName');
      expect(service.getName()).toEqual('{{ properCase name }}Service');
  });
});

