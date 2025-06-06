
async function tentarLogin() {
    const nome = document.getElementById("inputNome")
    const senha = document.getElementById("inputSenha")
    console.log("Nome: " + nome.value + " Senha: " + senha.value)
    const credentials = {username: nome.value, password: senha.value};
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(data => console.log(data));
}