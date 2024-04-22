import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
  testPathIgnorePatterns: ['node_modules/', 'build/', 'setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['index.ts', 'config.ts'],
  coverageReporters: [['lcov', { projectRoot: '..' }]],
  coverageThreshold: {
    global: {
      branches: 80, // Possible paths the logic could follow
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  roots: ['.'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...(pathsToModuleNameMapper(
      compilerOptions.paths ?? {
        '@/*': ['src/*'],
      },
    ) ?? {}),
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
  testMatch: ['**/*.test.*'],
  verbose: true,
};

export default config;
