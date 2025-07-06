import mysql from 'mysql2/promise';
// Define options for stricter type checking
const poolOptions = {
    host: 'localhost',
    user: 'root',
    database: 'metaverse',
    password: '1Mysql##',
    waitForConnections: true
};
// Create pool with correct typings
const pool = mysql.createPool(poolOptions);
export default pool;
