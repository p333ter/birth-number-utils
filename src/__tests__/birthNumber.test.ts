import {
  isValidBirthNumber,
  parseBirthNumber
} from '../validators';

describe('isValidBirthNumber', () => {
  it('returns false for birth number with invalid format', () => {
    expect(isValidBirthNumber('123')).toBe(false); // Menej ako 9 číslic
    expect(isValidBirthNumber('12345678901')).toBe(false); // Viac ako 10 číslic
    expect(isValidBirthNumber('abc1234567')).toBe(false); // Obsahuje písmená
    expect(isValidBirthNumber('1234/56789')).toBe(false); // Nesprávne formátovanie
  });

  it('returns false for invalid modulo 11 check', () => {
    expect(isValidBirthNumber('9007203118')).toBe(false); // Nesprávne modulo 11
  });

  it('returns true for valid birth number', () => {
    expect(isValidBirthNumber('9007203117')).toBe(true); // Platný muž
    expect(isValidBirthNumber('9057203111')).toBe(true); // Platná žena
  });
});

describe('Birth Number Validation and Parsing', () => {
  describe('isValidBirthNumber', () => {
    it('validates correct birth numbers', () => {
      expect(isValidBirthNumber('9007203117')).toBe(true); // Platné číslo
      expect(isValidBirthNumber('9057203111')).toBe(true); // Platné číslo pre ženu
    });

    it('returns false for invalid birth number format', () => {
      expect(isValidBirthNumber('invalid')).toBe(false); // Neplatný formát
      expect(isValidBirthNumber('900720311')).toBe(false); // Menej ako 9 číslic
      expect(isValidBirthNumber('90072031118')).toBe(false); // Viac ako 10 číslic
    });

    it('returns false for invalid modulo 11', () => {
      expect(isValidBirthNumber('9007203118')).toBe(false); // Nesprávne modulo 11
    });

    it('returns false for invalid date', () => {
      expect(isValidBirthNumber('9902291118')).toBe(false); // 29. február 1999 neexistuje
    });
  });

  describe('parseBirthNumber', () => {
    it('returns false for invalid date', () => {
      const result = parseBirthNumber('9902291118'); // 29. február 1999 neexistuje
      expect(result).toBe(false);
    });

    it('returns false for modulo 11 validation failure', () => {
      const result = parseBirthNumber('9007203118'); // Nesprávne modulo 11
      expect(result).toBe(false);
    });

    it('parses valid male birth number', () => {
      const birthDate = new Date(1990, 6, 20);
      const result = parseBirthNumber('9007203117'); // Platné číslo
      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate).toEqual(birthDate);
        expect(result.gender).toBe('MALE');
        expect(result.age).toBe(
          new Date().getFullYear() -
            1990 -
            (new Date().getMonth() < 6 ||
            (new Date().getMonth() === 6 && new Date().getDate() < 20)
              ? 1
              : 0)
        );
        expect(result.isAdult).toBe(true);
        expect(result.isMale).toBe(true);
        expect(result.isFemale).toBe(false);
        expect(result.birthDateAsString).toBe('20.7.1990');
        expect(result.error).toBe(null);
      }
    });

    it('parses valid female birth number', () => {
      const birthDate = new Date(1990, 6, 20);
      const result = parseBirthNumber('9057203111'); // Platné číslo pre ženu
      expect(result).not.toBe(false);
      if (result) {
        expect(result.birthDate).toEqual(birthDate);
        expect(result.gender).toBe('FEMALE');
        expect(result.age).toBe(
          new Date().getFullYear() -
            1990 -
            (new Date().getMonth() < 6 ||
            (new Date().getMonth() === 6 && new Date().getDate() < 20)
              ? 1
              : 0)
        );
        expect(result.isAdult).toBe(true);
        expect(result.isMale).toBe(false);
        expect(result.isFemale).toBe(true);
        expect(result.birthDateAsString).toBe('20.7.1990');
        expect(result.error).toBe(null);
      }
    });

    // Nový test pre overenie validity dátumu a veku
    it('correctly calculates age and validates dates', () => {
      const result = parseBirthNumber('0001018336'); // 1.1.2000
      expect(result).not.toBe(false);
      if (result) {
        expect(result.age).toBe(
          new Date().getFullYear() -
            2000 -
            (new Date().getMonth() < 0 ||
            (new Date().getMonth() === 0 && new Date().getDate() < 1)
              ? 1
              : 0)
        );
        expect(result.isAdult).toBe(result.age >= 18);
      }
    });
  });
});