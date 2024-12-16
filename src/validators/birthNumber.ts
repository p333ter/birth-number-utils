import dayjs from 'dayjs';

const removeSpecialChars = (input: string): string => input.replace(/\//g, '');
const parseToNumberOrNaN = (input: string): number => Number(input) || NaN;
export const parseCharToNumber = (str: string, charPosition: number): number => {
  if (charPosition >= str.length || charPosition < -str.length) {
    return NaN;
  }

  const char = str.slice(charPosition);
  return char ? Number(char) : NaN;
};


export const isValidBirthNumber = (birthNumber: string): boolean => {
  const sanitizedNumber = removeSpecialChars(birthNumber);

  // Základná kontrola formátu (9 alebo 10 číslic)
  if (!/^\d{9,10}$/.test(sanitizedNumber)) {
    return false;
  }

  // Modulo 11 validácia
  const firstNineChars = sanitizedNumber.slice(0, 9);
  const firstNineNumeric = parseToNumberOrNaN(firstNineChars);

  if (isNaN(firstNineNumeric)) {
    return false;
  }

  const result = firstNineNumeric % 11;
  const numericLastChar = parseCharToNumber(sanitizedNumber, -1);

  return (result === 10 && numericLastChar === 0) || result === numericLastChar;
};

export const parseBirthNumber = (
  birthNumber: string
): { birthDate: Date; gender: string } | false => {
  const sanitizedNumber = removeSpecialChars(birthNumber);

  if (!isValidBirthNumber(sanitizedNumber)) {
    return false;
  }

  const [yearPart, monthPart, dayPart] = [
    sanitizedNumber.slice(0, 2),
    sanitizedNumber.slice(2, 4),
    sanitizedNumber.slice(4, 6),
  ];

  // Parsovanie dátumu a pohlavia
  // eslint-disable-next-line prefer-const
  let [year, month, day] = [
    parseInt(yearPart, 10),
    parseInt(monthPart, 10),
    parseInt(dayPart, 10),
  ];

  year += year < 54 ? 2000 : 1900;
  const gender = month > 50 ? 'FEMALE' : 'MALE';
  month = month > 50 ? month - 50 : month;

  const birthDate = dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true);
  if (
    !birthDate.isValid() ||
    birthDate.year() !== year ||
    birthDate.month() + 1 !== month ||
    birthDate.date() !== day
  ) {
    return false;
  }

  return { birthDate: birthDate.toDate(), gender };
};
