import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hola Adriano!')
})

app.listen(port, () => {
    console.log(`Servidor iniciado com sucesso ${port}! - http://localhost:${port}`)
})
