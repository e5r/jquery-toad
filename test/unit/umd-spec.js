var setup = require('./setup'),
    env = setup();

QUnit.module('Informações da biblioteca', function () {
    QUnit.test('A versão da jQuery usada internamente é igual a jQuery externa', function (assert) {
        assert.equal(env.toad.$jq.fn.jquery, env.jQuery.fn.jquery);
    });

    QUnit.test('As informações em $toad devem refletir o informado em package.json', function (assert) {
        assert.equal(env.toad.$toad.author, env.pkg.author);
        assert.equal(env.toad.$toad.licence, env.pkg.licence);
        assert.equal(env.toad.$toad.homepage, env.pkg.homepage);
    })
});
