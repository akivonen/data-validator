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
    this.customValidators = {};
  }

  string = () => new this.schemas.String(this);

  number = () => new this.schemas.Number(this);

  array = () => new this.schemas.Array(this);

  object = () => new this.schemas.Object(this);

  addValidator(schema, name, fn) {
    if (typeof fn !== 'function') {
      console.log(`Error. ${fn} is not a function.`);
      return;
    }
    const capitalizedSchema = [schema[0].toUpperCase(), schema.slice(1)].join('');
    if (!Object.hasOwn(this.schemas, capitalizedSchema)) {
      console.log(`Error. Unknown data type ${schema}.`);
      return;
    }
    if (typeof name !== 'string') {
      console.log(`Error. Function name should be type of string, received ${name}.`);
      return;
    }
    const newCustomValidator = { [name]: fn };
    this.customValidators[schema] = newCustomValidator;
  }
}
