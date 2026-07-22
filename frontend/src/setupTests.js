// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

const values = new Map();
const localStorage = {
  clear: () => values.clear(),
  getItem: (key) => values.has(key) ? values.get(key) : null,
  key: (index) => Array.from(values.keys())[index] ?? null,
  removeItem: (key) => values.delete(key),
  setItem: (key, value) => values.set(key, String(value)),
  get length() {
    return values.size;
  },
};

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorage,
});
