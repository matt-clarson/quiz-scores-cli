const config = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

if (process.env.USE_COVERAGE) {
  Object.assign(config, {
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/', 'index.ts', 'test-utils.ts']
  });
}

module.exports = config;
