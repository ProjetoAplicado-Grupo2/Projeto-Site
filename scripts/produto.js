const URL_PRODUTOS = "https://fakestoreapi.com/products/"
const parametros = new URLSearchParams(window.location.search)
let idProduto = parametros.get("id")

const esquerda = document.getElementsByClassName("esquerda")
const imagemProduto = document.getElementById("imagemProduto")
const nomeProduto = document.getElementById("nomeProduto")
const precoProduto = document.getElementById("precoProduto")

let produtoAtual = null;

if(idProduto){
    console.log("Entrou " + idProduto)
    async function acharProduto() {
        try{
            const response = await fetch(URL_PRODUTOS+idProduto)
            const produto = await response.json()

            nomeProduto.textContent = produto.title
            imagemProduto.src= produto.image
            precoProduto.textContent = "R$ " + produto.price
            produtoAtual = produto;
        } catch(error) {
            console.log("Erro ao achar o produto. CÓDIGO: " + error)
        }
    }

    acharProduto()

} else{
    alert("ID do Produto não encontrado na Url. Colocaremos um outro produto")
    idProduto = 1;
}


function comprar(){
    if (!produtoAtual) return;
    if (typeof adicionarAoCarrinho === "function") {
        adicionarAoCarrinho({
            id: produtoAtual.id,
            nome: produtoAtual.title,
            preco: produtoAtual.price,
            quantidade: 1,
            imagem: produtoAtual.image
        });
        abrirSacola && abrirSacola();
    } else {
        alert("Função de carrinho não encontrada!");
    }
}