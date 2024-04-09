export default class ObjectSchema {
  constructor() {
    this.fieldsRules = {};
  }

  shape(fieldsRules) {
    this.fieldsRules = fieldsRules;
    return this;
  }

  isValid(data) {
    if (typeof data !== 'object') {
      return false;
    }
    let valid = true;
    for (const [field, value] of Object.entries(data)) {
      if (!this.fieldsRules[field].isValid(value)) {
        valid = false;
      }
    }
    return valid;
  }
}
