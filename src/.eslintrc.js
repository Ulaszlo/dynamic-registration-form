module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'eslint:recommended',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/no-explicit-any': 1,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    indent: 'off',
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',

        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '*.scss',
            group: 'index',
            patternOptions: { matchBase: true },
            position: 'after'
          }
        ]
      }
    ],
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all',
        caughtErrors: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'function-paren-newline': 'off',
    'no-shadow': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-expressions': 'off',
    'no-case-declarations': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-plusplus': 'off',
    'no-loop-func': 'off',
    'consistent-return': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-useless-escape': 'off',
    'react/destructuring-assignment': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'arrow-body-style': 'off',
    'react/self-closing-comp': 'warn',
    'no-confusing-arrow': 'warn',
    'react/jsx-curly-newline': 'off',
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'max-len': ['error', { code: 120, ignoreComments: true }],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off'
  }
};
