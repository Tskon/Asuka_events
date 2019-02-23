const withSass = require('@zeit/next-sass');
const withESLint = require('next-eslint')

module.exports = withESLint(withSass({
  /**
   * For use css-modules
   * turn on when solve the problem:
   * https://github.com/zeit/next.js/issues/5264
   * https://github.com/zeit/next.js/issues/5291
   */
  // cssModules: true
}));
