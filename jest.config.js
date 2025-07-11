/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Optional: restrict test lookup to `src`
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
