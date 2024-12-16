import { generateCzechBirthNumber } from '../generators/czech';
import { BirthNumber, rodnecislo } from '../model';

describe('BirthNumber Class', () => {
  describe('Valid Birth Numbers', () => {
    it('correctly parses valid male birth number', () => {
      const rc = rodnecislo('9007203117');

      expect(rc.year()).toBe(1990);
      expect(rc.month()).toBe(6); // Júl (0-based)
      expect(rc.day()).toBe(20);
      expect(rc.isMale()).toBe(true);
      expect(rc.isFemale()).toBe(false);
      expect(rc.birthDate()).toEqual(new Date(1990, 6, 20));
      expect(rc.birthDateAsString()).toBe('20.7.1990');
      expect(rc.isValid()).toBe(true);
      expect(rc.isPossible()).toBe(true);
      expect(rc.isAdult()).toBe(true);
      expect(rc.age()).toBe(34); // Aktualizujte podľa aktuálneho roku
      expect(rc.error()).toBe(null);
    });

    it('correctly parses valid female birth number', () => {
      const rc = rodnecislo('9057203111');

      expect(rc.year()).toBe(1990);
      expect(rc.month()).toBe(6); // Júl (0-based)
      expect(rc.day()).toBe(20);
      expect(rc.isMale()).toBe(false);
      expect(rc.isFemale()).toBe(true);
      expect(rc.birthDate()).toEqual(new Date(1990, 6, 20));
      expect(rc.birthDateAsString()).toBe('20.7.1990');
      expect(rc.isValid()).toBe(true);
      expect(rc.isPossible()).toBe(true);
      expect(rc.isAdult()).toBe(true);
      expect(rc.age()).toBe(34); // Aktualizujte podľa aktuálneho roku
      expect(rc.error()).toBe(null);
    });

    it('handles birth numbers with slash correctly', () => {
      const rc = rodnecislo('900720/3117');
      expect(rc.isValid()).toBe(true);
    });
  });

  describe('Invalid Birth Numbers', () => {
    it('handles invalid format', () => {
      const rc = rodnecislo('abc');

      expect(rc.year()).toBe(null);
      expect(rc.month()).toBe(null);
      expect(rc.day()).toBe(null);
      expect(rc.isMale()).toBe(false);
      expect(rc.isFemale()).toBe(false);
      expect(rc.birthDate()).toBe(null);
      expect(rc.birthDateAsString()).toBe(null);
      expect(rc.isValid()).toBe(false);
      expect(rc.isPossible()).toBe(false);
      expect(rc.isAdult()).toBe(false);
      expect(rc.age()).toBe(null);
      expect(rc.error()).toBe('Invalid birth number');
    });

    it('handles invalid modulo', () => {
      const rc = rodnecislo('9007203118');
      expect(rc.isValid()).toBe(false);
    });

    it('handles invalid date', () => {
      const rc = rodnecislo('9902291118'); // 29.2.1999 neexistuje
      expect(rc.isValid()).toBe(false);
    });
  });

  describe('Age and Adulthood', () => {
    it('calculates age correctly for edge cases', () => {
      const dateNow = new Date();

      // Generujeme platné rodné číslo pre dnešný dátum pred 20 rokmi
      const todayBirthNumber = generateCzechBirthNumber({
        birthDate: new Date(
          dateNow.getFullYear() - 20,
          dateNow.getMonth(),
          dateNow.getDate()
        ),
      }).replace('/', '');

      const todayBirth = rodnecislo(todayBirthNumber);
      expect(todayBirth.age()).toBe(20);

      // Generujeme platné rodné číslo pre zajtrajší dátum pred 20 rokmi
      const tomorrow = new Date(dateNow);
      tomorrow.setDate(dateNow.getDate() + 1);

      const tomorrowBirthNumber = generateCzechBirthNumber({
        birthDate: new Date(
          tomorrow.getFullYear() - 20,
          tomorrow.getMonth(),
          tomorrow.getDate()
        ),
      }).replace('/', '');

      const tomorrowBirth = rodnecislo(tomorrowBirthNumber);
      expect(tomorrowBirth.age()).toBe(19);
    });
  });

  describe('Date Handling', () => {
    it('handles leap years correctly', () => {
      const leapYear = rodnecislo('0002295689'); // 29.2.2000
      expect(leapYear.isValid()).toBe(true);
      expect(leapYear.birthDateAsString()).toBe('29.2.2000');
    });

    it('handles month edge cases', () => {
      const april30 = rodnecislo('9004304573'); // 30.4.1990
      const june31 = rodnecislo('9006313112'); // 31.6.1990 (neplatný)

      expect(april30.isValid()).toBe(true);
      expect(june31.isValid()).toBe(false);
    });
  });

  describe('Factory Function', () => {
    it('creates identical instances via constructor and factory', () => {
      const fromConstructor = new BirthNumber('9007203117');
      const fromFactory = rodnecislo('9007203117');

      expect(fromConstructor.birthDateAsString()).toBe(
        fromFactory.birthDateAsString()
      );
      expect(fromConstructor.isValid()).toBe(fromFactory.isValid());
    });
  });
});
