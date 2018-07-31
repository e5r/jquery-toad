![jQuery TOAD](website/assets/images/jquery-toad-logo.png)

[jQuery][JQUERY] TOAD (**T**he **O**ld **A**nd **D**ear) é, antes de mais nada, meu tributo ao
__velho e querido jQuery__.

Trata-se de uma biblioteca simples que ajuda você a organizar seu código de aplicação baseado em [jQuery][JQUERY].



## Construa à partir do código fonte

Você vai precisar de:
* [NodeJS][NODEJS]
* [Git][GIT]

Daí é tão simples como executar três comandos no shell:

```shell
$ git clone 'https://github.com/e5r/jquery-toad'
$ cd jquery-toad
$ npm run build
$ npm test # opcional [executa os testes de unidade]
```

Pronto! Já existe uma pasta `dist` com os aquivos de distribuição da biblioteca e você pode usar como desejar.

```shell
$ cp dist/* ../my-app/lib
```

```html
<script src="lib/jquery.js"></script>
<script src="lib/jquery-toad.js"></script>
```

## Use o CDN UNPKG

```html
<script src="https://unpkg.com/jquery/dist/jquery.js"></script>
<script src="https://unpkg.com/jquery-toad/dist/jquery-toad.js"></script>
```

## Use o NUGET

```powershell
PM> Install-Package jquery-toad
```

```html
<script src="~/Scripts/jquery-{version}.js"></script>
<script src="~/Scripts/jquery-toad-{version}.js"></script>
```

## Use o NPM

```shell
$ mkdir my-app
$ cd my-app
$ npm init -y
$ npm install --save jquery-toad
```

```html
<script src="node_modules/jquery/dist/jquery.js"></script>
<script src="node_modules/jquery-toad/dist/jquery-toad.js"></script>
```

> **PS:** Durante a instalação com o **NPM** você será alertado quanto a uma vulnerabilidade crítica. Isso ocorre porque dependemos da jQuery 1.12.4, e é a própria jQuery que tem essa vulnerabilidade. Mas nós mantemos essa dependência legada somente por questões de compatibilidade com navegadores antigos (_leia-se "IE8"_). Nós recomendamos o uso de uma versão mais recente da jQuery que corrija essa vulnerabilidade (>= 3.0) à não ser que você precise suportar navegadores antigos.

## Documentação

A documentação oficial está em [nosso site][WEBSITE].

[JQUERY]: http://jquery.com/  "jQuery web site"
[WEBSITE]: https://e5r.github.io/jquery-toad "Documentação Oficial"
[NODEJS]: https://nodejs.org
[GIT]: https://git-scm.com
