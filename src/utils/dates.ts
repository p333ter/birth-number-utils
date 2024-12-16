import dayjs from 'dayjs';
import { Gender } from '../types';

export function getRandomDateBetween90and18YearsAgo(): Date {
  const currentDate = dayjs();
  const maxAge = 90;
  const minAge = 18;
  const date90YearsAgo = currentDate.subtract(maxAge, 'year');
  const date18YearsAgo = currentDate.subtract(minAge, 'year');
  const randomTimestamp =
    date90YearsAgo.valueOf() +
    Math.random() * (date18YearsAgo.valueOf() - date90YearsAgo.valueOf());
  return dayjs(randomTimestamp).toDate();
}

export function getRandomGender(): Gender {
  return Math.random() < 0.5 ? 'MALE' : 'FEMALE';
}

export function formatDate(date: Date): string {
  return dayjs(date).format('DD.MM.YYYY');
}

// Pomocné funkcie pre prácu s číslami
export function paddingLeft(value: number, length: number = 2): string {
  return value.toString().padStart(length, '0');
}


export function paddingRight(
  value: number | string,
  paddingCount: number
): string {
  return String(value).padEnd(String(value).length + paddingCount, '0');
}

export function addDelimeter(birthNumber: string): string {
  const firstPart = birthNumber.substring(0, 6);
  const secondPart = birthNumber.substring(6);
  return `${firstPart}/${secondPart}`;
}

/**
 * Finds the nearest number divisible by 11 to a given input number.
 *
 * Mathematical Properties:
 * 1. For any real number x, returns y such that:
 *    - y is divisible by 11
 *    - |x - y| ≤ |x - z| for any z divisible by 11
 * 2. For equidistant cases:
 *    - For positive numbers: chooses the larger value
 *    - For negative numbers: chooses the smaller value
 * 3. Special cases:
 *    - Returns 0 (positive zero) for inputs closest to zero
 *    - Handles floating point imprecision using epsilon comparison
 *
 * Implementation Details:
 * - Uses epsilon (1e-10) for floating point comparison
 * - Employs floor and ceil for reliable quotient calculation
 * - Handles IEEE 754 floating point edge cases
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * @param {number} input - Any real number (floating point or integer)
 * @returns {number} The nearest number divisible by 11
 */
export function nextNumberDivided11(input: number): number {
    // Mathematical constants
    const DIVISOR = 11;
    const EPSILON = 1e-10;  // Floating point precision threshold

    // Handle special cases for IEEE 754 compliance
    if (!Number.isFinite(input)) return NaN;
    if (Object.is(input, -0)) return 0;  // Convert negative zero to positive zero

    // Calculate quotients using floor and ceil for precise boundary handling
    const quotientBelow = Math.floor(input / DIVISOR);
    const quotientAbove = Math.ceil(input / DIVISOR);

    // Calculate nearest divisible numbers
    const lowerDivisible = quotientBelow * DIVISOR;
    const upperDivisible = quotientAbove * DIVISOR;

    // If input is already divisible by 11, return it (after converting -0 to 0)
    if (Math.abs(input - lowerDivisible) < EPSILON) {
        return lowerDivisible === 0 ? 0 : lowerDivisible;
    }

    // Calculate precise distances to nearest divisible numbers
    const distanceToLower = Math.abs(input - lowerDivisible);
    const distanceToUpper = Math.abs(input - upperDivisible);

    // Handle equidistant cases with specific rules for positive/negative domain
    const isEquidistant = Math.abs(distanceToLower - distanceToUpper) < EPSILON;

    if (isEquidistant) {
        return input >= 0 ? upperDivisible : lowerDivisible;
    }

    // For non-equidistant cases, select the nearest divisible number
    const result = distanceToLower < distanceToUpper ? lowerDivisible : upperDivisible;

    // Ensure consistent zero representation
    return result === 0 ? 0 : result;
}
