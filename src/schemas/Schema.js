export default class Schema {
  constructor() {
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
}
