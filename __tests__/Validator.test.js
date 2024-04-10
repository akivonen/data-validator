import { test, expect, beforeEach } from '@jest/globals';
import Validator from '../src/Validator.js';
import StringSchema from '../src/schemas/StringSchema.js';
import NumberSchema from '../src/schemas/NumberSchema.js';
import ArraySchema from '../src/schemas/ArraySchema.js';
import ObjectSchema from '../src/schemas/ObjectSchema.js';

let v;
let schema;

beforeEach(() => {
  v = new Validator();
});

test('string', () => {
  schema = v.string();

  expect(schema).toBeInstanceOf(StringSchema);
  expect(schema.isValid('test')).toBeTruthy();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid(undefined)).toBeTruthy();

  schema.required();
  expect(schema.isValid('')).toBeFalsy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid('test')).toBeTruthy();

  schema.contains('');
  expect(schema.isValid('this is the test string')).toBeTruthy();

  schema.contains('test');
  expect(schema.isValid('this is the test string')).toBeTruthy();

  schema.contains('tesq');
  expect(schema.isValid('this is the test string')).toBeFalsy();

  schema.minLength(5);
  expect(schema.isValid('tesq')).toBeFalsy();
  expect(schema.isValid('tesqngd')).toBeTruthy();

  schema.contains('hexlet')
    .minLength(3)
    .minLength(6);
  expect(schema.isValid('hexlet')).toBeTruthy();
});

test('number', () => {
  schema = v.number();
  expect(schema).toBeInstanceOf(NumberSchema);
  expect(schema.isValid(null)).toBeTruthy();

  schema.required();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid(5)).toBeTruthy();

  schema.range(-8, 8);
  expect(schema.isValid(-4)).toBeTruthy();
  expect(schema.isValid(5)).toBeTruthy();

  expect(schema.positive().isValid(8)).toBeTruthy();
  expect(schema.isValid(-7)).toBeFalsy();
});

test('numberPositiveRequired', () => {
  schema = v.number();
  schema.positive();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.required().isValid(0)).toBeFalsy();
});

test('array', () => {
  schema = v.array();
  expect(schema).toBeInstanceOf(ArraySchema);
  expect(schema.isValid(null)).toBeTruthy();

  schema.required();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid('test')).toBeFalsy();
  expect(schema.isValid([])).toBeTruthy();
  expect(schema.isValid(['test'])).toBeTruthy();
  expect(schema.isValid(7)).toBeFalsy();

  schema.sizeof(2);
  expect(schema.isValid(['test', 'string'])).toBeTruthy();
  expect(schema.isValid(['test'])).toBeFalsy();
});

test('object', () => {
  schema = v.object();
  expect(schema).toBeInstanceOf(ObjectSchema);

  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });
  expect(schema.isValid({})).toBeTruthy();
  expect(schema.isValid([])).toBeFalsy();
  expect(schema.isValid('test')).toBeFalsy();
  expect(schema.isValid(7)).toBeFalsy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid(undefined)).toBeFalsy();
  expect(schema.isValid(false)).toBeFalsy();
  expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(schema.isValid({ name: '', age: null })).toBeFalsy();
  expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();
});

test('customValidator', () => {
  const stringfn = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', stringfn);

  schema = v.string().test('startWith', 't');
  expect(schema.isValid('hello')).toBeFalsy();
  expect(schema.isValid('test')).toBeTruthy();

  const numberFn = (value, min) => value >= min;
  v.addValidator('number', 'min', numberFn);

  schema = v.number().test('min', 7);
  expect(schema.isValid(8)).toBeTruthy();
  expect(schema.isValid(5)).toBeFalsy();
});
