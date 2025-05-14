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