var setup = require('./setup'),
    env = setup();

describe('Informações da biblioteca', function () {
    it('A versão da jQuery usada internamente é igual a jQuery externa', function () {
        expect(env.jQuery.fn.jquery).toBe(env.toad.$jq.fn.jquery);
    });

    it('As informações em $toad devem refletir o informado em package.json', function () {
        expect(env.toad.$toad.author).toBe(env.pkg.author);
        expect(env.toad.$toad.licence).toBe(env.pkg.licence);
        expect(env.toad.$toad.homepage).toBe(env.pkg.homepage);
    })
});
