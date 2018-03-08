import Vue from 'vue';

Vue.config.productionTip = false;
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /CPOP.*\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
//  TODO   (AO) Also ignore any files containing the word store
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);
