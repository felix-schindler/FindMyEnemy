// @ts-nocheck
import { test, expect } from 'vitest';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

test('Calculating with numbers', () => {
	expect(add(1, 2)).toBe(3);
	expect(add(2, 1)).toBe(3);
	expect(subtract(1, 2)).toBe(-1);
	expect(subtract(2, 1)).toBe(1);
});

test('Calculating with strings', () => {
	expect(add('1', 2)).toBe('12');
	expect(add(1, '2')).toBe('12');
	expect(subtract('1', 2)).toBe(-1);
	expect(subtract('2', 1)).toBe(1);
});

test('Calculating with objects and arrays', () => {
	// expect(add({}, [])).toBe(0);
	expect(add([], {})).toBe('[object Object]');
});
