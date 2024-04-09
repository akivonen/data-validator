import Schema from './Schema.js';

export default class StringSchema extends Schema {
  constructor(validators, checks, requiredValue, rootValidator) {
    super(validators, checks, requiredValue, rootValidator);
    this.validators = {
      required: (data) => data !== null
        && data !== undefined
        && data.length > 0,
      contains: (data, args) => {
        const [string] = args;
        return data.includes(string);
      },
      minLength: (data, agrs) => {
        const [length] = agrs;
        return data.trim().length >= length;
      },
    };
  }

  contains(value) {
    this.checks = this.checks
      .filter((check) => check.validate.name !== 'contains');
    super.addCheck('contains', [value]);
    return this;
  }

  minLength(value) {
    this.checks = this.checks
      .filter((check) => check.validate.name !== 'minLength');
    super.addCheck('minLength', [value]);
    return this;
  }
}
