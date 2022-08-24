module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'plugin:import/typescript'],
  /*
   * Common set of rule overrides we're using on both JS(X) and TS(X) files.
   */
  rules: {
    'comma-dangle': [2, 'never'],
    curly: [2, 'multi', 'consistent'],
    'nonblock-statement-body-position': [2, 'below'],
    'arrow-parens': [2, 'as-needed'],
    'import/extensions': 0,
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'import/order': 0,
    'object-curly-spacing': [2, 'never'],
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'react/sort-comp': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'no-trailing-spaces': 2,
    'max-classes-per-file': 0,
    'implicit-arrow-linebreak': 0,
    'lines-between-class-members': 0,
    'react/destructuring-assignment': 0,
    quotes: 0,
    'no-multi-str': 0,
    'no-plusplus': 0,
    indent: [2, 2, {SwitchCase: 1}],
    'max-len': [2, {code: 200}],
    'space-infix-ops': 0
  },
  env: {
    node: true
  },
  overrides: [
    /*
     * We're disabling some rules on TS(X) files as they're
     * redundant with what the compiler already checks for.
     */
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 0,
        'no-use-before-define': 0,
        'import/no-unresolved': 0,
        'no-unused-vars': 0,
        // Allow parameter properties with otherwise empty constructors.
        'no-useless-constructor': 0,
        // Add constructors to the functions that are allowed to be empty.
        'no-empty-function': ['error', {allow: ['arrowFunctions', 'functions', 'methods', 'constructors']}],
        'react/jsx-filename-extension': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/destructuring-assignment': 0,
        'react/prop-types': 0,
        'react/prefer-stateless-function': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-multi-comp': 0,
        'no-restricted-globals': 0,
        'operator-linebreak': 0
      }
    },
    {
      // Overrides for TS infra services
      files: ['*'],
      rules: {
        // airbnb-base has several rules which don't make sense for server code
        camelcase: 0,
        'no-await-in-loop': 0,
        'no-bitwise': 0,
        'no-console': 0,
        'no-constant-condition': ['error', {checkLoops: false}],
        'no-continue': 0,
        'no-loop-func': 0,
        'no-param-reassign': ['error', {props: false}],
        // airbnb-base disables ForOfStatement which we can use safely
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ForInStatement',
            message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
          },
          {
            selector: 'LabeledStatement',
            message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
          },
          {
            selector: 'WithStatement',
            message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
          }
        ],
        'no-shadow': 0,
        "@typescript-eslint/no-shadow": ["error"]
      }
    },
    {
      files: ['*.test.ts'],
      env: {
        mocha: true
      },
      rules: {
        'import/no-extraneous-dependencies': [2, {devDependencies: true}]
      }
    }
  ]
};
