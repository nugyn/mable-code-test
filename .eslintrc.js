module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module,'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}]
  }
}
