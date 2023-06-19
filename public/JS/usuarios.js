fetch(api/usuarios)

let usuario = document.querySelector('#usuario')
let labelu = document.querySelector('#labelu')
let valideu = false

let senha = document.querySelector('#senha')
let labels = document.querySelector('#labels')
let valides = false

let erro = document.querySelector('#erro')
let sucesso = document.querySelector('#sucesso')


//se estar certo o usuario e senha, a quantidade as mesmas
usuario.addEventListener('keyup', ()=>{
    if(usuario.value.length <= 5){
        labelu.setAttribute('style', 'color:red')
        labelu.innerHTML = 'usuario *Insera no minimo 6 caracteres'
        usuario.setAttribute('style', 'border-color:red')
        valideu = false
    }else{
        labelu.setAttribute('style', 'color:green')
        labelu.innerHTML = 'usuario'
        usuario.setAttribute('style', 'border-color:green')
        valideu = true
    }
})

senha.addEventListener('keyup', ()=>{
    if(senha.value.length <= 8){
        labels.setAttribute('style', 'color:red')
        labels.innerHTML = 'senha *Insera no minimo 9 caracteres'
        senha.setAttribute('style', 'border-color:red')
        valideu = false
    }else{
        labels.setAttribute('style', 'color:green')
        labels.innerHTML = 'senha'
        senha.setAttribute('style', 'border-color:green')
        valideu = true
    }
})


function cadastrar(){
    if(valides && valideu){
        let listau = JSON.parse(localStorage.getItem('listau') || '[]')
        listau.push({
            usuario: usuario.value,
            senha: senha.value
        })
        localStorage.setItem('listau', JSON.stringify(listau))

        sucesso.setAttribute('style', 'display: block')
        sucesso.innerHTML = '<strong>Cadastrando usuario...</strong>'
        erro.setAttribute('style', 'display: none')
        erro.innerHTML = ''

    }else{
        erro.setAttribute('style', 'display: block')
        erro.innerHTML = '<strong>Preencha todos os campos</strong>'
        sucesso.innerHTML = ''
        sucesso.setAttribute('style', 'display: none')
    }
}








