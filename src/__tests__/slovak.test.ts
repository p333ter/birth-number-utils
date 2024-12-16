import { generateSlovakBirthNumber } from '../generators/slovak';
import {
  isValidBirthNumber,
} from '../validators';

describe('generateSlovakBirthNumber', () => {
  it('generates valid male birth number', () => {
    const result = generateSlovakBirthNumber({ gender: 'MALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/);
  });

  it('generates valid female birth number', () => {
    const result = generateSlovakBirthNumber({ gender: 'FEMALE' });
    expect(result).toMatch(/^\d{6}\/\d{4}$/);
  });

  it('ensures the generated number passes validation', () => {
    const result = generateSlovakBirthNumber();
    expect(isValidBirthNumber(result)).toBe(true);
  });
});
