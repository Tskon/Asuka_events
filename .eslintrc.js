module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["airbnb-vue", "plugin:vue/recommended"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "indent": ["error", 2],
    "no-console": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "consistent-return": "off",
    "no-plusplus": "off",
    "global-require": "off",
    "prettier/prettier": "off",
    "import/no-dynamic-require": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "func-names": "off",
    "semi": [2, "never"],
    "comma-dangle": ["error", "never"],
    "vue/html-closing-bracket-spacing)": "off",
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "never"
    }]
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
