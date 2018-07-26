
// AMD: typeof define === 'function' && typeof define.amd === 'object'

/* DOM - Document Object Model é pré-requisito */
if (typeof window !== 'object' || typeof window.document !== 'object') {
    throw new Error("jQuery TOAD\'s requires a DOM (Document Object Model)!");
}

/* É necessário definir um valor para __TOAD__ explicitamente.
   Esse será o nome do objeto de aplicação disponível em window. */
if (typeof __TOAD__ !== 'string') {
    throw new Error('You have not set a value for __TOAD__!');
}
