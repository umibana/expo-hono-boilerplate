/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      import: require('eslint-plugin-import'),
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', '.'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'react/display-name': 'off',
    },
  },
]);
