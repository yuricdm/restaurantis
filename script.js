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

    if (!lista || !total) {
        return;
    }

    lista.innerHTML = "";

    let valorTotal = 0;

    pedido.forEach(function(item, index) {

        valorTotal += item.preco;

        lista.innerHTML += `
            <div class="item-pedido">
                <strong>${item.nome}</strong>
                - R$ ${item.preco.toFixed(2).replace(".", ",")}

                <button onclick="remover(${index})">
                    Remover
                </button>
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

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value;
    const observacao = document.getElementById("observacao").value.trim();

    if (nome === "" || telefone === "" || endereco === "") {
        alert("Preencha nome, telefone e endereço.");
        return;
    }

    let mensagem = "Olá! Quero fazer um pedido.\n\n";

    mensagem += "🍔 PEDIDO:\n";

    let total = 0;

    pedido.forEach(function(item) {

        mensagem +=
            "• " +
            item.nome +
            " - R$ " +
            item.preco.toFixed(2).replace(".", ",") +
            "\n";

        total += item.preco;
    });

    mensagem +=
        "\n💰 Total: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\n";

    mensagem += "👤 Nome: " + nome + "\n";
    mensagem += "📱 Telefone: " + telefone + "\n";
    mensagem += "📍 Endereço: " + endereco + "\n";
    mensagem += "💳 Pagamento: " + pagamento + "\n";
    mensagem += "📝 Observação: " + (observacao || "Nenhuma");

    const numero = "5553999999999";

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(url, "_blank");
}

// Aguarda o HTML carregar antes de atualizar o pedido
document.addEventListener("DOMContentLoaded", function() {
    atualizarPedido();
});
