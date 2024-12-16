import { generateCzechBirthNumber } from '../generators/czech';
import { generateSlovakBirthNumber } from '../generators/slovak';
import {
  addDelimeter,
  formatDate,
  getRandomDateBetween90and18YearsAgo,
  getRandomGender,
  nextNumberDivided11,
  paddingLeft,
  paddingRight,
} from '../utils/dates';

import {
  isValidBirthNumber,
  parseBirthNumber,
} from '../validators';


describe('Birth Number Validation', () => {
  describe('Format validation', () => {
    it('accepts valid short format (pre-1953)', () => {
      expect(addDelimeter('516231016')).toBe('516231/016');
    });

    it('accepts valid long format (post-1953)', () => {
      expect(addDelimeter('9952198765')).toBe('995219/8765');
    });
  });

  describe('Date generation', () => {
    it('generates dates between 18 and 90 years ago', () => {
      const date = getRandomDateBetween90and18YearsAgo();
      const currentDate = new Date();
      const age = currentDate.getFullYear() - date.getFullYear();
      expect(age).toBeGreaterThanOrEqual(18);
      expect(age).toBeLessThanOrEqual(90);
    });

    it('formats date correctly including leading zeros', () => {
      const date = new Date(1990, 0, 5); // 5th January 1990
      expect(formatDate(date)).toBe('05.01.1990');
    });
  });

  describe('Gender handling', () => {
    it('generates valid genders', () => {
      for (let i = 0; i < 10; i++) {
        const gender = getRandomGender();
        expect(['MALE', 'FEMALE']).toContain(gender);
      }
    });
  });

  describe('Number formatting', () => {
    // Testy pre paddingLeft
    it('handles birth date components correctly', () => {
      expect(paddingLeft(5, 2)).toBe('05');
      expect(paddingLeft(12, 2)).toBe('12');
    });

    // Testy pre paddingRight
    it('handles serial numbers correctly', () => {
      expect(paddingRight('123', 1)).toBe('1230');
      expect(paddingRight('', 3)).toBe('000');
    });

    // Testy pre delimeter
    it('adds delimiter correctly', () => {
      expect(addDelimeter('9952198765')).toBe('995219/8765');
      expect(addDelimeter('516231016')).toBe('516231/016');
    });
  });

  describe('Divisibility by 11', () => {
    it('handles numbers correctly', () => {
      expect(nextNumberDivided11(0)).toBe(0);
      expect(nextNumberDivided11(22)).toBe(22);
      expect(nextNumberDivided11(23)).toBe(22);
      expect(nextNumberDivided11(-12)).toBe(-11);
    });
  });
});

describe('Extended Birth Number Validation', () => {
  describe('Month validation', () => {
    it('handles female months correctly', () => {
      // Test pre mesiace 51-62
      expect(addDelimeter('995519xxxx')).toBe('995519/xxxx'); // Január pre ženu
      // Test pre mesiace 71-82
      expect(addDelimeter('997519xxxx')).toBe('997519/xxxx'); // Január pre ženu (post-2004)
    });
  });

  describe('Year conversion', () => {
    it('handles years correctly', () => {
      // Pre yy >= 54
      const date1 = new Date(1954, 0, 1);
      // Pre yy < 53
      const date2 = new Date(2022, 0, 1);
      expect(formatDate(date1)).toBe('01.01.1954');
      expect(formatDate(date2)).toBe('01.01.2022');
    });
  });

  describe('Leap year validation', () => {
    it('handles leap years correctly', () => {
      const leapDate = new Date(2000, 1, 29);
      expect(formatDate(leapDate)).toBe('29.02.2000');
    });
  });
});

describe('Birth Number Generation and Validation', () => {
  describe('Czech Birth Numbers', () => {
    it('validates generated male birth numbers', () => {
      const birthNumber = generateCzechBirthNumber({
        gender: 'MALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates generated female birth numbers', () => {
      const birthNumber = generateCzechBirthNumber({
        gender: 'FEMALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Slovak Birth Numbers', () => {
    it('validates generated male birth numbers', () => {
      const birthNumber = generateSlovakBirthNumber({
        gender: 'MALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates generated female birth numbers', () => {
      const birthNumber = generateSlovakBirthNumber({
        gender: 'FEMALE',
        birthDate: new Date(1990, 6, 15), // 15.7.1990
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Date Edge Cases', () => {
    it('validates leap year dates for Czech numbers', () => {
      const birthNumber = generateCzechBirthNumber({
        birthDate: new Date(2000, 1, 29), // 29.2.2000
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates leap year dates for Slovak numbers', () => {
      const birthNumber = generateSlovakBirthNumber({
        birthDate: new Date(2000, 1, 29), // 29.2.2000
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates birth numbers from 2004 (extended months) - Czech', () => {
      const birthNumber = generateCzechBirthNumber({
        birthDate: new Date(2004, 11, 31), // 31.12.2004
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });

    it('validates birth numbers from 2004 (extended months) - Slovak', () => {
      const birthNumber = generateSlovakBirthNumber({
        birthDate: new Date(2004, 11, 31), // 31.12.2004
      }).replace('/', '');

      expect(isValidBirthNumber(birthNumber)).toBe(true);
    });
  });

  describe('Parsing Results', () => {
    it('correctly parses generated Czech male birth number', () => {
      const birthDate = new Date(1990, 6, 15);
      const birthNumber = generateCzechBirthNumber({
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
      const birthNumber = generateSlovakBirthNumber({
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
      const birthNumber = generateCzechBirthNumber({
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
      const birthNumber = generateSlovakBirthNumber({
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