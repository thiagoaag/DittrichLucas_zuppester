module.exports = {
    diff: true,
    extension: ['js'],
    package: '../../package.json',
    reporter: 'spec',
    slow: 15000,
    ui: 'bdd',
    file: ['tests/support/hooks.js'],
    'watch-files': ['tests/api/*.js'],
    'watch-ignore': ['node_modules/**']
}
