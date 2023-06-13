import mysql from 'mysql2'

export let conection: mysql.Connection

export function connectToDatabase() {
    conection = mysql.createConnection({
        host: '200.53.30.37',
        user: `${process.env.USER}`,
        password: `${process.env.PASSWORD}`,
        database: `${process.env.DATABASE}`,
        port: 32783,
    })
}
