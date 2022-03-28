import mysql from 'mysql2/promise';

export const DbConnection = async()=>{
    return await mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'kortoba2',
        password:''
    })
}
