
let pedido = [];

function adicionar(nome, preco) {

    const produtoExistente = pedido.find(
        item => item.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        pedido.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarPedido();
}


function remover(nome) {

    const produto = pedido.find(
        item => item.nome === nome
    );

    if (!produto) {
        return;
    }

    produto.quantidade--;

    if (produto.quantidade <= 0) {
        pedido = pedido.filter(
            item => item.nome !== nome
        );
    }

    atualizarPedido();
}


function calcularTotal() {

    let total = 0;

    pedido.forEach(function(item) {
        total += item.preco * item.quantidade;
    });

    return total;
}


function atualizarPedido() {

    const lista = document.getElementById("lista");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    if (pedido.length === 0) {

        lista.innerHTML = "Nenhum produto adicionado.";
        totalElemento.innerText = "0,00";

        return;
    }

    pedido.forEach(function(item) {

        const subtotal =
            item.preco * item.quantidade;

        const div = document.createElement("div");

        div.classList.add("item-pedido");

        div.innerHTML = `
            <strong>${item.nome}</strong>
            <br>
            Quantidade: ${item.quantidade}
            <br>
            R$ ${subtotal.toFixed(2).replace(".", ",")}
            <br>

            <button
                class="botao-remover"
                onclick="remover('${item.nome}')">
                − Remover
            </button>

            <hr>
        `;

        lista.appendChild(div);
    });

    const total = calcularTotal();

    totalElemento.innerText =
        total.toFixed(2).replace(".", ",");
}


function enviarPedido() {

    if (pedido.length === 0) {
        alert("Adicione algum produto ao pedido!");
        return;
    }

    const nome =
        document.getElementById("nome").value.trim();

    const telefone =
        document.getElementById("telefone").value.trim();

    const endereco =
        document.getElementById("endereco").value.trim();

    const pagamento =
        document.getElementById("pagamento").value;

    const observacao =
        document.getElementById("observacao").value.trim();

    if (nome === "") {
        alert("Digite seu nome.");
        document.getElementById("nome").focus();
        return;
    }

    if (telefone === "") {
        alert("Digite seu WhatsApp.");
        document.getElementById("telefone").focus();
        return;
    }

    if (endereco === "") {
        alert("Digite seu endereço.");
        document.getElementById("endereco").focus();
        return;
    }

    let produtos = "";

    pedido.forEach(function(item) {

        const subtotal =
            item.preco * item.quantidade;

        produtos +=
            item.quantidade +
            "x " +
            item.nome +
            " - R$ " +
            subtotal.toFixed(2).replace(".", ",") +
            "\n";
    });

    const total = calcularTotal();

    const mensagem =
        "Olá! Quero fazer um pedido.\n\n" +
        "🍔 PRODUTOS:\n" +
        produtos +
        "\n💰 TOTAL: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\n👤 Nome: " +
        nome +
        "\n📱 WhatsApp: " +
        telefone +
        "\n📍 Endereço: " +
        endereco +
        "\n💳 Pagamento: " +
        pagamento +
        "\n📝 Observação: " +
        (observacao || "Nenhuma");

    // COLOQUE O WHATSAPP DO RESTAURANTE AQUI
    const numero = "5553999999999";

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(url, "_blank");
}


document.addEventListener(
    "DOMContentLoaded",
    function() {
        atualizarPedido();
    }
);
```
