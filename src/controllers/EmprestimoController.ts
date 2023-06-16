import { Request, Response } from 'express'
import { criarConexao } from '../database'
import { Emprestimo } from '../models/Emprestimo'

async function getEmprestimos(req: Request, res: Response) {
    try {
        const connection = await criarConexao()

        const consulta = 'SELECT * FROM emprestimos'
        const [resultado] = await connection.query(consulta)

        connection.end()

        res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function criarEmprestimos(req: Request, res: Response) {
    const { idUsuario, idItem, dataDeEmprestimo, dataDeDevolucao, status } =
        req.body

    if (
        !idUsuario ||
        !idItem ||
        !dataDeEmprestimo ||
        !dataDeDevolucao ||
        !status
    ) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const emprestimo: Emprestimo = {
        idUsuario,
        idItem,
        dataDeEmprestimo,
        dataDeDevolucao,
        status,
    }

    try {
        const connection = await criarConexao()

        const consulta =
            'INSERT INTO emprestimos (id_usuario, id_item, `data-de-emprestimo`, `data-de-devolucao`, status) VALUES (?,?,?,?,?)'
        await connection.query(consulta, [
            emprestimo.idUsuario,
            emprestimo.idItem,
            emprestimo.dataDeEmprestimo,
            emprestimo.dataDeDevolucao,
            emprestimo.status,
        ])

        connection.end()

        res.status(201).json({ message: 'Loan added succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function atualizarEmprestimos(req: Request, res: Response) {
    const { dataDeEmprestimo, dataDeDevolucao, status } = req.body
    const { id } = req.params

    if (!dataDeEmprestimo && !dataDeDevolucao && !status) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const emprestimo: Omit<Emprestimo, 'idUsuario' | 'idItem'> = {
        dataDeEmprestimo,
        dataDeDevolucao,
        status,
    }

    try {
        const connection = await criarConexao()

        const consulta =
            'UPDATE emprestimos SET `data-de-emprestimo` = ?, `data-de-devolucao` = ?, status = ? WHERE id = ?'
        await connection.query(consulta, [
            emprestimo.dataDeEmprestimo,
            emprestimo.dataDeDevolucao,
            emprestimo.status,
            id,
        ])

        connection.end()

        res.status(200).json({ message: 'Loan updated succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function apagarEmprestimos(req: Request, res: Response) {
    const { id } = req.params

    try {
        const connection = await criarConexao()

        const consulta = 'DELETE FROM emprestimos WHERE id = ?'

        await connection.query(consulta, [id])

        connection.end()

        res.status(200).json({ message: 'Loan removed succesfully!' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export {
    getEmprestimos,
    criarEmprestimos,
    atualizarEmprestimos,
    apagarEmprestimos,
}
