module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  globals: {
    __static: true
  },
  plugins: [
    'vue',
    'html',
    'node'
  ],
  'rules': {
    'vue/max-attributes-per-line': [2, {
      singleline: 10,
      multiline: {
        max: 4,
        allowFirstLine: true
      }
    }],
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': ['error', 2, {
      alignAttributesVertically: false
    }],
    'no-var': 1,
    'no-console': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
