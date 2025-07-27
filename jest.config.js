const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');
const { transform } = require('typescript');
const ts = require('typescript');

module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            useESM: true,
            allowJs: true
        }],
        '^.+\\.(css)$' : '<rootDir>/config/jest/fileTransform.js',
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    moduleNameMapper: {
        "\\.(png|jpe?g|gif|svg|ico|woff|woff2|eot|ttf|otf)$" : "<rootDir>/__mocks__/file.Mock.js",
        "\\.(css|less|sass|scss)$": "identitfy-obj-proxy",
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, {prefix: '<rootDir>/src/'}),
    },
    transformIgnorePatterns : ["node_modules/(?!\@lit|lodash)"]
}