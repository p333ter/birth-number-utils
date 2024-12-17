import dayjs from 'dayjs';

export interface BirthNumberOptions {
  gender?: 'MALE' | 'FEMALE';
  birthDate?: Date;
}

export const generateBirthNumber = (
  options: BirthNumberOptions = {}
): string => {
  const birthDayjs = options.birthDate
    ? dayjs(options.birthDate)
    : dayjs().subtract(Math.floor(Math.random() * 72 + 18), 'years');

  let month = birthDayjs.month() + 1;
  if (options.gender === 'FEMALE') {
    month += 50;
  }

  const firstPart =
    birthDayjs.format('YY') +
    month.toString().padStart(2, '0') +
    birthDayjs.format('DD');

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