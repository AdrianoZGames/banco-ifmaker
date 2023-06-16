let itensData = []

async function inicia() {
    // const idUsuarioConectado = getCookie("user")

    const respostaItens = await fetch('/api/itens')
    const itens = await respostaItens.json()

    itensData = [...itens]

    criarListagemDinamica()
    eventosNosButoes()
}

// Função que será acionada pelo evento de clique no botão "Editar"
function editarItem() {
    // Lógica para editar o item selecionado
    alert('Editar item')
}
function emprestarItem() {
    // Lógica para editar o item selecionado
    abrirModal()
}

// Função que será acionada pelo evento de clique no botão "Excluir"
function excluirItem() {
    // Lógica para excluir o item selecionado
    alert('Excluir item')
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
    const tabela = document.getElementById('tabela-emprestimos')
    const tbody = tabela.getElementsByTagName('tbody')[0]

    // Limpar o conteúdo atual da tabela
    tbody.innerHTML = ''

    // Iterar sobre os dados da API e criar as linhas da tabela
    itensData.forEach((item) => {
        const tr = document.createElement('tr')

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
        } else {
            button.className = 'btn-emprestar indisponivel'
            button.textContent = 'Emprestar'
            button.disabled = true
        }

        acoesTd.appendChild(button)
        tr.appendChild(acoesTd)

        tbody.appendChild(tr)
    })
}

// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById('modal')
    modal.style.display = 'block'
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
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
document.getElementById('btnAbrirModal').addEventListener('click', abrirModal)
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

inicia()
