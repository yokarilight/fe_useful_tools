import { describe, test, expect } from 'vitest';
import { isValidBase64, isLocalStorageValueValid } from '@/utils';

describe('isValidBase64 tests', () => {
  test('should return true for a valid Base64 string', () => {
    expect(isValidBase64('SGVsbG8gd29ybGQ=')).toBe(true);
  });

  test('should return false for a string with invalid Base64 characters', () => {
    expect(isValidBase64('Invalid@Base64')).toBe(false);
  });

  test('should return false for a string with incorrect padding', () => {
    expect(isValidBase64('SGVsbG8gd29ybGQ')).toBe(false);
  });

  test('should return false for a string with length not multiple of 4', () => {
    expect(isValidBase64('SGVsbG8=0')).toBe(false);
  });
});

describe('isLocalStorageValueValid tests', () => {
  test('should return true for a valid JSON object string', () => {
    expect(isLocalStorageValueValid('{"name": "Joe"}')).toBe(true);
  });

  test('should return true for a valid JSON object with multiple properties', () => {
    expect(isLocalStorageValueValid('{"name": "Joe", "age": 30}')).toBe(true);
  });

  test('should return false for an invalid JSON string', () => {
    expect(isLocalStorageValueValid('{name: "Joe"}')).toBe(false);
  });

  test('should return false for improperly formatted JSON', () => {
    expect(isLocalStorageValueValid('{invalid json}')).toBe(false);
  });

  test('should return true for a non-JSON string', () => {
    expect(isLocalStorageValueValid('Hello World')).toBe(true);
  });

  test('should return true for a string that starts with non-{ character', () => {
    expect(isLocalStorageValueValid('This is not JSON')).toBe(true);
  });

  test('should return true for an empty string', () => {
    expect(isLocalStorageValueValid('')).toBe(true);
  });

  test('should return true for a JSON string with nested objects', () => {
    expect(isLocalStorageValueValid('{"user": {"name": "Joe", "age": 30}}')).toBe(true);
  });

  test('should return false for a JSON string that contains syntax errors', () => {
    expect(isLocalStorageValueValid('{"name": "Joe", "age":}')).toBe(false);
  });
});
