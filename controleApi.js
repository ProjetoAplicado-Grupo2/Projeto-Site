const URL_PRODUTOS = "https://fakestoreapi.com/products"
let allProducts = []

async function acharProdutos() {
    const resp = await fetch(URL_PRODUTOS)
    if (resp.status === 200){
        const obj = await resp.json()
        allProducts = obj
        console.log(allProducts)
    }
    mostrarDestaques(allProducts)
}

function mostrarDestaques(produtos){
    const destaques = document.querySelector(".container-destaques")
    for (let i = 0;i < 3;i++){
        const produtoDestaque = document.createElement('div')
        produtoDestaque.classList.add("produto-destaque")
        produtoDestaque.innerHTML = `
        <img src="${produtos[i].image}" width="300px" height="300" alt="">
        <p>${produtos[i].title}</p>
        `
        destaques.appendChild(produtoDestaque)
    }
}



window.onload = iniciar()

async function iniciar() {
    acharProdutos()
}