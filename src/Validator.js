import StringSchema from './schemas/StringSchema.js';

export default class Validator {
  constructor() {
    this.schemas = {
      String: StringSchema,
    };
    this.schema = null;
  }

  string() {
    this.schema = new this.schemas.String();
    return this.schema;
  }
}
