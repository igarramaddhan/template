module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'problems',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  plugins: ['import', 'prettier', 'react-hooks', '@typescript-eslint'],
  rules: {
    strict: ['off'],
    'max-len': ['off'],
    'consistent-return': [
      'warn',
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'arrow-body-style': 'warn',
    'arrow-parens': 'off',
    'no-restricted-globals': [
      'error',
      {
        name: 'history',
        message:
          'Maybe you meant to use window.history or from react-router-dom.',
      },
      {
        name: 'location',
        message:
          'Maybe you meant to use window.location or from react-router-dom.',
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
        message:
          'Default React import not allowed, it will keep working in React 17, but in the longer term React Team encourage moving away from them\nhttps://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports',
      },
    ],
    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'no-underscore-dangle': ['off'],
    'class-methods-use-this': 'warn',
    'no-mixed-operators': 'warn',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
      },
    ],
    'react/no-deprecated': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/no-multi-comp': 'off',
    'react/jsx-uses-vars': 1,
    'react/jsx-key': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 0,
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        printWidth: 80,
      },
    ],
  },
  globals: {
    importScripts: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off', // The checks it provides are already provided by TypeScript without the need for configuration https://typescript-eslint.io/docs/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      },
    },
  ],
};

