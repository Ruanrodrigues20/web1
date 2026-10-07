let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];

function adicionaAoCarrinho(nomeProduto, precoProduto) {
    const produto = { nome: nomeProduto, preco: precoProduto };
    carrinho.push(produto);
    atualizaContagemCarrinho();
    salvarCarrinho();
    alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
}

function atualizaContagemCarrinho() {
    document.getElementById('carrinho__contagem').textContent = carrinho.length;
}

function salvarCarrinho() {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregaCarrinho() {
    carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || [];
    atualizaContagemCarrinho();
    mostrarItensCarrinho();
}

function mostrarItensCarrinho() {
    const containerCarrinho = document.getElementById('carrinho-itens__carrinho-container');
    const totalCarrinho = document.getElementById('carrinho-itens__carrinho-total__carrinho-total');
    containerCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, indice) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('carrinho-item');
        

        fileName = produto.nome[0];
        for (let i = 1; i < produto.nome.length; i++) {
            if (produto.nome.charCodeAt(i) >= 65 && produto.nome.charCodeAt(i) <= 90) {
                fileName += "_";
                fileName += produto.nome[i];
            } else {
                fileName += produto.nome[i];
            }
        }

        console.log(fileName.toLowerCase())

        itemCarrinho.innerHTML = `
            <img src="./img/${fileName.toLowerCase()}.jpg" alt="${produto.nome}">
            <div class="carrinho-item-detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

        containerCarrinho.appendChild(itemCarrinho);
        total += produto.preco;
    });

    totalCarrinho.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function removerItemCarrinho(indice) {
    carrinho.splice(indice, 1);
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
}

function limpaCarrinho() {
    carrinho = [];
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
}

// Linha para carregar o carrinho ao carregar a página
window.onload = carregaCarrinho;
