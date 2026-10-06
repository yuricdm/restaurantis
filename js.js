let pedido = [];

let total = 0;


// ADICIONAR PRODUTO
function adicionar(nome, preco) {

    pedido.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    mostrarPedido();
}


// MOSTRAR PEDIDO
function mostrarPedido() {

    const lista = document.getElementById("lista");

    lista.innerHTML = "";


    pedido.forEach(function(item, index) {

        lista.innerHTML += `
            <div class="item-pedido">
                ${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}
            </div>
        `;

    });


    if (pedido.length === 0) {

        lista.innerHTML = "Nenhum produto adicionado.";

    }


    document.getElementById("total").innerText =
        total.toFixed(2).replace(".", ",");

}


// ENVIAR PEDIDO PELO WHATSAPP
function enviarPedido() {

    if (pedido.length === 0) {

        alert("Adicione algum produto!");

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

        return;
    }


    if (telefone === "") {

        alert("Digite seu WhatsApp.");

        return;
    }


    if (endereco === "") {

        alert("Digite seu endereço.");

        return;
    }


    let produtos = "";


    pedido.forEach(function(item) {

        produtos +=
            item.nome +
            " - R$ " +
            item.preco.toFixed(2).replace(".", ",") +
            "\n";

    });


    let mensagem =

        "Olá! Quero fazer um pedido.\n\n" +

        "🍔 PRODUTOS:\n" +

        produtos +

        "\n💰 Total: R$ " +

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


    /*
        COLOQUE AQUI O WHATSAPP
        DO RESTAURANTE.

        Exemplo:

        (53) 99999-9999

        ficará:

        5553999999999
    */

    const numero = "5553999999999";


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");

}
```
