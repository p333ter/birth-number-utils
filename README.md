# @ppasmik/birth-number-utils

[![npm version](https://img.shields.io/npm/v/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![NPM license](https://img.shields.io/npm/l/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![npm downloads](https://img.shields.io/npm/dm/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![Coverage Status](https://img.shields.io/coveralls/github/p333ter/birth-number-utils?style=flat-square)](https://coveralls.io/github/p333ter/birth-number-utils)
[![Build Status](https://img.shields.io/github/actions/workflow/status/p333ter/birth-number-utils/publish.yml?style=flat-square)](https://github.com/p333ter/birth-number-utils/actions)

A TypeScript/JavaScript library for generating, validating, and parsing Czech and Slovak birth numbers (rodné číslo).

## Installation

```bash
npm install @ppasmik/birth-number-utils
```

## Usage

### Generate Birth Numbers

#### Czech Birth Number

```typescript
import { generateCzechBirthNumber } from '@ppasmik/birth-number-utils';

// Generate a random Czech birth number
const randomCzechBirthNumber = generateCzechBirthNumber();
console.log('Random Czech Birth Number:', randomCzechBirthNumber); // e.g., "900720/3117"

// Generate a Czech birth number with specific parameters
const customCzechBirthNumber = generateCzechBirthNumber({
  gender: 'FEMALE',
  birthDate: new Date(1990, 6, 20), // 20th July 1990
});
console.log('Custom Czech Birth Number:', customCzechBirthNumber); // e.g., "905720/3111"
```

#### Slovak Birth Number

```typescript
import { generateSlovakBirthNumber } from '@ppasmik/birth-number-utils';

// Generate a random Slovak birth number
const randomSlovakBirthNumber = generateSlovakBirthNumber();
console.log('Random Slovak Birth Number:', randomSlovakBirthNumber); // e.g., "900720/3117"

// Generate a Slovak birth number with specific parameters
const customSlovakBirthNumber = generateSlovakBirthNumber({
  gender: 'MALE',
  birthDate: new Date(1985, 11, 25), // 25th December 1985
});
console.log('Custom Slovak Birth Number:', customSlovakBirthNumber); // e.g., "851225/1234"
```

### Validate Birth Numbers

```typescript
import { isValidBirthNumber } from '@ppasmik/birth-number-utils';

// Validate Czech or Slovak birth numbers
console.log(isValidBirthNumber('9007203117')); // true
console.log(isValidBirthNumber('9902291118')); // false (invalid date)
```

### Parse Birth Numbers

```typescript
import { parseBirthNumber } from '@ppasmik/birth-number-utils';

// Parse a valid Czech or Slovak birth number
const parsed = parseBirthNumber('9007203117');
if (parsed) {
  console.log('Parsed Birth Number:', parsed);
  // { birthDate: Date, gender: 'MALE' }
} else {
  console.log('Invalid birth number.');

// Attempt to parse an invalid birth number
const invalidParse = parseBirthNumber('9902291118'); // 29th Feb 1999 does not exist
console.log('Parse Result:', invalidParse); // false
```

## Features

- **Generate** valid Czech and Slovak birth numbers.
- **Validate** existing birth numbers for correctness.
- **Parse** birth numbers to extract information such as birth date and gender.
- Supports both **formatted** (with `/`) and **raw** formats.
- **TypeScript support** with strong typing for all APIs.
- Comprehensive test coverage for edge cases.
- Uses **dayjs** for robust date handling.

## API Reference

### Generators

#### `generateCzechBirthNumber(options?: GeneratorOptions): string`

#### `generateSlovakBirthNumber(options?: GeneratorOptions): string`

**Options**:

- `gender`: `'MALE' | 'FEMALE'` (Optional, defaults to a random gender)
- `birthDate`: `Date` (Optional, defaults to a random date between 90 and 18 years ago)

**Returns**:

- A birth number in the format `YYYYMM/DDXX` (Czech and Slovak standards).

---

### Validators

#### `isValidBirthNumber(birthNumber: string): boolean`

**Parameters**:

- `birthNumber`: A string containing the birth number to validate (formatted or raw).

**Returns**:

- `true` if the birth number is valid.
- `false` otherwise.

---

### Parsers

#### `parseBirthNumber(birthNumber: string): { birthDate: Date; gender: string } | false`

**Parameters**:

- `birthNumber`: A string containing the birth number to parse (formatted or raw).

**Returns**:

- An object containing the `birthDate` and `gender` if valid.
- `false` if the birth number is invalid.

---

## Contributing

We welcome contributions to enhance this library. If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request.

Please make sure to include tests for your changes.

---

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Peter Pasmik]
