import { generateCzechBirthNumber } from '../generators/czech';
import {
  isValidBirthNumber,
} from '../validators';

describe('generateCzechBirthNumber', () => {
  it('generates valid male birth number', () => {
    const result = generateCzechBirthNumber({ gender: 'MALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/);
  });

  it('generates valid female birth number', () => {
    const result = generateCzechBirthNumber({ gender: 'FEMALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/);
  });

  it('ensures the generated number passes validation', () => {
    const result = generateCzechBirthNumber();
    expect(isValidBirthNumber(result)).toBe(true);
  });
});
