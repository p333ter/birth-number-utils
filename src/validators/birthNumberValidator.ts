import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { BirthNumberDetails, Gender } from '../types';

dayjs.extend(utc);


export const sanitizeBirthNumber = (input: string): string =>
  input.replace(/\//g, '');

const CONSTANTS = {
  MONTH_OFFSET: 1,
  DEFAULT_ADULTHOOD: 18,
  AGE_WHEN_BORN: 0,
  YEAR53: 53,
  CENT19: 1900,
  CENT20: 2000,
  YEAR2004: 2004,
  WOMAN_MM_ADDITION: 50,
  EXTRA_MM_ADDITION: 20,
  MODULO: 11,
  MODULO_RESULT: 0,
  MODULO_EXCEPTION_VALUE: 10,
  MODULO_EXCEPTION_CHECK: 0,
} as const;

const RODNECISLO_RE = /^(\d\d)(\d\d)(\d\d)\/?(\d\d\d\d?)$/;

// Pomocné funkcie

const formatDate = (date: dayjs.Dayjs): string => {
  return date.format('DD.MM.YYYY');
};

const validateModulo = (
  yy: string,
  mm: string,
  dd: string,
  xxx: string
): boolean => {
  const whole = +(yy + mm + dd + xxx);
  const test = parseInt(whole.toString().slice(0, -1));
  const check = parseInt(whole.toString().slice(-1));

  return (
    whole % CONSTANTS.MODULO === CONSTANTS.MODULO_RESULT ||
    (test % CONSTANTS.MODULO === CONSTANTS.MODULO_EXCEPTION_VALUE &&
      check === CONSTANTS.MODULO_EXCEPTION_CHECK)
  );
};

const calculateYear = (yy: string, isLongFormat: boolean): number | false => {
  const year = parseInt(yy, 10);

  if (!isLongFormat && year <= CONSTANTS.YEAR53) {
    return year + CONSTANTS.CENT19;
  }
  if (isLongFormat && year > CONSTANTS.YEAR53) {
    return year + CONSTANTS.CENT19;
  }
  if (isLongFormat && year <= CONSTANTS.YEAR53) {
    return year + CONSTANTS.CENT20;
  }

  return false;
};

const processMonth = (
  month: number,
  year: number
): { month: number; gender: Gender; isValid: boolean } => {

  if (month === 0) return { month, gender: 'MALE', isValid: false };

  let gender: Gender = 'MALE';

  // Odstránenie ženského offsetu
  if (month > CONSTANTS.WOMAN_MM_ADDITION) {
    gender = 'FEMALE';
    month -= CONSTANTS.WOMAN_MM_ADDITION;
  }

  // Extra mesiac po roku 2004
  if (month > CONSTANTS.EXTRA_MM_ADDITION) {
    if (year >= CONSTANTS.YEAR2004) {
      month =
        month % CONSTANTS.EXTRA_MM_ADDITION || CONSTANTS.EXTRA_MM_ADDITION;
    } else {
      return { month, gender, isValid: false };
    }
  }

  return { month, gender, isValid: true };
};

export const parseBirthNumber = (
  birthNumber: string
): BirthNumberDetails | false => {
  const sanitizedNumber = sanitizeBirthNumber(birthNumber);
  const match = RODNECISLO_RE.exec(sanitizedNumber);
  if (!match) return false;

  const [_, yy, mm, dd, xxx] = match;
  const isLongFormat = xxx.length === 4;

  // Validácia modulo 11
  if (isLongFormat && !validateModulo(yy, mm, dd, xxx)) {
    return false;
  }

  const year = calculateYear(yy, isLongFormat);
  if (year === false) return false;

  const monthInt = parseInt(mm, 10);
  const { month, gender, isValid } = processMonth(monthInt, year);
  if (!isValid) return false;

  const day = parseInt(dd, 10);
  const birthDate = dayjs.utc(
    `${year}-${month.toString().padStart(2, '0')}-${day}`,
    'YYYY-MM-DD',
    true
  );

  // Validácia dátumu
  if (!birthDate.isValid()) return false;

  const age = dayjs().diff(birthDate, 'year');

  // Commented out due to the fact that the age of the person is not relevant for the validation
  // if (age < CONSTANTS.AGE_WHEN_BORN) {
  //   return false;
  // }

  return {
    birthDate: birthDate.toDate(),
    gender,
    age,
    isAdult: age >= CONSTANTS.DEFAULT_ADULTHOOD,
    isMale: gender === 'MALE',
    isFemale: gender === 'FEMALE',
    birthDateAsString: formatDate(birthDate),
    error: null,
  };
};

export const isValidBirthNumber = (birthNumber: string): boolean => {
  const sanitized = sanitizeBirthNumber(birthNumber);
  return parseBirthNumber(sanitized) !== false;
};
