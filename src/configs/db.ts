import mysql from 'mysql2/promise';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'kortoba',
    password:''
})

