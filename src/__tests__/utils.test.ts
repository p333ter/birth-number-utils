import {
  addDelimeter,
  formatDate,
  getRandomDateBetween90and18YearsAgo,
  getRandomGender,
  nextNumberDivided11,
  paddingLeft,
  paddingRight,
} from '../utils/dates';

describe('Date and Utility Functions', () => {
  describe('getRandomDateBetween90and18YearsAgo', () => {
    it('generates a date between 90 and 18 years ago', () => {
      const date = getRandomDateBetween90and18YearsAgo();
      const currentDate = new Date();
      const age = currentDate.getFullYear() - date.getFullYear();
      expect(age).toBeGreaterThanOrEqual(18);
      expect(age).toBeLessThanOrEqual(90);
    });

    it('ensures random date is valid', () => {
      for (let i = 0; i < 10; i++) {
        const date = getRandomDateBetween90and18YearsAgo();
        expect(date).toBeInstanceOf(Date);
        expect(date.getFullYear()).toBeGreaterThanOrEqual(
          new Date().getFullYear() - 90
        );
        expect(date.getFullYear()).toBeLessThanOrEqual(
          new Date().getFullYear() - 18
        );
        expect(date.getMonth()).toBeLessThanOrEqual(11);
        expect(date.getDate()).toBeLessThanOrEqual(31);
      }
    });

    it('handles leap years correctly', () => {
      const leapYearDate = new Date(2000, 1, 29);
      expect(formatDate(leapYearDate)).toBe('29.02.2000');
    });
  });

  describe('getRandomGender', () => {
    it('generates a valid gender', () => {
      const gender = getRandomGender();
      expect(['MALE', 'FEMALE']).toContain(gender);
    });
  });

  describe('formatDate', () => {
    it('formats a date to DD.MM.YYYY', () => {
      const date = new Date(1990, 6, 20);
      const formatted = formatDate(date);
      expect(formatted).toBe('20.07.1990');
    });

    it('handles single digit days and months', () => {
      const date = new Date(1990, 0, 5);
      const formatted = formatDate(date);
      expect(formatted).toBe('05.01.1990');
    });
  });

  describe('paddingLeft', () => {
    it('pads a number with leading zeros', () => {
      expect(paddingLeft(5, 3)).toBe('005');
      expect(paddingLeft(123, 5)).toBe('00123');
    });

    it('does not pad if the number already meets the length', () => {
      expect(paddingLeft(123, 2)).toBe('123');
      expect(paddingLeft(1234, 4)).toBe('1234');
    });

    it('handles negative numbers', () => {
      expect(paddingLeft(-5, 3)).toBe('0-5');
      expect(paddingLeft(-123, 6)).toBe('00-123');
    });

    it('handles decimal numbers', () => {
      expect(paddingLeft(5.67, 5)).toBe('05.67');
    });

    it('handles invalid length parameters', () => {
      expect(paddingLeft(5, -1)).toBe('5');
      expect(paddingLeft(5, 0)).toBe('5');
    });

    it('adds padding to a zero value', () => {
      expect(paddingLeft(0, 5)).toBe('00000');
    });
  });



  describe('paddingRight', () => {
    it('pads a string with trailing zeros', () => {
      expect(paddingRight(5, 3)).toBe('5000');
      expect(paddingRight('12', 2)).toBe('1200');
    });

    it('does not pad if no padding is required', () => {
      expect(paddingRight('123', 0)).toBe('123');
      expect(paddingRight('1234', 0)).toBe('1234');
    });

    it('handles negative numbers', () => {
      expect(paddingRight(-5, 3)).toBe('-5000');
    });

    it('handles decimal numbers', () => {
      expect(paddingRight(5.67, 2)).toBe('5.6700');
    });

    it('adds padding to empty string', () => {
      expect(paddingRight('', 5)).toBe('00000');
    });
  });

  describe('addDelimeter', () => {
    it('adds a delimiter to a birth number', () => {
      expect(addDelimeter('1234567890')).toBe('123456/7890');
    });

    it('handles shorter input correctly', () => {
      expect(addDelimeter('1234567')).toBe('123456/7');
    });

    it('handles empty string', () => {
      expect(addDelimeter('')).toBe('/');
    });

    it('handles incomplete inputs', () => {
      expect(addDelimeter('12345')).toBe('12345/');
    });
  });

  describe('nextNumberDivided11', () => {
    it('returns the nearest number divisible by 11 for positive inputs', () => {
      expect(nextNumberDivided11(22)).toBe(22);
      expect(nextNumberDivided11(23)).toBe(22);
      expect(nextNumberDivided11(27)).toBe(22);
      expect(nextNumberDivided11(28)).toBe(33);
    });

    it('handles negative numbers correctly', () => {
      expect(nextNumberDivided11(-12)).toBe(-11);
      expect(nextNumberDivided11(-22)).toBe(-22);
      expect(nextNumberDivided11(-16)).toBe(-11);
      expect(nextNumberDivided11(-17)).toBe(-22);
    });

    it('handles edge cases with zero', () => {
      expect(nextNumberDivided11(0)).toBe(0);
      expect(nextNumberDivided11(5)).toBe(0);
      expect(nextNumberDivided11(-5)).toBe(0);
    });

    it('handles large numbers correctly', () => {
      expect(nextNumberDivided11(99999)).toBe(100001);
      expect(nextNumberDivided11(-99999)).toBe(-100001);
    });

    it('handles decimal numbers', () => {
      expect(nextNumberDivided11(22.4)).toBe(22);
      expect(nextNumberDivided11(22.6)).toBe(22);
      expect(nextNumberDivided11(27.6)).toBe(33);
    });

    it('handles special numeric values', () => {
      expect(nextNumberDivided11(Infinity)).toBe(NaN);
      expect(nextNumberDivided11(-Infinity)).toBe(NaN);
      expect(nextNumberDivided11(NaN)).toBe(NaN);
    });

    it('handles numbers at safe integer boundaries', () => {
      expect(nextNumberDivided11(Number.MAX_SAFE_INTEGER)).toBe(
        Math.ceil(Number.MAX_SAFE_INTEGER / 11) * 11
      );
      expect(nextNumberDivided11(Number.MIN_SAFE_INTEGER)).toBe(
        Math.floor(Number.MIN_SAFE_INTEGER / 11) * 11
      );
    });

    it('handles exact middle points', () => {
      expect(nextNumberDivided11(27.5)).toBe(33);
      expect(nextNumberDivided11(-16.5)).toBe(-22);
    });
  });
});
