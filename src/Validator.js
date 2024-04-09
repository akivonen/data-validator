import StringSchema from './schemas/StringSchema.js';
import NumberSchema from './schemas/NumberSchema.js';

export default class Validator {
  constructor() {
    this.schemas = {
      String: StringSchema,
      Number: NumberSchema,
    };
    this.schema = null;
  }

  string() {
    this.schema = new this.schemas.String();
    return this.schema;
  }

  number() {
    this.schema = new this.schemas.Number();
    return this.schema;
  }
}
