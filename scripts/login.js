async function registrarUsuario() {
    const nome = document.getElementById("inputNome").value;
    const senha = document.getElementById("inputSenha").value;

    const novoUsuario = {
        email: nome + "@email.com",  // API exige um e-mail
        username: nome,
        password: senha,
        name: {
            firstname: "Seu",
            lastname: "Nome"
        },
        address: {
            city: "Cidade",
            street: "Rua",
            number: 123,
            zipcode: "12345-678",
            geolocation: {
                lat: "0",
                long: "0"
            }
        },
        phone: "11999999999"
    };

    try {
        const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novoUsuario)
        });

        const data = await response.json();
        console.log("Usuário registrado com sucesso:", data);
        alert("Usuário registrado com sucesso!");
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        alert("Erro ao registrar usuário.");
    }
}


async function tentarLogin() {
    const nome = document.getElementById("inputNome").value;
    const senha = document.getElementById("inputSenha").value;

    const credentials = {
        username: nome,
        password: senha
    };

    try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Login realizado com sucesso:', data);

        // Salvar o token no localStorage
        localStorage.setItem('tokenLogado', data.token);
        alert('Login realizado com sucesso!');
        
        // Redirecionar para outra página se quiser
        // window.location.href = "index.html";

    } catch (error) {
        console.error('Erro ao tentar login:', error.message);
        alert('Falha no login: ' + error.message);
    }
}
