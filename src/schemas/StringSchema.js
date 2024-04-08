export default class StringSchema {
  constructor() {
    this.validators = {
      required: (data) => data && data.length > 0,
      contains: (data, args) => {
        const [string] = args;
        return data.includes(string);
      },
      minLength: (data, agrs) => {
        const [length] = agrs;
        return data.trim().length >= length;
      },
    };
    this.checks = [];
    this.requiredValue = false;
  }

  required() {
    this.requiredValue = true;
    const containsRule = {
      validate: this.validators.required,
    };
    this.checks.push(containsRule);
    return this;
  }

  contains(value) {
    this.checks = this.checks
      .filter((check) => check.validate.name !== 'contains');
    const containsRule = {
      validate: this.validators.contains,
      args: [value],
    };
    this.checks.push(containsRule);
    return this;
  }

  minLength(value) {
    this.checks = this.checks
      .filter((check) => check.validate.name !== 'minLength');
    const minLengthRule = {
      validate: this.validators.minLength,
      args: [value],
    };
    this.checks.push(minLengthRule);
    return this;
  }

  isValid(data) {
    let valid = true;
    this.checks.forEach((check) => {
      const { validate, args } = check;
      if (!validate(data, args)) {
        valid = false;
      }
    });
    return valid;
  }
}
