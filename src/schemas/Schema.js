export default class Schema {
  constructor(rootValidator) {
    this.rootValidator = rootValidator;
    this.validators = {};
    this.checks = [];
    this.requiredValue = false;
  }

  addCheck(checkName, args = []) {
    const newCheck = {
      validate: this.validators[checkName],
      args,
    };
    this.checks.push(newCheck);
  }

  required() {
    this.requiredValue = true;
    this.addCheck('required');
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

  test(name, value = null) {
    const schema = this.constructor.name.replace('Schema', '').toLowerCase();
    const customValidator = this.rootValidator.customValidators[schema][name];
    this.checks.push({
      validate: customValidator,
      args: value,
    });
    return this;
  }
}
