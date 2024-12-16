import dayjs from 'dayjs';

export interface CzechBirthNumberOptions {
  gender?: 'MALE' | 'FEMALE';
  birthDate?: Date;
}

export const generateCzechBirthNumber = (
  options: CzechBirthNumberOptions = {}
): string => {
  const birthDate =
    options.birthDate ||
    dayjs()
      .subtract(Math.random() * 72 + 18, 'years')
      .toDate();
  let month = birthDate.getMonth() + 1;
  if (options.gender === 'FEMALE') month += 50;

  const firstPart =
    dayjs(birthDate).format('YY') +
    month.toString().padStart(2, '0') +
    birthDate.getDate().toString().padStart(2, '0');
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
