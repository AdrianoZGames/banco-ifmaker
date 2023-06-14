import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import cors from 'cors'

config()

import { routes } from './routes'

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req: Request, res: Response) => {
    res.render('index')
})
app.get('/itens', (req: Request, res: Response) => {
    res.render('pages/itens')
})
app.get('/emprestimos', (req: Request, res: Response) => {
    res.render('pages/emprestimos')
})
app.get('/usuarios', (req: Request, res: Response) => {
    res.render('pages/usuarios')
})

app.listen(port, () => {
    console.log(
        `Servidor iniciado com sucesso ${port}! - http://localhost:${port}`
    )
})
