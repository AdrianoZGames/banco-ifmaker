import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'

config()

import { conection, connectToDatabase } from './database'

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.send('Hola Adriano!')
})
app.get('/inicio', (req, res) => {
    res.render('index')
})
app.get('/users', async (req, res) => {
    try {
        connectToDatabase()

        conection.query('SELECT * FROM pessoa', (error, results) => {
            if (error) {
                console.error('Erro ao executar a consulta:', error)
                return
            }

            res.status(200).json(results)

            conection.end((err) => {
                if (err) {
                    console.error('Erro ao fechar a conexão:', err)
                    return
                }
            })
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

app.listen(port, () => {
    console.log(
        `Servidor iniciado com sucesso ${port}! - http://localhost:${port}`
    )
})
