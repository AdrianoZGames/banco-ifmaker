import express from 'express'

import {
    getUsuarios,
    criarUsuarios,
    atualizarUsuarios,
    apagarUsuarios,
} from './controllers/UsuarioController'

import {
    getEmprestimos,
    criarEmprestimos,
    atualizarEmprestimos,
    apagarEmprestimos,
} from './controllers/EmprestimoController'

import {
    getItens,
    criarItens,
    atualizarItens,
    apagarItens,
} from './controllers/ItemController'

export const routes = express.Router()

// Rotas da API
routes.get('/api/usuarios', getUsuarios)
routes.post('/api/usuarios', criarUsuarios)
routes.put('/api/usuarios/:id', atualizarUsuarios)
routes.delete('/api/usuarios/:id', apagarUsuarios)

routes.get('/api/emprestimos', getEmprestimos)
routes.post('/api/emprestimos', criarEmprestimos)
routes.put('/api/emprestimos/:id', atualizarEmprestimos)
routes.delete('/api/emprestimos/:id', apagarEmprestimos)

routes.get('/api/itens', getItens)
routes.post('/api/itens', criarItens)
routes.put('/api/itens/:id', atualizarItens)
routes.delete('/api/itens/:id', apagarItens)
