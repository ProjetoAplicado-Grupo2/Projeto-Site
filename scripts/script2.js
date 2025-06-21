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
    menuSacola.classList.add("ativo");
    esconderBadgeSacola(true);
}

function fecharSacola(){
    menuSacola.classList.remove("ativo");
    esconderBadgeSacola(false);
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
    window.history.back();
}

function atualizarMenuSacola() {
    const lista = document.getElementById('lista-compras');
    if (!lista) return;
    lista.innerHTML = '';

    atualizarBadgeSacola();

    const tituloSacola = document.createElement('li');
    tituloSacola.textContent = 'Minha Sacola';
    tituloSacola.style.textAlign = 'center';
    tituloSacola.style.fontWeight = 'bold';
    tituloSacola.style.fontSize = '20px';
    tituloSacola.style.margin = '10px 0 16px 0';
    tituloSacola.style.listStyle = 'none';
    lista.appendChild(tituloSacola);

    let carrinho = getCarrinhoAtual();
    if (carrinho.length === 0) {
        let divTotal = document.getElementById('sacola-total-finalizar');
        if (!divTotal) {
            divTotal = document.createElement('div');
            divTotal.id = 'sacola-total-finalizar';
            lista.parentElement.appendChild(divTotal);
        }
        divTotal.innerHTML = '';
        divTotal.style.display = 'flex';
        divTotal.style.flexDirection = 'column';
        divTotal.style.alignItems = 'center';
        divTotal.style.marginTop = '16px';
        divTotal.style.position = 'absolute';
        divTotal.style.bottom = '42px';
        divTotal.style.left = '0';
        divTotal.style.width = '100%';
        divTotal.style.background = 'rgba(255,255,255,0.95)';
        divTotal.style.padding = '12px 0 8px 0';
        divTotal.style.boxShadow = '0 -2px 8px rgba(0,0,0,0.04)';

        const spanTotal = document.createElement('span');
        spanTotal.textContent = `Total: R$0.00`;
        spanTotal.style.fontWeight = 'bold';
        spanTotal.style.fontSize = '18px';
        spanTotal.style.marginBottom = '8px';
        divTotal.appendChild(spanTotal);

        const btnFinalizar = document.createElement('button');
        btnFinalizar.textContent = 'Finalizar compra';
        btnFinalizar.style.background = '#2d6a4f';
        btnFinalizar.style.color = '#fff';
        btnFinalizar.style.border = 'none';
        btnFinalizar.style.borderRadius = '4px';
        btnFinalizar.style.padding = '10px 24px';
        btnFinalizar.style.fontSize = '16px';
        btnFinalizar.style.cursor = 'pointer';
        btnFinalizar.disabled = true;
        divTotal.appendChild(btnFinalizar);

        lista.innerHTML += '<li style="text-align:center; width:100%; list-style:none; margin-top:16px;">Sua sacola está vazia</li>';
        return;
    }

    let total = 0;

    carrinho.forEach((item, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        li.style.marginBottom = '16px'; 

        if (item.imagem) {
            const img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.nome;
            img.style.width = '56px';  
            img.style.height = '56px'; 
            img.style.objectFit = 'contain';
            li.appendChild(img);
        }

        let nomeExibicao = item.nome;
        if (nomeExibicao.length > 15) {
            nomeExibicao = nomeExibicao.substring(0, 15) + "...";
        }

        const precoTotal = (item.preco * item.quantidade).toFixed(2);
        total += item.preco * item.quantidade;

        const span = document.createElement('span');
        span.textContent = `${nomeExibicao} x${item.quantidade} - R$${precoTotal}`;
        li.appendChild(span);


        const quantidadeBox = document.createElement('div');
        quantidadeBox.style.display = 'flex';
        quantidadeBox.style.flexDirection = 'column';
        quantidadeBox.style.alignItems = 'center';
        quantidadeBox.style.justifyContent = 'center';
        quantidadeBox.style.background = '#f3f3f3';
        quantidadeBox.style.borderRadius = '8px';
        quantidadeBox.style.padding = '4px 6px';
        quantidadeBox.style.marginLeft = '8px';
        quantidadeBox.style.marginRight = '8px';

        const linhaBotoes = document.createElement('div');
        linhaBotoes.style.display = 'flex';
        linhaBotoes.style.flexDirection = 'row';
        linhaBotoes.style.alignItems = 'center';
        linhaBotoes.style.justifyContent = 'center';
        linhaBotoes.style.gap = '4px';

        const btnRem = document.createElement('button');
        btnRem.textContent = '-';
        btnRem.style.background = '#bc4749';
        btnRem.style.color = '#fff';
        btnRem.style.border = 'none';
        btnRem.style.borderRadius = '4px';
        btnRem.style.width = '28px';
        btnRem.style.height = '28px';
        btnRem.style.fontSize = '18px';
        btnRem.style.cursor = 'pointer';
        btnRem.style.display = 'flex';
        btnRem.style.alignItems = 'center';
        btnRem.style.justifyContent = 'center';
        btnRem.onclick = () => {
            item.quantidade -= 1;
            if (item.quantidade <= 0) {
                carrinho.splice(idx, 1);
            }
            setCarrinhoAtual(carrinho);
            atualizarMenuSacola();
        };
        linhaBotoes.appendChild(btnRem);

        const qtdSpan = document.createElement('span');
        qtdSpan.textContent = item.quantidade;
        qtdSpan.style.minWidth = '20px';
        qtdSpan.style.textAlign = 'center';
        linhaBotoes.appendChild(qtdSpan);

        const btnAdd = document.createElement('button');
        btnAdd.textContent = '+';
        btnAdd.style.background = '#2d6a4f';
        btnAdd.style.color = '#fff';
        btnAdd.style.border = 'none';
        btnAdd.style.borderRadius = '4px';
        btnAdd.style.width = '28px';
        btnAdd.style.height = '28px';
        btnAdd.style.fontSize = '18px';
        btnAdd.style.cursor = 'pointer';
        btnAdd.style.display = 'flex';
        btnAdd.style.alignItems = 'center';
        btnAdd.style.justifyContent = 'center';
        btnAdd.onclick = () => {
            item.quantidade += 1;
            setCarrinhoAtual(carrinho);
            atualizarMenuSacola();
        };
        linhaBotoes.appendChild(btnAdd);

        quantidadeBox.appendChild(linhaBotoes);

        const btnRemoveAll = document.createElement('button');
        btnRemoveAll.textContent = 'Remover';
        btnRemoveAll.style.background = '#bc4749'; 
        btnRemoveAll.style.color = '#fff';
        btnRemoveAll.style.border = 'none';
        btnRemoveAll.style.borderRadius = '4px';
        btnRemoveAll.style.padding = '2px 10px';
        btnRemoveAll.style.cursor = 'pointer';
        btnRemoveAll.style.marginTop = '6px';
        btnRemoveAll.onclick = () => {
            carrinho.splice(idx, 1);
            setCarrinhoAtual(carrinho);
            atualizarMenuSacola();
        };
        quantidadeBox.appendChild(btnRemoveAll);

        li.appendChild(quantidadeBox);

        lista.appendChild(li);
    });

    let divTotal = document.getElementById('sacola-total-finalizar');
    if (!divTotal) {
        divTotal = document.createElement('div');
        divTotal.id = 'sacola-total-finalizar';
        lista.parentElement.appendChild(divTotal);
    }
    divTotal.innerHTML = '';

    divTotal.style.display = 'flex';
    divTotal.style.flexDirection = 'column';
    divTotal.style.alignItems = 'center';
    divTotal.style.marginTop = '16px';
    divTotal.style.position = 'absolute';
    divTotal.style.bottom = '42px';
    divTotal.style.left = '0';
    divTotal.style.width = '100%';
    divTotal.style.background = 'rgba(255,255,255,0.95)';
    divTotal.style.padding = '12px 0 8px 0';
    divTotal.style.boxShadow = '0 -2px 8px rgba(0,0,0,0.04)';

    const spanTotal = document.createElement('span');
    spanTotal.textContent = `Total: R$${total.toFixed(2)}`;
    spanTotal.style.fontWeight = 'bold';
    spanTotal.style.fontSize = '18px';
    spanTotal.style.marginBottom = '8px';
    divTotal.appendChild(spanTotal);

    const btnFinalizar = document.createElement('button');
    btnFinalizar.textContent = 'Finalizar compra';
    btnFinalizar.style.background = '#2d6a4f';
    btnFinalizar.style.color = '#fff';
    btnFinalizar.style.border = 'none';
    btnFinalizar.style.borderRadius = '4px';
    btnFinalizar.style.padding = '10px 24px';
    btnFinalizar.style.fontSize = '16px';
    btnFinalizar.style.cursor = 'pointer';
    btnFinalizar.onclick = () => {
        alert('Compra finalizada! Obrigado pela preferência.');
        setCarrinhoAtual([]);
        atualizarMenuSacola();
    };
    divTotal.appendChild(btnFinalizar);
}

function atualizarBadgeSacola() {
    const btnBag = document.querySelector('.fa-bag-shopping');
    if (!btnBag) return;

    let badge = btnBag.parentElement.querySelector('.sacola-badge');
    if (badge) badge.remove();

    let totalItens = 0;
    const carrinho = getCarrinhoAtual();
    carrinho.forEach(item => {
        totalItens += item.quantidade;
    });

    if (totalItens > 0) {
        badge = document.createElement('span');
        badge.className = 'sacola-badge';
        badge.textContent = totalItens;
        badge.style.position = 'absolute';
        badge.style.top = '-6px';
        badge.style.right = '-8px';
        badge.style.background = '#bc4749';
        badge.style.color = '#fff';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = 'bold';
        badge.style.borderRadius = '50%';
        badge.style.width = '20px';
        badge.style.height = '20px';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.style.zIndex = '10';
        badge.style.pointerEvents = 'none';
        badge.style.transition = 'opacity 0.2s';
        btnBag.parentElement.style.position = 'relative';
        btnBag.parentElement.appendChild(badge);

        if (menuSacola.classList.contains("ativo")) {
            badge.style.opacity = '0';
        }
    }
}

function esconderBadgeSacola(esconder) {
    const btnBag = document.querySelector('.fa-bag-shopping');
    if (!btnBag) return;
    const badge = btnBag.parentElement.querySelector('.sacola-badge');
    if (badge) {
        badge.style.opacity = esconder ? '0' : '1';
    }
}

function comprar(item) {
    adicionarAoCarrinho(item);
    abrirSacola();
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarMenuSacola();
    atualizarBadgeSacola();
});

'use strict';

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
});

/**Header Active**/

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    header.classList[this.scrollY > 50 ? "add" : "remove"]("active");
});