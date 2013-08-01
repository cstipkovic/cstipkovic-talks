## Passo a passo

#### Criando a estrutura basica do Addon

[cpbr05@addons-sdk] $ **mkdir cpbr5**<br />
[cpbr05@addons-sdk] $ **cd cpbr5**<br />
[cpbr05@addons-sdk] $ **source bin/activate**<br />
[cpbr05@addons-sdk] $ **cfx docs**<br />
[cpbr05@addons-sdk] $ **cfx init**<br />
[cpbr05@addons-sdk] $ **cfx test**<br />

#### Codificando o Addon

* Edite as informações do arquivo _package.json_ que esta dentro da pasta que você criou chamada _cpbr5_
* Abra o arquivo _lib/main.js_ dentro do da sua pasta _cpbr5_ e cole o código abaixo:


// Importando as APIs utilizadas
var contextMenu = require("context-menu");
var panel = require("panel");

// Função principal do addon
exports.main = function(options, callbacks) {
  console.log(options.loadReason);
 
  // Create a new context menu item.
  var menuItem = contextMenu.Item({
    label: "What's this?",<br />
    // Show this item when a selection exists.
    context: contextMenu.SelectionContext(),
    // When this item is clicked, post a message back with the selection
    contentScript: 'self.on("click", function () {' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    // When we receive a message, look up the item
    onMessage: function (item) {
      console.log('looking up "' + item + '"');
      lookup(item);
    }
  });
};

// Função que monta o painel
function lookup(item) {
  wikipanel = panel.Panel({
    width: 240,
    height: 320,
    contentURL: "http://en.wikipedia.org/w/index.php?title=" +
                item + "&useformat=mobile"
  });
  wikipanel.show();
}

> Este script foi retirado do Tutorial na documentação do Mozilla Add-ons SDK chamado [https://addons.mozilla.org/en-US/developers/docs/sdk/1.4/dev-guide/addon-development/implementing-simple-addon.html](Implementing a Simple Add-on)