module.exports = {
  defaultSeverity: 'error',
  extends: 'stylelint-config-standard',
  plugins: [ 'stylelint-scss' ],
  rules: {
    'at-rule-no-unknown': null,
    'color-hex-length': 'long',
    'declaration-empty-line-before': 'never',
    'rule-empty-line-before': 'always',
    'media-feature-name-no-vendor-prefix': true,
    'selector-list-comma-newline-after': 'always',
    'string-quotes': 'single',
    'indentation': 2,
    'selector-pseudo-element-colon-notation': 'single',
    'no-descending-specificity': null,
    'number-leading-zero': 'never',
    'scss/at-rule-no-unknown': true
  }
}
