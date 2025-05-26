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