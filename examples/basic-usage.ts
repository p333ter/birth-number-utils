/* eslint-disable no-console */
import {
    generateCzechBirthNumber,
    generateSlovakBirthNumber,
} from '../src/generators';
import {
    isValidBirthNumber,
    parseBirthNumber,
} from '../src/validators/birthNumber';

// Example 1: Generate a birth number for a male (Czech Republic)
const czechMaleBirthNumber = generateCzechBirthNumber({ gender: 'MALE' });
console.log('Generated Czech Male Birth Number:', czechMaleBirthNumber);

// Example 2: Generate a birth number for a female (Slovakia)
const slovakFemaleBirthNumber = generateSlovakBirthNumber({ gender: 'FEMALE' });
console.log('Generated Slovak Female Birth Number:', slovakFemaleBirthNumber);

// Example 3: Generate a birth number with a specific date of birth
const specificDate = new Date(1990, 6, 20); // 20th July 1990
const birthNumberWithDate = generateCzechBirthNumber({
  birthDate: specificDate,
});
console.log('Generated Birth Number with Specific Date:', birthNumberWithDate);

// Example 4: Generate a birth number without specifying gender
const birthNumberWithoutGender = generateSlovakBirthNumber({
  birthDate: specificDate,
});
console.log('Generated Birth Number without Gender:', birthNumberWithoutGender);

// Example 5: Validate a birth number
const validBirthNumber = '9007203117';
const invalidBirthNumber = '9902291118';
console.log(
  `Is "${validBirthNumber}" valid?`,
  isValidBirthNumber(validBirthNumber)
); // true
console.log(
  `Is "${invalidBirthNumber}" valid?`,
  isValidBirthNumber(invalidBirthNumber)
); // false

// Example 6: Parse a valid birth number
const parsedValid = parseBirthNumber(validBirthNumber);
if (parsedValid) {
  console.log('Parsed birth number:', parsedValid); // { birthDate: Date, gender: 'MALE' }
} else {
  console.log(`Failed to parse birth number: ${validBirthNumber}`);
}

// Example 7: Full Flow - Generate, Validate, and Parse
const generatedNumber = generateCzechBirthNumber();
if (isValidBirthNumber(generatedNumber)) {
  const parsed = parseBirthNumber(generatedNumber);
  console.log('Generated number is valid and parsed:', parsed);
} else {
  console.log('Generated number is invalid:', generatedNumber);
}
