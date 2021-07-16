module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  rules: {
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'react/jsx-pascal-case': 0,
    camelcase: 0,
    'import/named': 0,
    'import/no-cycle': 0,

    'no-console': 1,
    'no-use-before-define': 1,
    'object-curly-spacing': [1, 'always'],
    'no-unused-expressions': [2, { allowTernary: true, allowShortCircuit: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'key-spacing': [
      2,
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        // multiLine: {
        //   beforeColon: true,
        //   afterColon: true,
        //   align: 'colon',
        // },
      },
    ],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'space-before-blocks': 'error',
    'prettier/prettier': [
      1,
      {
        arrowParens: 'avoid',
        semi: false,
        trailingComma: 'es5',
        endOfLine: 'lf',
        singleQuote: true,
        tabWidth: 2,
        printWidth: 120,
      },
    ],
    'react/jsx-props-no-spreading': [
      0,
      // {
      //   html: 'ignore',
      //   custom: 'ignore',
      //   explicitSpread: 'ignore',
      // },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['Assets', ['./src/_assets']],
          ['Templates', './src/_components'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
      {
        property: 'myFavoriteWrapper',
      },
    ],
    linkComponents: [
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      forOf: true,
      generators: false,
      modules: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: false,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  globals: {
    arguments: true,
  },
}
