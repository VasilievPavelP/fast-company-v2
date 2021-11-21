module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    indent: [0, 2],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'multiline-ternary': ['off'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
  },
}
