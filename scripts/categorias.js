const parametros = new URLSearchParams(window.location.search)
let categoriaProduto = parametros.get("categoria")

const URL_PRODUTOS = "https://fakestoreapi.com/products"
let allProducts = []
console.log("FUNFANDO")

async function acharProdutos() {
    const resp = await fetch(URL_PRODUTOS)
    if (resp.status === 200){
        const obj = await resp.json()
        allProducts = obj
        console.log(allProducts)
    }
    const produtosFiltrados = allProducts.filter(produto => produto.title.toLowerCase().includes(categoriaProduto))
    mostrarDestaques(produtosFiltrados)
}

function mostrarDestaques(produtos){
    const destaques = document.querySelector(".container-destaques")
    for (let i = 0;i < 4;i++){
        const produtoDestaque = document.createElement('div')
        produtoDestaque.classList.add("produto-destaque")
        produtoDestaque.id = produtos[i].id
        produtoDestaque.innerHTML = `
        <img src="${produtos[i].image}">
        <p>${produtos[i].title}</p>
        `
        produtoDestaque.setAttribute("onclick", "escolherProduto(this.id)")
        destaques.appendChild(produtoDestaque)
    }
}

async function iniciar() {
    await acharProdutos()
}

window.onload = iniciar()