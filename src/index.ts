import express from 'express'

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.set ('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.send('Hola Adriano!')
})
app.get('/inicio', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Servidor iniciado com sucesso ${port}! - http://localhost:${port}`)
})
