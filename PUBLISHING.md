Publicando novas versões
========================

Aqui estão algumas instruções para proceder com a liberação de novas versões, publicando os artefatos versionados tanto no NPM quanto no NUGET.

## 1. Determine a versão

* Altere a chave `version` nos arquivos `package.json` e `Package.nuspec` para a versão determinada.
* Garanta que não exista artefatos de build's antigos
```console
$ npx gulp clean
```

* Gere os artefatos de distribuição da nova versão
```console
$ npx gulp dist
```

* Confirme as mudanças no Git

```console
$ git commit -m "Libera versão X"
```

> Não se esqueça de empurrar as mudanças para seu servidor remoto de Git.

> Onde "X" é o número da versão que você determinou

## 2. Publique no https://registry.npmjs.org

Você precisa estar autenticado no npm:
```console
$ npm login
Username: xxxxxx
Password:
Email: (this IS public) xxxxxx@xxxxx.xxx
Logged in as xxxxxx on https://registry.npmjs.org/.
```

Publique:
```console
$ npm publish
npm notice
npm notice package: jquery-toad@X.X.X
npm notice === Tarball Contents ===
npm notice 1.1kB  package.json
npm notice ...
npm notice === Tarball Details ===
npm notice name:          jquery-toad
npm notice version:       X.X.X
npm notice package size:  X.X MB
npm notice unpacked size: X.X MB
npm notice shasum:        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
npm notice integrity:     sha512-xxxxxxxxxxxxx[...]xxxxxxxxxxxxx==
npm notice total files:   XX
npm notice
+ jquery-toad@X.X.X
```

Com isso você já deve ver as mudanças no site do NPM para o pacote:
https://www.npmjs.com/package/jquery-toad.

Também pode ver os artefatos da nova versão no pacote espelhado do UNPKG:
https://unpkg.com/jquery-toad@X.X.X

## 3. Publique no https://www.nuget.org

Gere o pacote NUGET:
```console
C:\> .\build\nuget.exe pack -OutputDirectory dist
Tentando construir o pacote de 'Package.nuspec'.
Successfully created package 'dist\jquery-toad.X.X.X.nupkg'.
```

Publique no NUGET:
```console
C:\> .\build\nuget.exe push .\dist\jquery-toad.X.X.X.nupkg -source https://api.nuget.org/v3/index.json -apikey ${key}
```
> Você precisará informar sua API KEY no lugar de ${key}

Com isso você já deve ver as mudanças no site do NUGET para o pacote:
https://www.nuget.org/packages/jquery-toad
