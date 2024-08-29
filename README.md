### Hexlet tests and linter status:
[![Actions Status](https://github.com/akivonen/js-oop-project-62/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/akivonen/js-oop-project-62/actions)
### Goal
In the Data Validator project I`ve used experience learned in OOP courses: class structure design, object composition, possibly inheritance, and definitely a fluent interface.
### Description
The Data Validator is a library that allows you to validate the correctness of any data. There are many such libraries in every programming language since almost all programs deal with external data that needs to be validated. Primarily, this refers to form data filled out by users. The project is based on the yup library.

Example usage:

```
const v = new Validator();

// Strings
const schema = v.required().string();

schema.isValid('what does the fox say'); // true
schema.isValid(''); // false

// Numbers
const schema = v.required().number().positive();

schema.isValid(-10); // false
schema.isValid(10); // true

// Object with structure validation support
const schema = v.shape({
  name: v.string().required(),
  age: v.number().positive(),
});

schema.isValid({ name: 'kolya', age: 100 }); // true
schema.isValid({ name: '', age: null }); // false

// Adding a new validator
const fn = (value, start) => value.startsWith(start);
v.addValidator('string', 'startWith', fn);

const schema = v.string().test('startWith', 'H');

schema.isValid('exlet'); // false
schema.isValid('Hexlet'); // true
```

### Domain-Specific Languages (DSL)
The interface of the validation library is a prime example of a DSL, a specialized language that allows you to declaratively describe what you want from the code. Code written in this style is significantly easier to read compared to directly creating objects. This approach is largely based on the fluent interface pattern.

### Architecture
The key part of the internal architecture is the organization of validators. This project supports extensibility through the addition of new validation rules.

### Testing and Debugging
Automated tests are an integral part of professional development. In this project I practiced TDD by writing tests before the code and used the Jest framework.
