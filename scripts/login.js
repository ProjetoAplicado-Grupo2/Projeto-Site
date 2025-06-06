function gerarToken() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

function registrarUsuario() {
    const email = document.getElementById('inputNome').value.trim().toLowerCase();
    const senha = document.getElementById('inputSenha').value;
    if (!email || !senha) {
        alert('Preencha o e-mail e a senha!');
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (usuarios[email]) {
        alert('E-mail já cadastrado!');
        return;
    }
    const token = gerarToken();
    usuarios[email] = { senha, token };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('tokenLogado', token);
    localStorage.setItem('usuarioLogado', email);
    alert('Usuário registrado com sucesso!');
    window.location.href = "index.html";
}

function tentarLogin() {
    const email = document.getElementById('inputNome').value.trim().toLowerCase();
    const senha = document.getElementById('inputSenha').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (usuarios[email] && usuarios[email].senha === senha) {
        localStorage.setItem('tokenLogado', usuarios[email].token);
        localStorage.setItem('usuarioLogado', email);
        alert('Login realizado com sucesso!');
        window.location.href = "index.html";
    } else {
        alert('E-mail ou senha inválidos!');
    }
}

function deslogarUsuario() {
    localStorage.removeItem('tokenLogado');
    localStorage.removeItem('usuarioLogado');
    alert('Você saiu da sua conta.');
    window.location.href = "index.html";
}
