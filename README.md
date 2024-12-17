# @ppasmik/birth-number-utils

[![npm version](https://img.shields.io/npm/v/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![NPM license](https://img.shields.io/npm/l/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![npm downloads](https://img.shields.io/npm/dm/@ppasmik/birth-number-utils?style=flat-square)](https://www.npmjs.com/package/@ppasmik/birth-number-utils)
[![Coverage Status](https://img.shields.io/coveralls/github/p333ter/birth-number-utils?style=flat-square)](https://coveralls.io/github/p333ter/birth-number-utils)
[![Build Status](https://img.shields.io/github/actions/workflow/status/p333ter/birth-number-utils/publish.yml?style=flat-square)](https://github.com/p333ter/birth-number-utils/actions)

A TypeScript/JavaScript library for generating, validating, and parsing 🇨🇿Czech and 🇸🇰Slovak birth numbers (rodné číslo). Built for reliability, performance, and ease of use.

## Installation

```
npm install @ppasmik/birth-number-utils
```

## Usage

### Generate Birth Numbers

```typescript
import { generateBirthNumber } from '@ppasmik/birth-number-utils';

// Generate a random birth number
const randomBirthNumber = generateBirthNumber();
console.log('Random Birth Number:', randomBirthNumber); // e.g., "900720/3117"

// Generate using string date (recommended)
const birthNumber1 = generateBirthNumber({
  gender: 'MALE',
  birthDate: '1985-11-19', // November 19, 1985 (YYYY-MM-DD format)
});

// Generate using Date object (note: months are 0-based in JavaScript Date)
const birthNumber2 = generateBirthNumber({
  gender: 'FEMALE',
  birthDate: new Date(1990, 6, 20), // July 20, 1990 (month 6 = July)
});
```

⚠️ **Important Note About Dates**:

- When using string dates (recommended): Months are 1-based (1 = January, 12 = December)
- When using JavaScript Date object: Months are 0-based (0 = January, 11 = December)
- Examples:

```typescript
// These create the same birth number (November 19, 1985):
generateBirthNumber({ birthDate: '1985-11-19' }); // string format
generateBirthNumber({ birthDate: new Date(1985, 10, 19) }); // Date object (10 = November)
```

### Validate Birth Numbers

```typescript
import { isValidBirthNumber } from '@ppasmik/birth-number-utils';

// Validate birth numbers
console.log(isValidBirthNumber('9007203117')); // true
console.log(isValidBirthNumber('9902291118')); // false (invalid date)
```

### Parse Birth Numbers

```typescript
import { parseBirthNumber } from '@ppasmik/birth-number-utils';

// Parse a valid birth number
const parsed = parseBirthNumber('9007203117');
if (parsed) {
  console.log('Parsed Birth Number:', parsed);
  // { birthDate: Date, gender: 'MALE', age: 33, ... }
} else {
  console.log('Invalid birth number.');
}

// Attempt to parse an invalid birth number
const invalidParse = parseBirthNumber('9902291118'); // 29th Feb 1999 does not exist
console.log('Parse Result:', invalidParse); // false
```

## Features

- **Generate** valid birth numbers following Czech/Slovak standards
- **Validate** existing birth numbers for correctness
- **Parse** birth numbers to extract information such as birth date and gender
- Supports both **formatted** (with \`/\`) and **raw** formats
- **TypeScript support** with strong typing for all APIs
- Comprehensive test coverage for edge cases
- Uses **dayjs** for robust date handling

## API Reference

### Generator

#### \`generateBirthNumber(options?: GeneratorOptions): string\`

**Options**:

- `gender`: `'MALE' | 'FEMALE'` (Optional, defaults to a random gender)
- `birthDate`: `Date` (Optional, defaults to a random date between 90 and 18 years ago)

**Returns**:

- A birth number in the format `YYYYMM/DDXX` (following Czech/Slovak standards)

---

### Validators

#### `isValidBirthNumber(birthNumber: string): boolean`

**Parameters**:

- `birthNumber`: A string containing the birth number to validate (formatted or raw)

**Returns**:

- `true` if the birth number is valid
- `false` otherwise

---

### Parsers

#### `parseBirthNumber(birthNumber: string): BirthNumberDetails | false`

**Parameters**:

- `birthNumber`: A string containing the birth number to parse (formatted or raw)

**Returns**:

- An object containing birth date, gender, and other details if valid
- `false` if the birth number is invalid

---

### Advanced Usage with BirthNumber class

For more complex operations, you can use the `BirthNumber` class or `rodnecislo` factory function:

```typescript
import { rodnecislo, BirthNumber } from '@ppasmik/birth-number-utils';

// Using factory function
const rc = rodnecislo('900720/3117');

// Or using class directly
const bn = new BirthNumber('900720/3117');

// Available methods
rc.isMale(); // true/false
rc.isFemale(); // false/true
rc.year(); // returns year (e.g., 1990)
rc.month(); // returns zero-based month (0-11)
rc.day(); // returns day of month (1-31)
rc.birthDate(); // returns Date object
rc.birthDateAsString(); // returns date in DD.MM.YYYY format
rc.isValid(); // true if valid and not in future
rc.isPossible(); // true if valid (even if in future)
rc.isAdult(); // checks if age >= 18
rc.isAdult(21); // checks if age >= custom value
rc.age(); // returns current age
rc.error(); // returns error message or null
```

## Contributing

We welcome contributions to enhance this library. If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request.

Please make sure to include tests for your changes.

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Peter Pasmik]
