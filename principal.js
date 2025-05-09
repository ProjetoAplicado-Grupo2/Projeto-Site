const carrosselSlides = document.querySelector(".slides")

const imagens = [
    'imagens/imagemMoletom.png',
    'imagens/imagemLeve.png',
    'imagens/imagemsEstonada.png'
]


imagens.forEach(imagem => {
    const img = document.createElement("img")
    img.src = imagem
    carrosselSlides.appendChild(img)
});

let imagemCarrosselAtual = 0;


function atualizarCarrossel() {
    imagemCarrosselAtual = (imagemCarrosselAtual + 1) %imagens.length
    carrosselSlides.style.transform = `translateX(-${imagemCarrosselAtual * 100}%)`;
}

setInterval(atualizarCarrossel, 3000)