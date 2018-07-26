
// Inicializa os namespaces na ordem especificada
_NAMESPACES_.sort(function (a, b) {
    return a.idx > b.idx;
});

// Não usamos (map) para compatibilidade com IE8
for (var n in _NAMESPACES_) {
    _NAMESPACES_[n].cb();
}

return $toad;
