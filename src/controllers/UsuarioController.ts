import { Request, Response } from 'express'
import { criarConexao } from '../database'
import { Usuario } from '../models/Usuario'

async function getUsuario(req: Request, res: Response) {
    try {
        const connection = await criarConexao()

        const [resultado] = await connection.query('SELECT * FROM usuarios')

        connection.end()

        res.status(200).json(resultado)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

async function postUsuario(req: Request, res: Response) {
    const { name, password } = req.body

    if (!name || !password) {
        return res.status(400).json({ error: 'data is missing' })
    }

    const encryptedPassword = await bcrypt.hash(password, 8)

    const user = new User({
        _id: uuid(),
        name,
        password: encryptedPassword,
        additionDate: new Date(),
    })

    try {
        await user.save()

        return res.status(201).json({ message: 'User added succesfully!' })
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

async function puUsuario(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { name, password } = req.body
    const { id } = req.params

    if (!name && !password) {
        return res.status(400).json({ error: 'You must enter a new data' })
    }

    const filter = { _id: id }
    const updateDoc = {
        $set: {
            name,
            password,
        },
    }

    try {
        await User.updateOne(filter, updateDoc)

        return res.status(200).json({ message: 'User updated succesfully!' })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

async function deleteUsuario(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params
    const filter = { _id: id }

    try {
        await User.deleteOne(filter)
        return res.status(200).json({ message: 'User removed succesfully!' })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

export { getUsuario, postUsuario, puUsuario, deleteUsuario }
