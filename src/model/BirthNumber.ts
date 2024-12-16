import { BirthNumberDetails } from "../types";
import { parseBirthNumber, sanitizeBirthNumber } from "../validators";

export class BirthNumber {
  private readonly rawValue: string;
  private readonly parsedValue: BirthNumberDetails | false;

  constructor(value: string) {
    this.rawValue = sanitizeBirthNumber(value);
    this.parsedValue = parseBirthNumber(this.rawValue);
  }

  // Základné gettery pre dátum
  year(): number | null {
    if (!this.parsedValue) return null;
    return this.parsedValue.birthDate.getFullYear();
  }

  month(): number | null {
    if (!this.parsedValue) return null;
    return this.parsedValue.birthDate.getMonth();
  }

  day(): number | null {
    if (!this.parsedValue) return null;
    return this.parsedValue.birthDate.getDate();
  }

  // Pomocné metódy pre pohlavie
  isMale(): boolean {
    return this.parsedValue ? this.parsedValue.isMale : false;
  }

  isFemale(): boolean {
    return this.parsedValue ? this.parsedValue.isFemale : false;
  }

  // Dátumové metódy
  birthDate(): Date | null {
    if (!this.parsedValue) return null;
    return new Date(this.parsedValue.birthDate);
  }

  birthDateAsString(): string | null {
    if (!this.parsedValue) return null;
    return this.parsedValue.birthDateAsString;
  }

  // Validačné metódy
  isValid(): boolean {
    return this.parsedValue !== false && this.parsedValue.age >= 0;
  }

  isPossible(): boolean {
    return this.parsedValue !== false;
  }

  // Vekové metódy
  age(): number | null {
    if (!this.parsedValue) return null;
    return this.parsedValue.age;
  }

  isAdult(minimumAge: number = 18): boolean {
    if (!this.parsedValue) return false;
    return this.parsedValue.age >= minimumAge;
  }

  // Getter pre error
  error(): string | null {
    if (!this.parsedValue) return 'Invalid birth number';
    return this.parsedValue.error;
  }
}

// Factory funkcia pre jednoduchšie vytváranie
export const rodnecislo = (value: string): BirthNumber => {
  return new BirthNumber(value);
};
