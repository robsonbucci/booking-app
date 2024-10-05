import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
