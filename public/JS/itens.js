/* alert('') */
fetch("api/itens")
.then(resposta=>resposta.json())
.then((data)=>{
    // let items = document.querySelector('#items');
    let tabela = document.querySelector("#tabela")
    for(let item of data){
        let tr = document.createElement('tr')

        let tdid = document.createElement('td')
        tdId.textContent = item.id
        let tdnome = document.createElement('td')
        tdnome.textContent = item.nome
        let tddisponivel = document.createElement('td')
        tddisponivel.textContent = item.disponivel
        let tddatadeaquisicao = document.createElement('td')
        tddatadeaquisicao.textContent = item.datadeaquisicao

        tr.appendChild(tdid)
        tr.appendChild(tdnome)
        tr.appendChild(tddisponivel)
        tr.appendChild(tddatadeaquisicao)


        //Adicionando um botão de excluir por linha da tabela
        let aExcluir = document.createElement('a')
        aExcluir.textContent = "Excluir"
        aExcluir.classList.add("excluir")

        //Adicionando uma ação quando clicar no botão
        aExcluir.addEventListener('click',(event)=>{
            event.preventDefault();
            fetch("api/itens"+'/'+item.id,{
                method:'DELETE'
            })
            .finally(()=>{
                // window.location.reload();
            })
        })

        let tdBotaoExcluir = document.createElement('td')
        tdBotaoExcluir.appendChild(aExcluir)


        let tdBotaoAlterar = document.createElement('td')
        let aAlterar = document.createElement('a')
        aAlterar.classList.add("alterar")
        aAlterar.textContent="Alterar"

        aAlterar.addEventListener('click',(event)=>{
            event.preventDefault()
            // O que precisamos fazer aqui?/

            document.querySelector("#id").value = item.id
            document.querySelector("#nome").value = item.nome
            document.querySelector("#disponivel").value = item.disponivel
            document.querySelector("#datadeaquisicao").value = item.datadeaquisicao
            document.querySelector('button').textContent ="Alterar"

            let form = document.querySelector('#form-cadastro')
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                let id = document.querySelector('#id').value
                let nome = document.querySelector('#nome').value
                let disponivel = document.querySelector('#disponivel').value
                let datadeaquisicao = document.querySelector('#datadeaquisicao').value
                let itemUpdate = {
                    id,
                    nome,
                    disponivel: disponivel,
                    datadeaquisicao:datadeaquisicao
                }
                fetch("api/itens"+"/"+item.id,{
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(itemUpdate)
                })
                .finally(()=>{
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
let form = document.querySelector("#form-cadastro");

form.addEventListener('submit',(event)=>{
event.preventDefault();

if(document.querySelector('button').textContent =="Alterar"){
    return
}
let id = document.querySelector("#id").value;
let nome = document.querySelector("#nome").value;
let disponivel = document.querySelector("#disponivel").value;
let datadeaquisicao = document.querySelector("#datadeaquisicao").value;
let item = {
    id,
    nome,
    disponivel,
    datadeaquisicao,
    
}
//console.log(item)
fetch("api/itens",{
    //Método
    method: 'POST',
    //Tipo de dado
    headers:{
        'Content-Type':'application/json'
    },
    //Quais são os dados
    body: JSON.stringify(item)
})
.then(response=>response.json())
});