import Schema from './Schema.js';

export default class ArraySchema extends Schema {
  constructor(validators, checks, requiredValue) {
    super(validators, checks, requiredValue);
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
