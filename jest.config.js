module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src'],
  resolver: 'jest-node-exports-resolver', // Try adding this to fix module resolution
};
