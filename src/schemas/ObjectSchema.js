export default class ObjectSchema {
  constructor(rootValidator) {
    this.rootValidator = rootValidator;
    this.fieldsRules = {};
    this.inputValidRules = {
      rulesNotSet: (data) => typeof data === 'object'
          || data === null,
      rulesSet: (data) => typeof data === 'object'
          && data
          && !Array.isArray(data),
    };
    this.state = 'rulesNotSet';
  }

  shape(fieldsRules) {
    this.fieldsRules = fieldsRules;
    this.state = 'rulesSet';
    return this;
  }

  isValid(data) {
    let valid = true;
    switch (this.state) {
      case 'rulesNotSet':
        return this.inputValidRules[this.state](data);
      case 'rulesSet':
        if (!this.inputValidRules[this.state](data)) {
          return false;
        }
        for (const [field, value] of Object.entries(data)) {
          if (!this.fieldsRules[field].isValid(value)) {
            valid = false;
          }
        }
        return valid;
      default:
        console.log(`Error, unknown state ${this.state}`);
        return false;
    }
  }
}
