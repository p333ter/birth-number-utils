import { BirthNumber, rodnecislo } from '../classes';
import { generateBirthNumber } from '../generators';

describe('BirthNumber Class', () => {
  /**
   * Tests parsing and validation of valid birth numbers.
   */
  describe('Valid Birth Numbers', () => {
    /**
     * @description Parses a valid male birth number and checks all properties.
     */
    it('correctly parses valid male birth number', () => {
      const rc = rodnecislo('9007203117');

      expect(rc.year()).toBe(1990);
      expect(rc.month()).toBe(6); // July (0-based)
      expect(rc.day()).toBe(20);
      expect(rc.isMale()).toBe(true);
      expect(rc.isFemale()).toBe(false);
      expect(rc.birthDate()).toEqual(new Date(Date.UTC(1990, 6, 20)));
      expect(rc.birthDateAsString()).toBe('20.07.1990');
      expect(rc.isValid()).toBe(true);
      expect(rc.isPossible()).toBe(true);
      expect(rc.isAdult()).toBe(true);
      expect(rc.age()).toBe(34); // Adjust according to the current year
      expect(rc.error()).toBe(null);
    });

    /**
     * @description Parses a valid female birth number and checks all properties.
     */
    it('correctly parses valid female birth number', () => {
      const rc = rodnecislo('9057203111');

      expect(rc.year()).toBe(1990);
      expect(rc.month()).toBe(6); // July (0-based)
      expect(rc.day()).toBe(20);
      expect(rc.isMale()).toBe(false);
      expect(rc.isFemale()).toBe(true);
      expect(rc.birthDate()).toEqual(new Date(Date.UTC(1990, 6, 20)));
      expect(rc.birthDateAsString()).toBe('20.07.1990');
      expect(rc.isValid()).toBe(true);
      expect(rc.isPossible()).toBe(true);
      expect(rc.isAdult()).toBe(true);
      expect(rc.age()).toBe(34); // Adjust according to the current year
      expect(rc.error()).toBe(null);
    });

    /**
     * @description Checks if birth numbers with slashes are handled correctly.
     */
    it('handles birth numbers with slash correctly', () => {
      const rc = rodnecislo('900720/3117');
      expect(rc.isValid()).toBe(true);
    });
  });

  /**
   * Tests handling of invalid birth numbers.
   */
  describe('Invalid Birth Numbers', () => {
    /**
     * @description Handles invalid birth number formats.
     */
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
      expect(rc.error()).toBe('Invalid birth number format');
    });

    /**
     * @description Handles invalid birth numbers where the modulo check fails.
     */
    it('handles invalid modulo', () => {
      const rc = rodnecislo('9007203118');
      expect(rc.isValid()).toBe(false);
    });

    /**
     * @description Handles invalid dates in birth numbers (e.g., non-existent dates).
     */
    it('handles invalid date', () => {
      const rc = rodnecislo('9902291118'); // 29th February 1999 does not exist
      expect(rc.isValid()).toBe(false);
    });
  });

  /**
   * Tests age calculation and adulthood determination.
   */
  describe('Age and Adulthood', () => {
    /**
     * @description Verifies age calculation for boundary cases (today's and tomorrow's birthdates).
     */
    it('calculates age correctly for edge cases', () => {
      const dateNow = new Date();

      // Generate valid birth number for today's date 20 years ago
      const todayBirthNumber = generateBirthNumber({
        birthDate: new Date(
          dateNow.getFullYear() - 20,
          dateNow.getMonth(),
          dateNow.getDate()
        ),
      }).replace('/', '');

      const todayBirth = rodnecislo(todayBirthNumber);
      expect(todayBirth.age()).toBe(20);

      // Generate valid birth number for tomorrow's date 20 years ago
      const tomorrow = new Date(dateNow);
      tomorrow.setDate(dateNow.getDate() + 1);

      const tomorrowBirthNumber = generateBirthNumber({
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

  /**
   * Tests handling of dates, including leap years and edge cases.
   */
  describe('Date Handling', () => {
    /**
     * @description Validates handling of leap year dates (e.g., 29th February).
     */
    it('handles leap years correctly', () => {
      const leapYear = rodnecislo('0002295689'); // 29.2.2000
      expect(leapYear.isValid()).toBe(true);
      expect(leapYear.birthDateAsString()).toBe('29.02.2000');
    });

    /**
     * @description Validates edge cases for months, including invalid dates.
     */
    it('handles month edge cases', () => {
      const april30 = rodnecislo('9004304573'); // 30th April 1990
      const june31 = rodnecislo('9006313112'); // 31st June 1990 (invalid)

      expect(april30.isValid()).toBe(true);
      expect(june31.isValid()).toBe(false);
    });
  });

  /**
   * Tests the factory function against the class constructor.
   */
  describe('Factory Function', () => {
    /**
     * @description Ensures the factory function and constructor create identical instances.
     */
    it('creates identical instances via constructor and factory', () => {
      const fromConstructor = new BirthNumber('9007203117');
      const fromFactory = rodnecislo('9007203117');

      expect(fromConstructor.birthDateAsString()).toBe(
        fromFactory.birthDateAsString()
      );
      expect(fromConstructor.isValid()).toBe(fromFactory.isValid());
    });
  });

  /**
   * Tests validation of future birth numbers.
   */
  describe('Future Birth Numbers', () => {
    /**
     * @description Checks validation and properties of birth numbers for future dates.
     */
    it('validates future birth numbers correctly', () => {
      const future = rodnecislo('4012170954'); // 17th December 2040

      expect(future.isValid()).toBe(false); // Format is correct
      expect(future.isPossible()).toBe(true); // Still a valid structure
      expect(future.isBorn()).toBe(false); // Not yet born
      expect(future.age()).toBeLessThan(0); // Negative age
    });
  });
});