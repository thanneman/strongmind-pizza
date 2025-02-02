module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node']
}