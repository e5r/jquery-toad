
// Inicializa os namespaces na ordem especificada
_NAMESPACES_
    .sort(function (a, b) { 
        return a.idx - b.idx; 
    })
    .map(function (n) { 
        n.cb(); 
    });