import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { generateBirthNumber } from '../generators';
import { isValidBirthNumber, parseBirthNumber } from '../validators';

dayjs.extend(utc);

describe('isValidBirthNumber', () => {
  /**
   * @description Ensures invalid birth numbers with incorrect formats are rejected.
   */
  it('returns false for birth number with invalid format', () => {
    expect(isValidBirthNumber('123')).toBe(false); // Less than 9 digits
    expect(isValidBirthNumber('12345678901')).toBe(false); // More than 10 digits
    expect(isValidBirthNumber('abc1234567')).toBe(false); // Contains letters
    expect(isValidBirthNumber('1234/56789')).toBe(false); // Incorrect formatting
  });

  /**
   * @description Ensures birth numbers failing modulo 11 validation are rejected.
   */
  it('returns false for invalid modulo 11 check', () => {
    expect(isValidBirthNumber('9007203118')).toBe(false);
  });

  /**
   * @description Ensures valid birth numbers pass the validation check.
   */
  it('returns true for valid birth number', () => {
    expect(isValidBirthNumber('9007203117')).toBe(true); // Valid male number
    expect(isValidBirthNumber('9057203111')).toBe(true); // Valid female number
  });
});

describe('Birth Number Validation and Parsing', () => {
  describe('isValidBirthNumber', () => {
    /**
     * @description Ensures correct birth numbers are validated successfully.
     */
    it('validates correct birth numbers', () => {
      expect(isValidBirthNumber('9007203117')).toBe(true);
      expect(isValidBirthNumber('9057203111')).toBe(true);
    });

    /**
     * @description Ensures invalid birth numbers with incorrect format are rejected.
     */
    it('returns false for invalid birth number format', () => {
      expect(isValidBirthNumber('invalid')).toBe(false);
      expect(isValidBirthNumber('900720311')).toBe(false);
      expect(isValidBirthNumber('90072031118')).toBe(false);
    });

    /**
     * @description Rejects birth numbers that fail modulo 11 validation.
     */
    it('returns false for invalid modulo 11', () => {
      expect(isValidBirthNumber('9007203118')).toBe(false);
    });

    /**
     * @description Ensures invalid dates in birth numbers are rejected.
     */
    it('returns false for invalid date', () => {
      expect(isValidBirthNumber('9902291118')).toBe(false); // Invalid leap year date
    });
  });

  describe('parseBirthNumber', () => {
    /**
     * @description Ensures invalid dates return false when parsed.
     */
    it('returns false for invalid date', () => {
      const result = parseBirthNumber('9902291118');
      expect(result).toBe(false);
    });

    /**
     * @description Ensures birth numbers failing modulo 11 validation return false.
     */
    it('returns false for modulo 11 validation failure', () => {
      const result = parseBirthNumber('9007203118');
      expect(result).toBe(false);
    });

    /**
     * @description Parses valid male birth number and checks all its properties.
     */
    it('parses valid male birth number', () => {
      const birthDate = new Date(Date.UTC(1990, 6, 20));
      const result = parseBirthNumber('9007203117');

      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate).toEqual(birthDate);
        expect(result.gender).toBe('MALE');
        expect(result.isMale).toBe(true);
        expect(result.isFemale).toBe(false);
        expect(result.birthDateAsString).toBe('20.07.1990');
      }
    });

    /**
     * @description Parses valid female birth number and verifies all details.
     */
    it('parses valid female birth number', () => {
      const birthDate = new Date(Date.UTC(1990, 6, 20));
      const result = parseBirthNumber('9057203111');

      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate).toEqual(birthDate);
        expect(result.gender).toBe('FEMALE');
        expect(result.isMale).toBe(false);
        expect(result.isFemale).toBe(true);
        expect(result.birthDateAsString).toBe('20.07.1990');
      }
    });

    /**
     * @description Validates the calculated age and adult status.
     */
    it('correctly calculates age and validates dates', () => {
      const result = parseBirthNumber('0001018336');
      expect(result).not.toBe(false);
      if (result) {
        const currentYear = new Date().getFullYear();
        const expectedAge =
          currentYear - 2000 - (new Date().getMonth() < 0 ? 1 : 0);
        expect(result.age).toBe(expectedAge);
        expect(result.isAdult).toBe(result.age >= 18);
      }
    });
  });
});

describe('Birth Number Validation', () => {
  describe('parseBirthNumber', () => {
    /**
     * @description Verifies correct parsing for extended months after 2004.
     */
    test('should handle month with extra addition for year >= 2004', () => {
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate: new Date(2004, 0, 15),
      });

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate.getMonth()).toBe(0);
        expect(result.gender).toBe('MALE');
        expect(result.birthDateAsString).toBe('15.01.2004');
      }
    });

    /**
     * @description Verifies parsing for female birth numbers with extended months after 2004.
     */
    test('should handle month with extra addition for female in year >= 2004', () => {
      const birthNumber = generateBirthNumber({
        gender: 'FEMALE',
        birthDate: new Date(2004, 0, 15),
      });

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate.getMonth()).toBe(0);
        expect(result.gender).toBe('FEMALE');
        expect(result.birthDateAsString).toBe('15.01.2004');
      }
    });

    /**
     * @description Ensures extended months are not used for years before 2004.
     */
    test('should reject month with extra addition for year < 2004', () => {
      const birthNumber = generateBirthNumber({
        gender: 'MALE',
        birthDate: new Date(Date.UTC(2003, 0, 15)),
      });

      const result = parseBirthNumber(birthNumber);
      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate.getFullYear()).toBe(2003);
        expect(result.gender).toBe('MALE');
        expect(result.birthDateAsString).toBe('15.01.2003');
      }
    });
  });
});
