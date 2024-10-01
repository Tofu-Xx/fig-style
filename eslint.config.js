import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'unicorn/no-new-array': 'off',
    'no-array-constructor': 'off',
    'no-unused-vars': 'off',
  },
})
