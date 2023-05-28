module.exports = {
  // testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
