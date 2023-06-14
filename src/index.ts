import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

config()

import { criarConexao } from './database'

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/emprestimos', (req, res) => {
    res.render('pages/emprestimos')
})
app.get('/itens', (req, res) => {
    res.render('pages/itens')
})
app.get('/usuarios', (req, res) => {
    res.render('pages/usuarios')
})

app.get('/api/usuarios', async (req, res) => {
    try {
        const connection = await criarConexao()

        const [rows] = await connection.query('SELECT * FROM usuarios')

        connection.end()

        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})
app.get('/api/itens', async (req, res) => {
    try {
        const connection = await criarConexao()

        const [rows] = await connection.query('SELECT * FROM itens')

        connection.end()

        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})
app.get('/api/emprestimos', async (req, res) => {
    try {
        const connection = await criarConexao()

        const [rows] = await connection.query('SELECT * FROM emprestimos')

        connection.end()

        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.listen(port, () => {
    console.log(
        `Servidor iniciado com sucesso ${port}! - http://localhost:${port}`
    )
})
