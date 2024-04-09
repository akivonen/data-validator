import Schema from './Schema.js';

export default class ArraySchema extends Schema {
  constructor(validators, checks, requiredValue, rootValidator) {
    super(validators, checks, requiredValue, rootValidator);
    this.validators = {
      required: (data) => Array.isArray(data),
      sizeof: (data, args) => {
        const [size] = args;
        return data.length >= size;
      },
    };
  }

  sizeof(value) {
    super.addCheck('sizeof', [value]);
    return this;
  }
}
