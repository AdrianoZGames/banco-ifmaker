import { Request, Response } from 'express'
import { criarConexao } from '../database'
import { Item } from '../models/Itens'

async function getItens(req: Request, res: Response) {
    try {
        const connection = await criarConexao()

        const consulta = 'SELECT * FROM itens'
        const [resultado] = await connection.query(consulta)

        connection.end()

        res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function criarItens(req: Request, res: Response) {
    const { nome, disponivel, dataDeAquisicao } = req.body

    if (!nome || !disponivel || !dataDeAquisicao) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const item: Item = {
        nome,
        disponivel,
        dataDeAquisicao,
    }

    try {
        const connection = await criarConexao()

        const consulta =
            'INSERT INTO itens (nome, disponivel, `data-de-aquisicao`) VALUES (?,?,?)'
        await connection.query(consulta, [
            item.nome,
            item.disponivel,
            item.dataDeAquisicao,
        ])

        connection.end()

        res.status(201).json({ message: 'Item added succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function atualizarItens(req: Request, res: Response) {
    const { nome, disponivel, dataDeAquisicao } = req.body
    const { id } = req.params

    if (!nome && !disponivel && !dataDeAquisicao) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const item: Item = {
        nome,
        disponivel,
        dataDeAquisicao,
    }

    try {
        const connection = await criarConexao()

        const consulta =
            'UPDATE itens SET nome = ?, disponivel = ?, `data-de-aquisicao` = ? WHERE id = ?'
        await connection.query(consulta, [
            item.nome,
            item.disponivel,
            item.dataDeAquisicao,
            id,
        ])

        connection.end()

        res.status(200).json({ message: 'Item updated succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function apagarItens(req: Request, res: Response) {
    const { id } = req.params

    try {
        const connection = await criarConexao()

        const consulta = 'DELETE FROM itens WHERE id = ?'

        await connection.query(consulta, [id])

        connection.end()

        res.status(200).json({ message: 'Item removed succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export { getItens, criarItens, atualizarItens, apagarItens }
