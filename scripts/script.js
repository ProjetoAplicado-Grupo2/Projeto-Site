/// CONFIGURAÇÃO DO MENU LATERAL & MENU SACOLÃO

const menuLateral = document.getElementById("menu-lateral")
const menuSacola = document.getElementById("menu-sacola")

function abrirMenu(){
    menuLateral.classList.add("ativo")
}

function fecharMenu(){
    menuLateral.classList.remove("ativo")
}

function abrirSacola(){
    menuSacola.classList.add("ativo")
}

function fecharSacola(){
    menuSacola.classList.remove("ativo")
}

function escolherProduto(produtoId){
    window.location.href = "produto.html?id=" + encodeURIComponent(produtoId)
}

function getTokenLogado() {
    return localStorage.getItem('tokenLogado');
}

function getCarrinhoAtual() {
    const token = getTokenLogado();
    if (!token) return [];
    return JSON.parse(localStorage.getItem('carrinho_' + token) || '[]');
}

function setCarrinhoAtual(carrinho) {
    const token = getTokenLogado();
    if (!token) return;
    localStorage.setItem('carrinho_' + token, JSON.stringify(carrinho));
}

function adicionarAoCarrinho(item) {
    const token = getTokenLogado();
    if (!token) {
        alert('Você precisa estar logado para adicionar itens ao carrinho.');
        return;
    }
    let carrinho = getCarrinhoAtual();
    const idx = carrinho.findIndex(i => i.id === item.id);
    if (idx > -1) {
        carrinho[idx].quantidade += item.quantidade;
    } else {
        carrinho.push(item);
    }
    setCarrinhoAtual(carrinho);
    atualizarMenuSacola();
    alert('Item adicionado ao carrinho!');
}

function atualizarMenuSacola() {
    const lista = document.getElementById('lista-compras');
    if (!lista) return;
    lista.innerHTML = '';
    let carrinho = getCarrinhoAtual();
    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Carrinho vazio</li>';
        return;
    }
    carrinho.forEach((item, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';

        if (item.imagem) {
            const img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.nome;
            img.style.width = '32px';
            img.style.height = '32px';
            img.style.objectFit = 'contain';
            li.appendChild(img);
        }

        const span = document.createElement('span');
        span.textContent = `${item.nome} x${item.quantidade} - R$${item.preco}`;
        li.appendChild(span);

        const btnAdd = document.createElement('button');
        btnAdd.textContent = '+';
        btnAdd.onclick = () => {
            item.quantidade += 1;
            setCarrinhoAtual(carrinho);
            atualizarMenuSacola();
        };
        li.appendChild(btnAdd);

        const btnRem = document.createElement('button');
        btnRem.textContent = '-';
        btnRem.onclick = () => {
            item.quantidade -= 1;
            if (item.quantidade <= 0) {
                carrinho.splice(idx, 1);
            }
            setCarrinhoAtual(carrinho);
            atualizarMenuSacola();
        };
        li.appendChild(btnRem);

        lista.appendChild(li);
    });
}

function comprar(item) {
    adicionarAoCarrinho(item);
    abrirSacola();
}

document.addEventListener('DOMContentLoaded', atualizarMenuSacola);