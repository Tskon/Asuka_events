module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": ["error", 2],
    semi: ["error", "never"],
    "no-console": 0,
    "no-use-before-define": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/react-in-jsx-scope": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/destructuring-assignment": 0,
    "linebreak-style": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-param-reassign": [2, { "props": false }],
    "consistent-return": 0,
  },
};
