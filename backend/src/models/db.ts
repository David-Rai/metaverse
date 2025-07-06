import mysql from 'mysql2/promise'

const pool= mysql.createPool({
    host:"",
    user:"",
    database:"",
    password:"",
    waitForConnections:true
})


export default pool

