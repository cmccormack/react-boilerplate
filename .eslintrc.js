module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        tabWidth: 2
      }
    ]
  }
};
