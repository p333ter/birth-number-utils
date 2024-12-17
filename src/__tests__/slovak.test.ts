import { generateBirthNumber } from '../generators';
import { isValidBirthNumber } from '../validators';

describe('generateBirthNumber', () => {
  /**
   * @description Generates a birth number for a male and verifies it matches the correct format.
   * @test Ensures the birth number format is `YYYYMM/DDDD`, where:
   *       - `YYYY` is the year,
   *       - `MM` is the month,
   *       - `DDDD` is the unique serial part.
   */
  it('generates valid male birth number', () => {
    const result = generateBirthNumber({ gender: 'MALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/); // Matches expected format
  });

  /**
   * @description Generates a birth number for a female and verifies it matches the correct format.
   * @test Ensures the birth number format is `YYYYMM/DDDD`, where:
   *       - `YYYY` is the year,
   *       - `MM` is the adjusted month for females,
   *       - `DDDD` is the unique serial part.
   */
  it('generates valid female birth number', () => {
    const result = generateBirthNumber({ gender: 'FEMALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/); // Matches expected format
  });

  /**
   * @description Ensures the generated birth number is both syntactically and logically valid.
   * @test Verifies that the birth number passes the `isValidBirthNumber` validation function.
   */
  it('ensures the generated number passes validation', () => {
    const result = generateBirthNumber(); // Generates a random birth number
    expect(isValidBirthNumber(result)).toBe(true);
  });
});
