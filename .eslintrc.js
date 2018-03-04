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
    // 1 means to only generate warnings instead of errors
    "prefer-destructuring": [1,
      {
        "VariableDeclarator": {
          "array": false,
          "object": true
        },
        "AssignmentExpression": {
          "array": false,
          "object": true
        }
      }, 
      {
        "enforceForRenamedProperties": false
      }
    ], // let me assign var a = arr[0] 
    'padded-blocks': 1, // let me have a newline between blocks
    'no-trailing-spaces': 1, // let me have some trailing spaces
    'keyword-spacing': 1, // let me forget the space between the if/for and the parenthesis
    'no-unused-vars': 1, // let me declare variables without using them
    'no-console': 0, // let me log to console without annoying me
    'no-param-reassign': 0, // Vuex uses parameter-reassigning a lot
    "linebreak-style": 0, // Windows line breaks are different than linux line breaks...
    "no-plusplus": 0, // Allow ++ operator
    "no-mixed-operators": 0, // Allow mixing +'s with *'s
    "import/no-unresolved": 0, // import statements
    "import/extensions": 0,
    "no-restricted-syntax": 0, // for-in loops
    'arrow-parens': 0, // allow paren-less arrow functions
    'generator-star-spacing': 0, // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0 // allow debugger during development
  }
}
