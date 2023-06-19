const logo = document.querySelector('.cabecalho .logo')

logo.addEventListener('click', () => {
    window.location = '/'
})

let itensData = []
let usuariosData = []
let emprestimosData = []
let stageData = {
    itemId: null,
    userId: null,
    emprestimoId: null,
    emprestimoSituacao: null,
}

async function inicia() {
    const respostaItens = await fetch('/api/itens')
    const respostaUsuarios = await fetch('/api/usuarios')
    const respostaEmprestimos = await fetch('/api/emprestimos')

    const itens = await respostaItens.json()
    const usuarios = await respostaUsuarios.json()
    const emprestimos = await respostaEmprestimos.json()

    itensData = [...itens]
    usuariosData = [...usuarios]
    emprestimosData = [...emprestimos]

    criarListagemDinamica()
}

// Função que será acionada pelo evento de clique no botão "Editar"

function emprestarItem(value) {
    // Lógica para editar o item selecionado
    stageData.itemId = value
    $('.tabela-centralizada').toggle()
}

// Função para criar a listagem dinâmica
function criarListagemDinamica() {
    const tabelaItens = document.getElementById('tabela-itens')
    const tbodyItens = tabelaItens.getElementsByTagName('tbody')[0]

    const tabelaUsuarios = document.getElementById('tabela-usuarios')
    const tbodyUsuarios = tabelaUsuarios.getElementsByTagName('tbody')[0]

    const tabelaEmprestimos = document.getElementById('tabela-emprestimos')
    const tbodyEmprestimos = tabelaEmprestimos.getElementsByTagName('tbody')[0]

    // Limpar o conteúdo atual da tabela
    tbodyEmprestimos.innerHTML = ''
    tbodyItens.innerHTML = ''
    tbodyUsuarios.innerHTML = ''

    // Iterar sobre os dados da API e criar as linhas da tabela Itens
    itensData.forEach((item) => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = item.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = item.nome
        tr.appendChild(nomeTd)

        const statusTd = document.createElement('td')
        statusTd.textContent =
            item.disponivel > 0 ? 'Disponível' : 'Indisponível'
        tr.appendChild(statusTd)

        const dataTd = document.createElement('td')
        const dataAquisicao = new Date(item['data-de-aquisicao'])
        dataTd.textContent = dataAquisicao.toLocaleDateString()
        tr.appendChild(dataTd)

        const acoesTd = document.createElement('td')
        const button = document.createElement('button')

        if (item.disponivel > 0) {
            button.className = item.disponivel = 'btn-emprestar'
            button.textContent = 'Emprestar'
            button.addEventListener('click', () => {
                emprestarItem(item.id)
            })
        } else {
            button.className = 'btn-emprestar indisponivel'
            button.textContent = 'Emprestar'
            button.disabled = true
        }

        acoesTd.appendChild(button)
        tr.appendChild(acoesTd)

        tbodyItens.appendChild(tr)
    })

    // Iterar sobre os dados da API e criar as linhas da tabela Usuários
    usuariosData.forEach((item) => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = item.id
        tr.appendChild(idTd)

        const nomeTd = document.createElement('td')
        nomeTd.textContent = item.nome
        tr.appendChild(nomeTd)

        const emailTd = document.createElement('td')
        emailTd.textContent = item.email
        tr.appendChild(emailTd)

        const cpfTd = document.createElement('td')
        cpfTd.textContent = item.cpf
        tr.appendChild(cpfTd)

        const telefoneTd = document.createElement('td')
        telefoneTd.textContent = item.telefone
        tr.appendChild(telefoneTd)

        const acoesTd = document.createElement('td')
        const button = document.createElement('button')

        button.className = 'btn-selecionar'
        button.textContent = 'Selecionar'
        button.addEventListener('click', () => {
            stageData.userId = item.id
            abrirModalEmprestimo()
        })

        acoesTd.appendChild(button)
        tr.appendChild(acoesTd)

        tbodyUsuarios.appendChild(tr)
    })

    // Iterar sobre os dados da API e criar as linhas da tabela Empréstimos
    emprestimosData.forEach((item) => {
        const tr = document.createElement('tr')

        const idTd = document.createElement('td')
        idTd.textContent = item.id
        tr.appendChild(idTd)

        const itemTd = document.createElement('td')
        itemTd.textContent = item.id_item
        tr.appendChild(itemTd)

        const usuarioTd = document.createElement('td')
        usuarioTd.textContent = item.id_usuario
        tr.appendChild(usuarioTd)

        const dataDeEmprestimoTd = document.createElement('td')
        const dataDeEmprestimo = new Date(item['data-de-emprestimo'])
        dataDeEmprestimoTd.textContent = dataDeEmprestimo.toLocaleDateString()
        tr.appendChild(dataDeEmprestimoTd)

        const dataDeDevolucaoTd = document.createElement('td')
        const dataDeDevolucao = new Date(item['data-de-devolucao'])
        dataDeDevolucaoTd.textContent = dataDeDevolucao.toLocaleDateString()
        tr.appendChild(dataDeDevolucaoTd)

        const statusTd = document.createElement('td')
        statusTd.textContent = item.status > 0 ? 'Devolvido' : 'Pendente'
        tr.appendChild(statusTd)

        const acoesTd = document.createElement('td')
        const buttonEditar = document.createElement('button')
        const buttonExcluir = document.createElement('button')

        buttonEditar.className = 'btn-editar'
        buttonExcluir.className = 'btn-excluir'
        buttonEditar.textContent = 'Editar'
        buttonExcluir.textContent = 'Excluir'

        const dataCompletaEmprestimo = item['data-de-emprestimo']
        const dataCompletaDevolucao = item['data-de-devolucao']
        const dataFormatadaEmprestimo = new Date(dataCompletaEmprestimo)
            .toISOString()
            .split('T')[0]

        const dataFormatadaDevolucao = new Date(dataCompletaDevolucao)
            .toISOString()
            .split('T')[0]

        buttonEditar.addEventListener('click', () => {
            abrirModalEdicao(dataFormatadaEmprestimo, dataFormatadaDevolucao)
        })
        buttonExcluir.addEventListener('click', () => {
            abrirModalExclusao(item.id)
        })

        acoesTd.appendChild(buttonEditar)
        acoesTd.appendChild(buttonExcluir)

        tr.appendChild(acoesTd)

        tbodyEmprestimos.appendChild(tr)
    })
}

// Função para abrir o modal Empréstimos
function abrirModalEmprestimo() {
    $('.tabela-centralizada').toggle()
    $('#modal-emprestimo').show()
}

// Função para fechar o modal Empréstimos
function fecharModal() {
    $('#modal-emprestimo').hide()
    stageData.itemId = null
    stageData.userId = null
    document.getElementById('dataEmprestimo').value = null
    document.getElementById('dataDevolucao').value = null
}

// Função para salvar as informações
async function salvarInformacoes() {
    const dataEmprestimo = document.getElementById('dataEmprestimo').value
    const dataDevolucao = document.getElementById('dataDevolucao').value

    let emprestimo = {
        idUsuario: stageData.userId,
        idItem: stageData.itemId,
        dataDeEmprestimo: dataEmprestimo,
        dataDeDevolucao: dataDevolucao,
        status: 0,
    }

    const resposta = await fetch('/api/emprestimos', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emprestimo),
    })
    if (resposta.status == 201) {
        window.location.reload()
    }
    if (resposta.status != 201) {
        alert('Internal Error!')
    }
}

// Event listeners
document
    .getElementById('btnSalvar')
    .addEventListener('click', salvarInformacoes)
document
    .getElementsByClassName('fechar')[0]
    .addEventListener('click', fecharModal)
window.addEventListener('click', function (event) {
    const modalEmprestimo = document.getElementById('modal-emprestimo')
    if (event.target == modalEmprestimo) {
        fecharModal()
    }
})

// Função para abrir o modal de edição
function abrirModalEdicao(dataEmprestimo, dataDevolucao) {
    const dataEmprestimoEdicao = document.getElementById('dataEmprestimoEdicao')
    const dataDevolucaoEdicao = document.getElementById('dataDevolucaoEdicao')

    // Preencher os campos com os valores existentes
    dataEmprestimoEdicao.value = dataEmprestimo
    dataDevolucaoEdicao.value = dataDevolucao

    $('#modal-edicao').show()
}

// Função para fechar o modal de edição
function fecharModalEdicao() {
    $('#modal-edicao').hide()
}

// Função para salvar as informações editadas
function salvarInformacoesEdicao() {
    const dataEmprestimoEdicao = document.getElementById(
        'dataEmprestimoEdicao'
    ).value
    const dataDevolucaoEdicao = document.getElementById(
        'dataDevolucaoEdicao'
    ).value

    // Faça o que for necessário com as informações editadas (enviar para a API, etc.)

    // Fechar o modal após salvar as informações
    fecharModalEdicao()
}

// Event listeners
document
    .getElementById('btnSalvarEdicao')
    .addEventListener('click', salvarInformacoesEdicao)
document
    .getElementsByClassName('fechar')[1]
    .addEventListener('click', fecharModalEdicao)
window.addEventListener('click', function (event) {
    const modalEdicao = document.getElementById('modal-edicao')
    if (event.target == modalEdicao) {
        fecharModalEdicao()
    }
})

// Função para abrir o modal de exclusão
function abrirModalExclusao(id) {
    stageData.emprestimoId = id
    $('#modal-exclusao').show()
}
// Função para fechar o modal de exclusão
function fecharModalExclusao() {
    stageData.emprestimoId = null
    $('#modal-exclusao').hide()
}

// Função para confirmar a exclusão
async function confirmarExclusao() {
    // Lógica para a exclusão do item (enviar para a API, etc.)

    const resposta = await fetch(`/api/emprestimos/${stageData.emprestimoId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    if (resposta.status == 200) {
        window.location.reload()
    }
    if (resposta.status != 200) {
        alert('Internal Error!')
    }
}

// Event listeners
document
    .getElementById('btnCancelarExclusao')
    .addEventListener('click', fecharModalExclusao)
document
    .getElementById('btnConfirmarExclusao')
    .addEventListener('click', confirmarExclusao)
document
    .getElementsByClassName('fechar')[2]
    .addEventListener('click', fecharModalExclusao)
window.addEventListener('click', function (event) {
    const modalExclusao = document.getElementById('modal-exclusao')
    if (event.target == modalExclusao) {
        fecharModalExclusao()
    }
})

// Função para alterar o status para "Devolvido"
function setStatusDevolvido() {
    const btnStatusDevolvido = document.getElementById('btnStatusDevolvido')
    const btnStatusPendente = document.getElementById('btnStatusPendente')

    btnStatusDevolvido.classList.add('ativo')
    btnStatusPendente.classList.remove('ativo')
    stageData.emprestimoSituacao = 0
}

// Função para alterar o status para "Pendente"
function setStatusPendente() {
    const btnStatusDevolvido = document.getElementById('btnStatusDevolvido')
    const btnStatusPendente = document.getElementById('btnStatusPendente')

    btnStatusDevolvido.classList.remove('ativo')
    btnStatusPendente.classList.add('ativo')
    stageData.emprestimoSituacao = 10
}

// Event listeners para alterar o status
document
    .getElementById('btnStatusDevolvido')
    .addEventListener('click', setStatusDevolvido)
document
    .getElementById('btnStatusPendente')
    .addEventListener('click', setStatusPendente)

inicia()
