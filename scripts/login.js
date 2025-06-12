const API_URL = 'https://fakestoreapi.com/users';
const LOGIN_URL = 'https://fakestoreapi.com/auth/login';

function registrarUsuario() {
    const nome = document.getElementById('inputNome').value;
    const senha = document.getElementById('inputSenha').value;

    if (!nome || !senha) {
        alert('Preencha nome e senha!');
        return;
    }

    // Fake Store API exige mais campos, vamos preencher com dados fictícios
    const usuario = {
        email: nome + "@exemplo.com",
        username: nome,
        password: senha,
        name: {
            firstname: nome,
            lastname: "User"
        },
        address: {
            city: "Cidade",
            street: "Rua",
            number: 1,
            zipcode: "00000-000",
            geolocation: {
                lat: "0",
                long: "0"
            }
        },
        phone: "000000000"
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao registrar');
        return response.json();
    })
    .then(data => {
        alert('Usuário registrado com sucesso!');
    })
    .catch(error => {
        alert('Erro ao registrar: ' + error.message);
    });
}

function tentarLogin() {
    const nome = document.getElementById('inputNome').value;
    const senha = document.getElementById('inputSenha').value;

    if (!nome || !senha) {
        alert('Preencha nome e senha!');
        return;
    }

    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: nome, password: senha })
    })
    .then(response => {
        if (!response.ok) throw new Error('Login inválido');
        return response.json();
    })
    .then(data => {
        if (data.token) {
            document.getElementById('tokenUsuario').value = data.token;
            document.getElementById('tokenArea').style.display = 'flex';
            alert('Login realizado!');
        } else {
            alert('Token não recebido!');
        }
    })
    .catch(error => {
        alert('Erro ao logar: ' + error.message);
    });
}

function deslogarUsuario() {
    document.getElementById('inputNome').value = '';
    document.getElementById('inputSenha').value = '';
    document.getElementById('tokenUsuario').value = '';
    document.getElementById('tokenArea').style.display = 'none';
    alert('Deslogado!');
}
