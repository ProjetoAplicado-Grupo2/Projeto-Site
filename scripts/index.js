/// REQUISIÇÃO API e PRODUTOS DESTAQUE
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
    mostrarDestaques(allProducts)
}

function mostrarDestaques(produtos){
    const destaques = document.querySelector(".container-destaques")
    for (let i = 0;i < 6;i++){
        const produtoDestaque = document.createElement('div')
        produtoDestaque.classList.add("produto-destaque")
        produtoDestaque.id = produtos[i].id
        produtoDestaque.innerHTML = `
        <img src="${produtos[i].image}" width="300px" height="300" alt="">
        <p>${produtos[i].title}</p>
        `
        produtoDestaque.setAttribute("onclick", "escolherProduto(this.id)")
        destaques.appendChild(produtoDestaque)
    }
}



window.onload = iniciar()

async function iniciar() {
    acharProdutos()
}

/// CONFIGURAÇÃO DO CARROSSEL
const carrosselSlides = document.querySelector(".slides")

const SlidesCarrossel = [
    {
        imagem: "imagens/imagemMoletom.png", 
        link: "categorias.html"
    },
    {
        imagem: "imagens/imagemLeve.png",
        link: "categorias.html"
    },
    {
        imagem: "imagens/imagemsEstonada.png",
        link: "categorias.html"
    }
]


SlidesCarrossel.forEach(slide => {
    const img = document.createElement("img")
    img.src = slide.imagem
    img.style.cursor = 'pointer'
    img.addEventListener("click", ()=>{
        window.location.href = slide.link
    })

    carrosselSlides.appendChild(img)
});

let imagemCarrosselAtual = 0;


function atualizarCarrossel() {
    imagemCarrosselAtual = (imagemCarrosselAtual + 1) %SlidesCarrossel.length
    carrosselSlides.style.transform = `translateX(-${imagemCarrosselAtual * 100}%)`;
}

setInterval(atualizarCarrossel, 3000)

function escolherProduto(){
      
}