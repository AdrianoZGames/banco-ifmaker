const cardItem = document.querySelector('#item')
const cardEmprestimo = document.querySelector('#emprestimo')
const cardUsuario = document.querySelector('#usuario')

cardItem.addEventListener('click', () => {
    window.location = '/itens'
})
cardEmprestimo.addEventListener('click', () => {
    window.location = '/emprestimos'
})
cardUsuario.addEventListener('click', () => {
    window.location = '/usuarios'
})
