import Schema from './Schema.js';

export default class NumberSchema extends Schema {
  constructor(validators, checks, requiredValue) {
    super(validators, checks, requiredValue);
    this.validators = {
      required: (data) => data !== null && typeof data === 'number',
      positive: (data) => data >= 0,
      range: (data, args) => {
        const [min, max] = args;
        return data >= min && data <= max;
      },
    };
  }

  positive() {
    super.addCheck('positive');
    return this;
  }

  range(min, max) {
    this.checks = this.checks
      .filter((check) => check.validate.name !== 'minLength');
    super.addCheck('range', [min, max]);
    return this;
  }
}
