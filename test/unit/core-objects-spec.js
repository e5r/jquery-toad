var setup = require('./setup'),
    env = setup();

QUnit.module('Objetos principais', function () {
    QUnit.test('Expõe as funções principais', function (assert) {
        assert.ok(typeof env.toad['namespace'] === 'function');
        assert.ok(typeof env.toad['require'] === 'function');
        assert.ok(typeof env.toad['constant'] === 'function');
    });

    QUnit.test('Expõe os objetos principais', function (assert) {
        assert.ok(typeof env.toad['utils'] === 'object');
        assert.ok(typeof env.toad['@'] === 'object');
        assert.ok(typeof env.toad['core'] === 'object');
    })
});
