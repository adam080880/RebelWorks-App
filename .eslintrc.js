module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 0,
    'no-inline-styles': false,
  },
};
