// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 'off',
    'no-new': 'off',
    'indent': 'off',
    'curly': 'off',
    'no-nested-ternary': 'off',
    'max-len': ['error', {
      'code': 200,
    }],
    'linebreak-style': ['error', require('os').platform() == 'win32' ? 'windows' : 'unix'],
    'one-var': 'off',
    'no-bitwise': 'off',
    'prefer-const': 'off',
    'no-plusplus': 'off',
    'eqeqeq': 'off',
    'global-require': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': ['off', 'ForInStatement', 'ForOfStatement'],
    'consistent-return': 'off',
    'spaced-comment': 'off',
    'no-unused-expressions': 'off',
    'dot-notation': 'off',
    'object-shorthand': 'off',
    'func-names': 'off',
    'vue/no-async-in-computed-properties': 'off',
    'no-return-assign': 'off',
  }
}
