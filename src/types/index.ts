export type Gender = 'MALE' | 'FEMALE';

export interface BirthNumberParseResult {
  birthDate: Date;
  gender: 'MALE' | 'FEMALE';
  isValid: boolean;
}

export type ValidationResult =
  | { isValid: true; birthDate: Date; gender: 'MALE' | 'FEMALE' }
  | { isValid: false; error: string };
