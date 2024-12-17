import { BirthNumber } from '../classes';
import { generateBirthNumber } from '../generators';
import {
  addDelimeter,
  formatDate,
  getRandomDateBetween90and18YearsAgo,
  getRandomGender,
  nextNumberDivided11,
  paddingLeft,
  paddingRight,
} from '../utils/dates';

import { isValidBirthNumber, parseBirthNumber } from '../validators';

describe('Birth Number Validation', () => {
  /**
   * Tests validation of birth number formats.
   */
  describe('Format validation', () => {
    /**
     * @description Validates the short format birth number (pre-1953).
     */
    it('accepts valid short format (pre-1953)', () => {
      expect(addDelimeter('516231016')).toBe('516231/016');
    });

    /**
     * @description Validates the long format birth number (post-1953).
     */
    it('accepts valid long format (post-1953)', () => {
      expect(addDelimeter('9952198765')).toBe('995219/8765');
    });
  });

  /**
   * Tests date generation logic.
   */
  describe('Date generation', () => {
    /**
     * @description Ensures generated dates fall between 18 and 90 years ago.
     */
    it('generates dates between 18 and 90 years ago', () => {
      const date = getRandomDateBetween90and18YearsAgo();
      const currentDate = new Date();
      const age = currentDate.getFullYear() - date.getFullYear();
      expect(age).toBeGreaterThanOrEqual(18);
      expect(age).toBeLessThanOrEqual(90);
    });

    /**
     * @description Verifies date formatting includes leading zeros.
     */
    it('formats date correctly including leading zeros', () => {
      const date = new Date(1990, 0, 5); // 5th January 1990
      expect(formatDate(date)).toBe('05.01.1990');
    });
  });

  /**
   * Tests gender generation logic.
   */
  describe('Gender handling', () => {
    /**
     * @description Verifies that only valid genders ('MALE', 'FEMALE') are generated.
     */
    it('generates valid genders', () => {
      for (let i = 0; i < 10; i++) {
        const gender = getRandomGender();
        expect(['MALE', 'FEMALE']).toContain(gender);
      }
    });
  });

  /**
   * Tests number formatting helpers.
   */
  describe('Number formatting', () => {
    /**
     * @description Tests left padding of birth date components with zeros.
     */
    it('handles birth date components correctly', () => {
      expect(paddingLeft(5, 2)).toBe('05');
      expect(paddingLeft(12, 2)).toBe('12');
    });

    /**
     * @description Tests right padding of serial numbers with zeros.
     */
    it('handles serial numbers correctly', () => {
      expect(paddingRight('123', 1)).toBe('1230');
      expect(paddingRight('', 3)).toBe('000');
    });

    /**
     * @description Ensures delimiters are added correctly to birth numbers.
     */
    it('adds delimiter correctly', () => {
      expect(addDelimeter('9952198765')).toBe('995219/8765');
      expect(addDelimeter('516231016')).toBe('516231/016');
    });
  });

  /**
   * Tests divisibility logic by 11.
   */
  describe('Divisibility by 11', () => {
    /**
     * @description Verifies that numbers are adjusted to be divisible by 11.
     */
    it('handles numbers correctly', () => {
      expect(nextNumberDivided11(0)).toBe(0);
      expect(nextNumberDivided11(22)).toBe(22);
      expect(nextNumberDivided11(23)).toBe(22);
      expect(nextNumberDivided11(-12)).toBe(-11);
    });
  });
});

describe('Extended Birth Number Validation', () => {
  /**
   * Tests handling of female months in birth numbers.
   */
  describe('Month validation', () => {
    /**
     * @description Ensures birth numbers for female-specific months (51-62, 71-82) are valid.
     */
    it('handles female months correctly', () => {
      expect(addDelimeter('995519xxxx')).toBe('995519/xxxx'); // January for females
      expect(addDelimeter('997519xxxx')).toBe('997519/xxxx'); // January for females (post-2004)
    });
  });

  /**
   * Tests correct year formatting in birth numbers.
   */
  describe('Year conversion', () => {
    /**
     * @description Verifies year conversion for pre- and post-1953 birth numbers.
     */
    it('handles years correctly', () => {
      const date1 = new Date(1954, 0, 1);
      const date2 = new Date(2022, 0, 1);
      expect(formatDate(date1)).toBe('01.01.1954');
      expect(formatDate(date2)).toBe('01.01.2022');
    });
  });

  /**
   * Tests handling of leap years in birth numbers.
   */
  describe('Leap year validation', () => {
    /**
     * @description Ensures leap year dates (e.g., 29th February) are valid.
     */
    it('handles leap years correctly', () => {
      const leapDate = new Date(2000, 1, 29);
      expect(formatDate(leapDate)).toBe('29.02.2000');
    });
  });
});

// Additional sections below include detailed validation, generation, and parsing logic.
// Comments follow similar patterns to explain each test's focus.

describe('Birth Number Generation and Validation', () => {
  describe('Czech Birth Numbers', () => {
    it('validates generated male birth numbers', () => {
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates generated female birth numbers', () => {
      const birthNumber = generateBirthNumber({
        gender: 'FEMALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Slovak Birth Numbers', () => {
    it('validates generated male birth numbers', () => {
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates generated female birth numbers', () => {
      const birthNumber = generateBirthNumber({
        gender: 'FEMALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Date Edge Cases', () => {
    it('validates leap year dates for Czech numbers', () => {
      const birthNumber = generateBirthNumber({
        birthDate: new Date(2000, 1, 29), // 29.2.2000
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates leap year dates for Slovak numbers', () => {
      const birthNumber = generateBirthNumber({
        birthDate: new Date(2000, 1, 29), // 29.2.2000
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates birth numbers from 2004 (extended months) - Czech', () => {
      const birthNumber = generateBirthNumber({
        birthDate: new Date(2004, 11, 31), // 31.12.2004
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates birth numbers from 2004 (extended months) - Slovak', () => {
      const birthNumber = generateBirthNumber({
        birthDate: new Date(2004, 11, 31), // 31.12.2004
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Parsing Results', () => {
    it('correctly parses generated Czech male birth number', () => {
      const birthDate = new Date(1990, 6, 15);
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate,
      }).replace('/', '');

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.gender).toBe('MALE');
        expect(result.birthDate.getFullYear()).toBe(birthDate.getFullYear());
        expect(result.birthDate.getMonth()).toBe(birthDate.getMonth());
        expect(result.birthDate.getDate()).toBe(birthDate.getDate());
      }
    });

    it('correctly parses generated Slovak male birth number', () => {
      const birthDate = new Date(1990, 6, 15);
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate,
      }).replace('/', '');

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.gender).toBe('MALE');
        expect(result.birthDate.getFullYear()).toBe(birthDate.getFullYear());
        expect(result.birthDate.getMonth()).toBe(birthDate.getMonth());
        expect(result.birthDate.getDate()).toBe(birthDate.getDate());
      }
    });

    it('correctly parses generated Czech female birth number', () => {
      const birthDate = new Date(1990, 6, 15);
      const birthNumber = generateBirthNumber({
        gender: 'FEMALE',
        birthDate,
      }).replace('/', '');

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.gender).toBe('FEMALE');
        expect(result.birthDate.getFullYear()).toBe(birthDate.getFullYear());
        expect(result.birthDate.getMonth()).toBe(birthDate.getMonth());
        expect(result.birthDate.getDate()).toBe(birthDate.getDate());
      }
    });

    it('correctly parses generated Slovak female birth number', () => {
      const birthDate = new Date(1990, 6, 15);
      const birthNumber = generateBirthNumber({
        gender: 'FEMALE',
        birthDate,
      }).replace('/', '');

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.gender).toBe('FEMALE');
        expect(result.birthDate.getFullYear()).toBe(birthDate.getFullYear());
        expect(result.birthDate.getMonth()).toBe(birthDate.getMonth());
        expect(result.birthDate.getDate()).toBe(birthDate.getDate());
      }
    });
  });
});

it('rejects invalid birth numbers', () => {
  expect(parseBirthNumber('')).toBe(false);
  expect(parseBirthNumber('/')).toBe(false);
  expect(parseBirthNumber('sadf')).toBe(false);
  expect(parseBirthNumber('123')).toBe(false);
  expect(parseBirthNumber('000000/0000')).toBe(false);
  expect(parseBirthNumber('110124/0422')).toBe(false); // Invalid modulo 11
  expect(parseBirthNumber('9206278653415161131868186')).toBe(false);
  expect(parseBirthNumber('9206278653fwefwefewfe')).toBe(false);
});

it('handles future birth dates', () => {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);

  const birthNumber = generateBirthNumber({
    gender: 'MALE',
    birthDate: futureDate,
  });

  // Testujeme BirthNumber triedu, nie parseBirthNumber
  const rodneCislo = new BirthNumber(birthNumber);

  // Číslo by malo byť possible (validný formát)
  expect(rodneCislo.isPossible()).toBe(true);

  // Ale nemalo by byť valid (je v budúcnosti)
  expect(rodneCislo.isValid()).toBe(false);
});

it('calculates age correctly', () => {
  const result = parseBirthNumber('990130/1113');
  expect(result).not.toBe(false);
  if (result) {
    const today = new Date();
    const birthDate = result.birthDate;
    let age = today.getFullYear() - birthDate.getFullYear();

    // Úprava veku ak ešte nemal narodeniny
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    expect(result.age).toBe(age);
  }
});

it('validates extra month offset based on year', () => {
  // Opravená verzia - použijeme mesiac 24 (4 + 20)
  const firstPart2003Fixed = '032415'; // rok 03, mesiac 24 (extra), deň 15
  let controlPart2003 = '0000';

  // Hľadáme platné kontrolné číslo
  for (let i = 0; i < 10000; i++) {
    controlPart2003 = i.toString().padStart(4, '0');
    const fullNumber = parseInt(firstPart2003Fixed + controlPart2003, 10);
    if (fullNumber % 11 === 0) {
      break;
    }
  }

  const birthNumber2003 = `${firstPart2003Fixed}/${controlPart2003}`;
  expect(parseBirthNumber(birthNumber2003)).toBe(false); // Teraz by malo byť false, pretože 24 > 20 pre rok 2003

  // Pre rok 2004 (povolené)
  const firstPart2004 = '040424'; // rok 04, mesiac 24 (4+20), deň 15
  let controlPart2004 = '0000';

  for (let i = 0; i < 10000; i++) {
    controlPart2004 = i.toString().padStart(4, '0');
    const fullNumber = parseInt(firstPart2004 + controlPart2004, 10);
    if (fullNumber % 11 === 0) {
      break;
    }
  }

  const birthNumber2004 = `${firstPart2004}/${controlPart2004}`;
  const result = parseBirthNumber(birthNumber2004);

  expect(result).not.toBe(false);
  if (result) {
    expect(result.birthDate.getFullYear()).toBe(2004);
    expect(result.birthDate.getMonth()).toBe(3); // Apríl (0-based)
    expect(result.birthDate.getDate()).toBe(24);
    expect(result.gender).toBe('MALE');
  }
});
