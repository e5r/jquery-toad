var setup = require('./setup'),
    env = setup();

describe('Funções principais', function () {
    it('Expõe as funções principais', function () {
        expect(typeof env.toad['namespace']).toBe('function');
        expect(typeof env.toad['require']).toBe('function');
        expect(typeof env.toad['constant']).toBe('function');
    });

    it('Expõe os objetos principais', function () {
        expect(typeof env.toad['utils']).toBe('object');
        expect(typeof env.toad['@']).toBe('object');
        expect(typeof env.toad['core']).toBe('object');
    })
});
