import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export interface BirthNumberOptions {
  gender?: 'MALE' | 'FEMALE';
  birthDate?: Date | string;
}

export const generateBirthNumber = (
  options: BirthNumberOptions = {}
): string => {
  const birthDayjs = options.birthDate
    ? dayjs(options.birthDate)
    : dayjs().subtract(Math.floor(Math.random() * 72 + 18), 'years');

    const year = birthDayjs.format('YY');
    const day = birthDayjs.format('DD');
    let month = birthDayjs.month() + 1;

  if (options.gender === 'FEMALE') {
    month += 50;
  }

  const firstPart = year + month.toString().padStart(2, '0') + day;

  let controlPart = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  let fullNumber = parseInt(firstPart + controlPart, 10);

  while (fullNumber % 11 !== 0) {
    controlPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    fullNumber = parseInt(firstPart + controlPart, 10);
  }

  return `${firstPart}/${controlPart}`;
};

// Pre zachovanie spätnej kompatibility môžeme exportovať alias funkcie:
export const generateCzechBirthNumber = generateBirthNumber;




export const generateSlovakBirthNumber = generateBirthNumber;