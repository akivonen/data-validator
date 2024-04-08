import { test, expect, beforeEach } from '@jest/globals';
import Validator from '../src/Validator.js';
import StringSchema from '../src/schemas/StringSchema.js';

let validator;
let schema;

beforeEach(() => {
  validator = new Validator();
  schema = validator.string();
});
test('stringSchema', () => {
  expect(schema).toBeInstanceOf(StringSchema);
});
test('string', () => {
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
