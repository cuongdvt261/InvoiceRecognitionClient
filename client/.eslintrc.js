module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: "tsconfig.json"
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    "vue/no-unused-components": "off",
    "vue/no-use-v-if-with-v-for": "off"
  }
}
