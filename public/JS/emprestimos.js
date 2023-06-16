let itensData = []

async function inicia() {
    // const idUsuarioConectado = getCookie("user")

    const respostaItens = await fetch('/api/itens')
    const itens = await respostaItens.json()

    itensData = [...itens]

    criarListagemDinamica()
}

inicia()

// Função que será acionada pelo evento de clique no botão "Editar"
function editarItem() {
    // Lógica para editar o item selecionado
    alert('Editar item')
}
function emprestarItem() {
    // Lógica para editar o item selecionado
    alert('Emprestar item')
}

// Função que será acionada pelo evento de clique no botão "Excluir"
function excluirItem() {
    // Lógica para excluir o item selecionado
    alert('Excluir item')
}

// Adiciona os eventos de clique aos botões
window.addEventListener('load', () => {
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
})

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
        button.className =
            item.disponivel > 0 ? 'btn-emprestar' : 'btn-emprestar indisponivel'
        button.textContent = 'Emprestar'
        acoesTd.appendChild(button)
        tr.appendChild(acoesTd)

        tbody.appendChild(tr)
    })
}
