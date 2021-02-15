module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: 'src',
  testMatch: [
    '<rootDir>/__tests__/**/*.{test,spec}.(ts|tsx|js|jsx)',
    '<rootDir>/**/*.{test,spec}.(ts|tsx|js|jsx)',
    '<rootDir>/**/**/*.{test,spec}.(ts|tsx|js|jsx)'
  ],
  coverageDirectory: '<rootDir>/__tests__/__coverage__/',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    '<rootDir>/**/*.tsx',
    '<rootDir>/**/**/*.tsx',
    '!<rootDir>/index.tsx',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/test/mock/*.(ts|tsx)'
  ],
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    'node_modules/react-github-btn/.+\\.(j|t)sx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!react-github-btn/.*)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/config/importJestDOM.ts',
    '<rootDir>/__tests__/config/setupTest.ts',
    '<rootDir>/mock/setupServer.ts'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/__mock__/fileMock.ts',
    '\\.(css|scss)$': '<rootDir>/__tests__/__mock__/styleMock.ts',
    '^@atoms(.*)$': '<rootDir>/components/Atoms$1',
    '^@organisms(.*)$': '<rootDir>/components/Organisms$1',
    '^@pages(.*)$': '<rootDir>/components/pages$1',
    '^@utils(.*)$': '<rootDir>/Utils$1',
    '^@services(.*)$': '<rootDir>/Services$1'
  }
}
