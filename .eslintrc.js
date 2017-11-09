// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // These rules only generate warnings instead of errors
    'no-unused-vars': 1,
    // Vuex uses parameter-reassigning a lot
    'no-param-reassign': 0,
    // Windows line breaks are different than linux line breaks...
    "linebreak-style": 0,
    // Allow ++ operator
    "no-plusplus": 0,
    // Allow mixing +'s with *'s
    "no-mixed-operators": 0,
    // import statements
    "import/no-unresolved": 0,
    "import/extensions": 0,
    // for-in loops
    "no-restricted-syntax": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
