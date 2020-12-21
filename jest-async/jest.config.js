module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true,
    },
    window: {},
  },
  testTimeout: 1000,
};
