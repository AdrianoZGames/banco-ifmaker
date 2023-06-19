// Função para listar os itens
function listarItens() {
    fetch("api/itens")
      .then(resposta => resposta.json())
      .then((data) => {
        let tabela = document.querySelector("#tabela-itens");
        tabela.innerHTML = ""; // Limpar a tabela antes de preenchê-la novamente
  
        for (let item of data) {
          let tr = document.createElement('tr');
  
          let tdId = document.createElement('td');
          tdId.textContent = item.id;
          let tdNome = document.createElement('td');
          tdNome.textContent = item.nome;
          let tdDisponivel = document.createElement('td');
          tdDisponivel.textContent = item.disponivel <= 0 ? "Indisponível" : 'disponivel'; // Verificar se o valor é igual a 0
          let tdDataDeAquisicao = document.createElement('td');
          tdDataDeAquisicao.textContent = item.datadeaquisicao;
  
          tr.appendChild(tdId);
          tr.appendChild(tdNome);
          tr.appendChild(tdDisponivel);
          tr.appendChild(tdDataDeAquisicao);
  
          tabela.appendChild(tr);
        }
      });
  }
  
  // Função para criar um novo item
  function criarItem(item) {
    fetch("api/itens", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => {
        // Item criado com sucesso, atualizar a lista
        listarItens();
      });
  }
  
  // Função para atualizar um item existente
  function atualizarItem(id, item) {
    fetch("api/itens/" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(() => {
        // Item atualizado com sucesso, atualizar a lista
        listarItens();
      });
  }
  
  // Função para excluir um item
  function excluirItem(id) {
    fetch("api/itens/" + id, {
      method: 'DELETE'
    })
      .then(() => {
        // Item excluído com sucesso, atualizar a lista
        listarItens();
      });
  }
  
  // Listar itens inicialmente
  listarItens();
  
  // Event listener para o formulário de criação/atualização de itens
  let form = document.querySelector("#cadastro");
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    let id = document.querySelector("#id").value;
    let nome = document.querySelector("#nome").value;
    let disponivel = document.querySelector("#disponivel").value;
    let datadeaquisicao = document.querySelector("#datadeaquisicao").value;
    let item = {
      id,
      nome,
      disponivel,
      datadeaquisicao: datadeaquisicao
    };
  
    if (id) {
      // Se o ID existir, atualizar o item
      atualizarItem(id, item);
    } else {
      // Caso contrário, criar um novo item
      criarItem(item);
    }
  });
  
  // Event listener para os botões de excluir
  let tabela = document.querySelector("#tabela-itens");
  
  tabela.addEventListener('click', (event) => {
    if (event.target.classList.contains("excluir")) {
      let id = event.target.dataset.id;
  
      // Confirmar antes de excluir o item
      if (confirm("Deseja excluir este item?")) {
        excluirItem(id);
      }
    }
  });
  
  // Event listener para os botões de alterar
  tabela.addEventListener('click', (event) => {
    if (event.target.classList.contains("alterar")) {
      let id = event.target.dataset.id;
      let nome = event.target.dataset.nome;
      let disponivel = event.target.dataset.disponivel;
      let datadeaquisicao = event.target.dataset.datadeaquisicao;
  
      // Preencher o formulário com os dados do item selecionado
      document.querySelector("#id").value = id;
      document.querySelector("#nome").value = nome;
      document.querySelector("#disponivel").value = disponivel;
      document.querySelector("#datadeaquisicao").value = datadeaquisicao;
      document.querySelector('button').textContent = "Alterar";
    }
  });  