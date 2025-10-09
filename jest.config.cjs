
// jest.config.cjs
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  extensionsToTreatAsEsm: [".js", ".jsx", ".ts", ".tsx"],
};
