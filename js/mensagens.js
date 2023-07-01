window.onload = function () {
    document.querySelector("input[name='mensagem']").focus();
    let nome = window.localStorage.getItem('nome');
    let idade = window.localStorage.getItem('idade');
    if (nome === null && idade === null) {
        chatPedirNome();
    } else if (nome !== null && idade === null) {
        chatPedirIdade(nome);
    }
    else {
        chatAPI();
    }
}

function chatAPI() {
    if (window.localStorage.getItem('mensagens') === null) {
        window.localStorage.setItem('mensagens', JSON.stringify([
            {
                "id": 1,
                "nome": "BrainyMoura",
                "idade": 0,
                "me": true,
                "mensagem": "Olá, como posso te ajudar?"
            }
        ]));
    }
    const urlParams = new URLSearchParams(window.location.search);
    const prompt = urlParams.get('prompt');
    document.querySelector("input[name='mensagem']").value = prompt;
    window.history.replaceState({}, document.title, "/" + "chat.html");

    let msgs = document.querySelector('.mensagens');
    let conversas = JSON.parse(window.localStorage.getItem('mensagens'));
    for (let i = 0; i < conversas.length; i++) {
        let msgFrom = document.createElement('div');
        msgFrom.classList.add('mensagem-from');
        let msg = document.createElement('div');
        msg.classList.add('mensagem');
        if (conversas[i].me) {
            msgFrom.classList.add('from-me');
            msg.classList.add('me');
        }
        msg.innerHTML = `<p class="nome">${conversas[i].nome}</p><p class="texto">${conversas[i].mensagem}</p>`;
        msgs.appendChild(msgFrom);
        msgFrom.appendChild(msg);
    }

    const mensagemForm = document.querySelector('.mensagemForm');
    mensagemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensagem = document.querySelector("input[name='mensagem']").value;
        const nome = window.localStorage.getItem('nome');
        const idade = window.localStorage.getItem('idade');

        let id = conversas.length + 1;
        conversas.push({
            "id": id,
            "nome": nome,
            "idade": idade,
            "mensagem": mensagem
        });

        window.localStorage.setItem('mensagens', JSON.stringify(conversas));
        let msgFrom = document.createElement('div');
        msgFrom.classList.add('mensagem-from');
        let msg = document.createElement('div');
        msg.classList.add('mensagem');
        msg.innerHTML = `<p class="nome">${nome}</p><p class="texto">${mensagem}</p>`;
        msgs.appendChild(msgFrom);
        msgFrom.appendChild(msg);

        document.querySelector("input[name='mensagem']").value = '';
        document.querySelector("input[name='mensagem']").focus();

        msgs.scrollTop = msgs.scrollHeight;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://69.164.203.242:8000/chat", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "nome": nome,
            "idade": idade,
            "prompt": mensagem
        }));
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let resposta = JSON.parse(this.responseText);
                let msg = document.createElement('div');
                let msgFrom = document.createElement('div');
                msg.classList.add('mensagem');
                msgFrom.classList.add('mensagem-from');
                msg.classList.add('me');
                msgFrom.classList.add('from-me');
                msg.innerHTML = `<p class="nome">BrainyMoura</p><p class="texto">${resposta.resposta}</p>`;
                msgs.appendChild(msgFrom);
                msgFrom.appendChild(msg);
                msgs.scrollTop = msgs.scrollHeight;
                // adicionar a resposta no localstorage
                conversas.push({
                    "id": conversas.length + 1,
                    "nome": "BrainyMoura",
                    "idade": 0,
                    "me": true,
                    "mensagem": resposta.resposta
                });
                window.localStorage.setItem('mensagens', JSON.stringify(conversas));
            }
        }
    });
}

function chatPedirNome() {
    let msgs = document.querySelector('.mensagens');
    let msgFrom = document.createElement('div');
    let msg = document.createElement('div');
    msg.classList.add('mensagem');
    msgFrom.classList.add('mensagem-from');
    msg.classList.add('me');
    msgFrom.classList.add('from-me');
    msg.innerHTML = `<p class="nome">BrainyMoura</p><p class="texto">Olá, eu sou o BrainyMoura, seu assistente virtual. Qual é o seu nome?</p>`;
    msgs.appendChild(msgFrom);
    msgFrom.appendChild(msg);

    const mensagemForm = document.querySelector('.mensagemForm');
    mensagemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.querySelector("input[name='mensagem']").value;
        window.localStorage.setItem('nome', nome);
        let msgFrom = document.createElement('div');
        msgFrom.classList.add('mensagem-from');
        let msg = document.createElement('div');
        msg.classList.add('mensagem');
        msg.classList.add('me');
        msgFrom.classList.add('from-me');
        msg.innerHTML = `<p class="nome">${nome}</p><p class="texto">${nome}</p>`;
        msgs.appendChild(msgFrom);
        msgFrom.appendChild(msg);
        document.querySelector("input[name='mensagem']").value = '';
        document.querySelector("input[name='mensagem']").focus();
        window.location.reload();
    });
}

function chatPedirIdade(nome) {
    let msgs = document.querySelector('.mensagens');
    let msgFrom = document.createElement('div');
    let msg = document.createElement('div');
    msgFrom.classList.add('mensagem-from');
    msg.classList.add('mensagem');
    msgFrom.classList.add('from-me');
    msg.classList.add('me');
    msg.innerHTML = `<p class="nome">BrainyMoura</p><p class="texto">Qual é a sua idade?</p>`;
    msgs.appendChild(msgFrom);
    msgFrom.appendChild(msg);


    const mensagemForm = document.querySelector('.mensagemForm');
    mensagemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idade = document.querySelector("input[name='mensagem']").value;
        window.localStorage.setItem('idade', idade);
        let msg = document.createElement('div');
        let msgFrom = document.createElement('div');
        msg.classList.add('mensagem');
        msgFrom.classList.add('mensagem-from');
        msg.innerHTML = `<p class="nome">${nome}</p><p class="texto">${idade}</p>`;
        msgs.appendChild(msgFrom);
        msgFrom.appendChild(msg);
        document.querySelector("input[name='mensagem']").value = '';
        document.querySelector("input[name='mensagem']").focus();
        window.location.reload();
    });
}
