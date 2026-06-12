module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',

    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],

    settings: {
        react: {
            version: 'detect'
        }
    },

    env: {
        browser: true,
        node: true,
        es2020: true
    },

    rules: {
        'prettier/prettier': 'error',

        // React 17+
        'react/react-in-jsx-scope': 'off',

        // чуть меньше боли в TS
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 'off',
    },

}