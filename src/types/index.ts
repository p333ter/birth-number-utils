export interface BirthNumberParseResult {
  birthDate: Date;
  gender: 'MALE' | 'FEMALE';
  isValid: boolean;
}

export type ValidationResult =
  | { isValid: true; birthDate: Date; gender: 'MALE' | 'FEMALE' }
  | { isValid: false; error: string };

export type Gender = 'MALE' | 'FEMALE';

export interface BirthNumberDetails {
  birthDate: Date;
  gender: Gender;
  age: number;
  isAdult: boolean;
  isMale: boolean;
  isFemale: boolean;
  birthDateAsString: string;
  error: string | null;
}

export interface BirthNumberBase {
  birthDate: Date;
  gender: Gender;
  age: number;
  isAdult: boolean;
  isMale: boolean;
  isFemale: boolean;
  birthDateAsString: string;
  error: string | null;
}
