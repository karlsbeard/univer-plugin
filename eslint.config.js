import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/data/**.ts', '.github/ISSUE_TEMPLATE/**'],
}, {
  rules: {
    'no-new': 'off',
    'ts/ban-ts-comment': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
