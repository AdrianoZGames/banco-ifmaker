fetch('api/usuarios')
    .then((resposta) => resposta.json())
    .then((data) => {
        // let pessoas = document.querySelector('#pessoas');
        let tabela = document.querySelector('#tabela')
        for (let item of data) {
            let tr = document.createElement('tr')

            let tdusuario = document.createElement('td')
            tdusuario.textContent = item.nome
            let tdsenha = document.createElement('td')
            tdsenha.textContent = item.senha
            let tdemail = document.createElement('td')
            tdemail.textContent = item.email
            let tdcpf = document.createElement('td')
            tdcpf.textContent = item.cpf
            let tdtelefone = document.createElement('td')
            tdtelefone.textContent = item.telefone

            tr.appendChild(tdusuario)
            tr.appendChild(tdsenha)
            tr.appendChild(tdemail)
            tr.appendChild(tdcpf)
            tr.appendChild(tdtelefone)

            //Adicionando um botão de excluir por linha da tabela
            let aExcluir = document.createElement('a')
            aExcluir.textContent = 'Excluir'
            aExcluir.classList.add('excluir')

            //Adicionando uma ação quando clicar no botão
            aExcluir.addEventListener('click', (event) => {
                event.preventDefault()
                fetch('api/usuarios' + '/' + item.id, {
                    method: 'DELETE',
                }).finally(() => {
                    // window.location.reload();
                })
            })

            let tdBotaoExcluir = document.createElement('td')
            tdBotaoExcluir.appendChild(aExcluir)

            let tdBotaoAlterar = document.createElement('td')
            let aAlterar = document.createElement('a')
            aAlterar.classList.add('alterar')
            aAlterar.textContent = 'Alterar'

            aAlterar.addEventListener('click', (event) => {
                event.preventDefault()
                // O que precisamos fazer aqui?/

                document.querySelector('#usuario').value = item.nome
                document.querySelector('#senha').value = item.senha
                document.querySelector('#email').value = item.email
                document.querySelector('#cpf').value = item.cpf
                document.querySelector('#telefone').value = item.telefone
                document.querySelector('button').textContent = 'Alterar'

                let form = document.querySelector('#form-cadastro')
                form.addEventListener('submit', (event) => {
                    event.preventDefault()
                    let usuario = document.querySelector('#usuario').value
                    let senha = document.querySelector('#senha').value
                    let email = document.querySelector('#email').value
                    let cpf = document.querySelector('#cpf').value
                    let telefone = document.querySelector('#telefone').value
                    let pessoaUpdate = {
                        usuario,
                        senha,
                        email,
                        cpf,
                        telefone,
                    }
                    fetch('api/usuarios' + '/' + item.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(pessoaUpdate),
                    }).finally(() => {
                        // window.location.reload();
                    })
                })
            })

            tdBotaoAlterar.appendChild(aAlterar)

            tr.appendChild(tdBotaoAlterar)
            tr.appendChild(tdBotaoExcluir)

            tabela.appendChild(tr)
        }
    })
let form = document.querySelector('#form-cadastro')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (document.querySelector('button').textContent == 'Alterar') {
        return
    }
    let usuario = document.querySelector('#usuario').value
    let senha = document.querySelector('#senha').value
    let email = document.querySelector('#email').value
    let cpf = document.querySelector('#cpf').value
    let telefone = document.querySelector('#telefone').value
    let pessoa = {
        usuario,
        senha,
        email,
        cpf,
        telefone,
    }
    //console.log(pessoa)
    fetch('api/usuarios', {
        //Método
        method: 'POST',
        //Tipo de dado
        headers: {
            'Content-Type': 'application/json',
        },
        //Quais são os dados
        body: JSON.stringify(pessoa),
    }).then((response) => response.json())
})
