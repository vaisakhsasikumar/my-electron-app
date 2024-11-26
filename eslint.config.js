module.exports = {
  languageOptions: {
    globals: {
      browser: true,
      es2021: true,
      node: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Add your custom rules here
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};