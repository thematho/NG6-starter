import {{ camelCase name }} from './{{ dashCase name }}'

describe('Filter: {{ camelCase name }}', () => {
  let filter;
  const testInputs = [
    { input: 'test input',  expected: 'TEST INPUT' },
    { input: 'Test Input',  expected: 'TEST INPUT' },
    { input: 'TEST INPUT',  expected: 'TEST INPUT' }
  ];

  // Modules import
  beforeEach(() => {
    filter = {{ camelCase name }}();
  });

it('should format entries to {{ camelCase name }} [REMOVE]' , () => {
    testInputs.forEach((test)=> {
      expect(filter(test.input)).toEqual(test.expected);
    });
  });
});

