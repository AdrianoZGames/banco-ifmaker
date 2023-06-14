import mysql from 'mysql2/promise'

export async function criarConexao() {
    const connection = await mysql.createConnection({
        host: '200.53.30.37',
        user: `${process.env.USER}`,
        password: `${process.env.PASSWORD}`,
        database: `${process.env.DATABASE}`,
        port: 32783,
    })

    return connection
}
