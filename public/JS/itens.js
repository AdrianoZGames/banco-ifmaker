// Função para formatar a data no formato DD/MM/AAAA
function formatarData(data) {
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataObj.getFullYear().toString();
  return `${dia}/${mes}/${ano}`;
}

// Função para listar os itens
function listarItens() {
  fetch("api/itens")
    .then(resposta => resposta.json())
    .then((data) => {
      let tabela = document.querySelector("#tabela-itens tbody");
      tabela.innerHTML = ""; // Limpar a tabela antes de preenchê-la novamente

      for (let item of data) {
        let tr = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.textContent = item.id;
        let tdNome = document.createElement('td');
        tdNome.textContent = item.nome;
        let tdDisponivel = document.createElement('td');
        tdDisponivel.textContent = item.disponivel <= 0 ? "Indisponível" : 'disponível';
        let tdDataDeAquisicao = document.createElement('td');
        tdDataDeAquisicao.textContent = formatarData(item["data-de-aquisicao"]);

        let tdAcoes = document.createElement('td');
        let botaoEditar = document.createElement('button');
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("editar");
        botaoEditar.dataset.id = item.id;
        botaoEditar.dataset.nome = item.nome;
        botaoEditar.dataset.disponivel = item.disponivel;
        botaoEditar.dataset.datadeaquisicao = item["data-de-aquisicao"];
        botaoEditar.addEventListener('click', editarItem);

        let botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");
        botaoExcluir.dataset.id = item.id;
        botaoExcluir.addEventListener('click', excluirItem);

        tdAcoes.appendChild(botaoEditar);
        tdAcoes.appendChild(botaoExcluir);

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdDisponivel);
        tr.appendChild(tdDataDeAquisicao);
        tr.appendChild(tdAcoes);

        tabela.appendChild(tr);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// Função para editar um item
function editarItem(event) {
  event.preventDefault();

  let form = document.querySelector("#cadastro");
  let id = event.target.dataset.id;
  let nome = event.target.dataset.nome;
  let disponivel = event.target.dataset.disponivel;
  let dataDeAquisicao = event.target.dataset.datadeaquisicao;

  form.id.value = id;
  form.nome.value = nome;
  form.disponivel.value = disponivel;
  form.datadeaquisicao.value = dataDeAquisicao;
}

// Função para excluir um item
function excluirItem(event) {
  event.preventDefault();

  let id = event.target.dataset.id;

  fetch(`api/itens/${id}`, { method: 'DELETE' })
    .then(() => {
      listarItens();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Função para cadastrar um novo item
function criarItens(event) {
  event.preventDefault();

  let form = document.querySelector("#cadastro");
  let id = form.id.value;
  let nome = form.nome.value;
  let disponivel = form.disponivel.value;
  let dataDeAquisicao = form.datadeaquisicao.value;

  let metodo = id ? 'PUT' : 'POST';
  let url = id ? `api/itens/${id}` : 'api/itens';

  let item = {
    nome: nome,
    disponivel: disponivel,
    data_de_aquisicao: dataDeAquisicao
  };

  fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(() => {
      form.reset();
      listarItens();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Evento de submit do formulário
let form = document.querySelector("#cadastro");
form.addEventListener('submit', criarItens);

// Listar os itens ao carregar a página
listarItens();