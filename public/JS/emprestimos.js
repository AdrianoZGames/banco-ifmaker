const logo = document.querySelector('.cabecalho .logo')

logo.addEventListener('click', () => {
    window.location = '/'
})

let itensData = []
let usuariosData = []
let emprestimosData = []
let stageData = {
    item: null,
    user: null,
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
function editarItem() {
    // Lógica para editar o item selecionado
    abrirModalEdicao()
}
function emprestarItem(value) {
    // Lógica para editar o item selecionado
    stageData.item = value.id
    $('.tabela-centralizada').toggle()
    abrirModalEmprestimo()
}

// Função que será acionada pelo evento de clique no botão "Excluir"
function excluirItem() {
    // Lógica para excluir o item selecionado
    abrirModalExclusao()
}

function eventosNosButoes() {
    // Adiciona os eventos de clique aos botões
    const btnEmprestar = document.querySelectorAll('.btn-emprestar')
    const btnEditar = document.querySelectorAll('.btn-editar')
    const btnExcluir = document.querySelectorAll('.btn-excluir')

    btnEmprestar.forEach((btn) => {
        btn.addEventListener('click', emprestarItem)
    })
    btnEditar.forEach((btn) => {
        btn.addEventListener('click', editarItem)
    })

    btnExcluir.forEach((btn) => {
        btn.addEventListener('click', excluirItem)
    })
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
                emprestarItem(item)
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
            stageData.user = item.id
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
        const dataDeDevolucao = new Date(item['data-de-emprestimo'])
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

        buttonEditar.addEventListener('click', () => {
            abrirModalEmprestimo(item.id)
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

// Função para abrir o modal
function abrirModalEmprestimo() {
    const modal = document.getElementById('modal-emprestimo')
    $(modal).show()
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal-emprestimo')
    $(modal).hide()
    stageData.item = null
    stageData.id = null
}

// Função para salvar as informações
function salvarInformacoes() {
    const dataEmprestimo = document.getElementById('dataEmprestimo').value
    const dataDevolucao = document.getElementById('dataDevolucao').value

    // Faça o que for necessário com as informações (enviar para a API, etc.)

    // Fechar o modal após salvar as informações
    fecharModal()
}

// Event listeners
document
    .getElementById('btnSalvar')
    .addEventListener('click', salvarInformacoes)
document
    .getElementsByClassName('fechar')[0]
    .addEventListener('click', fecharModal)
window.addEventListener('click', function (event) {
    const modal = document.getElementById('modal')
    if (event.target == modal) {
        fecharModal()
    }
})

// Dados de exemplo para edição
const dadosEdicao = {
    dataEmprestimo: '2023-06-12',
    dataDevolucao: '2023-06-20',
}

// Função para abrir o modal de edição
function abrirModalEdicao() {
    const modalEdicao = document.getElementById('modalEdicao')
    const dataEmprestimoEdicao = document.getElementById('dataEmprestimoEdicao')
    const dataDevolucaoEdicao = document.getElementById('dataDevolucaoEdicao')

    // Preencher os campos com os valores existentes
    dataEmprestimoEdicao.value = dadosEdicao.dataEmprestimo
    dataDevolucaoEdicao.value = dadosEdicao.dataDevolucao

    modalEdicao.style.display = 'block'
}

// Função para fechar o modal de edição
function fecharModalEdicao() {
    const modalEdicao = document.getElementById('modalEdicao')
    modalEdicao.style.display = 'none'
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
    const modalEdicao = document.getElementById('modalEdicao')
    if (event.target == modalEdicao) {
        fecharModalEdicao()
    }
})

// Função para abrir o modal de exclusão
function abrirModalExclusao() {
    const modalExclusao = document.getElementById('modalExclusao')
    modalExclusao.style.display = 'block'
}

// Função para fechar o modal de exclusão
function fecharModalExclusao() {
    const modalExclusao = document.getElementById('modalExclusao')
    modalExclusao.style.display = 'none'
}

// Função para confirmar a exclusão
function confirmarExclusao() {
    // Lógica para a exclusão do item (enviar para a API, etc.)

    // Fechar o modal após a confirmação da exclusão
    fecharModalExclusao()
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
    const modalExclusao = document.getElementById('modalExclusao')
    if (event.target == modalExclusao) {
        fecharModalExclusao()
    }
})

inicia()
