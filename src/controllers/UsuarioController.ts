import { Request, Response } from 'express'
import { criarConexao } from '../database'
import { Usuario } from '../models/Usuario'

async function getUsuarios(req: Request, res: Response) {
    try {
        const connection = await criarConexao()

        const consulta = 'SELECT * FROM usuarios'
        const [resultado] = await connection.query(consulta)

        connection.end()

        res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function criarUsuarios(req: Request, res: Response) {
    const { nome, senha } = req.body

    if (!nome || !senha) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const usuario: Usuario = {
        nome,
        senha,
    }

    try {
        const connection = await criarConexao()

        const consulta = 'INSERT INTO usuarios (nome, senha) VALUES (?,?)'
        await connection.query(consulta, [usuario.nome, usuario.senha])

        connection.end()

        res.status(201).json({ message: 'User added succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function atualizarUsuarios(req: Request, res: Response) {
    const { nome, senha } = req.body
    const { id } = req.params

    if (!nome && !senha) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const usuario: Usuario = {
        nome,
        senha,
    }

    try {
        const connection = await criarConexao()

        const consulta = 'UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?'
        await connection.query(consulta, [usuario.nome, usuario.senha, id])

        connection.end()

        res.status(200).json({ message: 'User updated succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function apagarUsuarios(req: Request, res: Response) {
    const { id } = req.params

    try {
        const connection = await criarConexao()

        const consulta = 'DELETE FROM usuarios WHERE id = ?'

        await connection.query(consulta, [id])

        connection.end()

        res.status(200).json({ message: 'User removed succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export { getUsuarios, criarUsuarios, atualizarUsuarios, apagarUsuarios }
