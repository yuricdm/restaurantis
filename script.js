```javascript
let pedido = [];

function adicionar(nome, preco) {
    pedido.push({
        nome: nome,
        preco: preco
    });

    atualizarPedido();
}

function atualizarPedido() {
    const lista = document.getElementById("lista");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let valorTotal = 0;

    pedido.forEach(function(item, index) {

        valorTotal += item.preco;

        lista.innerHTML += `
            <div class="item-pedido">
                ${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}
                <button onclick="remover(${index})">Remover</button>
            </div>
        `;
    });

    if (pedido.length === 0) {
        lista.innerHTML = "Nenhum produto adicionado.";
    }

    total.innerText = valorTotal.toFixed(2).replace(".", ",");
}

function remover(index) {
    pedido.splice(index, 1);
    atualizarPedido();
}

function enviarPedido() {

    if (pedido.length === 0) {
        alert("Adicione algum produto ao pedido!");
        return;
    }

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const pagamento = document.getElementById("pagamento").value;
    const observacao = document.getElementById("observacao").value;

    if (nome === "" || telefone === "" || endereco === "") {
        alert("Preencha nome, telefone e endereço.");
        return;
    }

    let mensagem = "Olá! Quero fazer um pedido.%0A%0A";

    mensagem += "🍔 PEDIDO:%0A";

    let total = 0;

    pedido.forEach(function(item) {

        mensagem +=
            "• " +
            item.nome +
            " - R$ " +
            item.preco.toFixed(2).replace(".", ",") +
            "%0A";

        total += item.preco;
    });

    mensagem +=
        "%0A💰 Total: R$ " +
        total.toFixed(2).replace(".", ",") +
        "%0A%0A";

    mensagem += "👤 Nome: " + nome + "%0A";
    mensagem += "📱 Telefone: " + telefone + "%0A";
    mensagem += "📍 Endereço: " + endereco + "%0A";
    mensagem += "💳 Pagamento: " + pagamento + "%0A";
    mensagem += "📝 Observação: " + observacao;

    const numero = "5553999999999";

    window.open(
        "https://wa.me/" + numero + "?text=" + mensagem,
        "_blank"
    );
}

atualizarPedido();
```
