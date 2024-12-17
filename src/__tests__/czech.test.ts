import { generateBirthNumber } from '../generators';
import { isValidBirthNumber } from '../validators';

describe('generateBirthNumber', () => {
  /**
   * @description Verifies that a valid male birth number is generated.
   * @test Ensures the generated male birth number matches the expected format `YYYYMM/DDDD`.
   */
  it('generates valid male birth number', () => {
    const result = generateBirthNumber({ gender: 'MALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/); // Matches format "YYYYMM/DDDD"
  });

  /**
   * @description Verifies that a valid female birth number is generated.
   * @test Ensures the generated female birth number matches the expected format `YYYYMM/DDDD`.
   */
  it('generates valid female birth number', () => {
    const result = generateBirthNumber({ gender: 'FEMALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/); // Matches format "YYYYMM/DDDD"
  });

  /**
   * @description Ensures the generated birth number passes validation.
   * @test Validates that the generated birth number is both syntactically correct and logically valid.
   */
  it('ensures the generated number passes validation', () => {
    const result = generateBirthNumber(); // Gender is optional
    expect(isValidBirthNumber(result)).toBe(true);
  });
});
