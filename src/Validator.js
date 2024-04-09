import StringSchema from './schemas/StringSchema.js';
import NumberSchema from './schemas/NumberSchema.js';
import ArraySchema from './schemas/ArraySchema.js';
import ObjectSchema from './schemas/ObjectSchema.js';

export default class Validator {
  constructor() {
    this.schemas = {
      String: StringSchema,
      Number: NumberSchema,
      Array: ArraySchema,
      Object: ObjectSchema,
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

  array() {
    this.schema = new this.schemas.Array();
    return this.schema;
  }

  object() {
    this.schema = new this.schemas.Object();
    return this.schema;
  }
}
