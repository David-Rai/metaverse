import mysql from 'mysql2/promise';
import fs from 'fs';
const HOST = process.env.HOST;
const USER = process.env.USER;
const PORT = process.env.DBPORT;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
// // Define options for stricter type checking
// const poolOptions: PoolOptions = {
//   host: HOST,
//   user: USER,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
//   database: DATABASE,
//   password: PASSWORD,
//   waitForConnections: true,
//   ssl: {
//     ca: fs.readFileSync(new URL('./isrgrootx1.pem', import.meta.url)),
//     rejectUnauthorized: false
//   }
// }
// Define options for stricter type checking
const poolOptions = {
    host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
    user: "2ATCPAmibzb9x8g.root",
    port: 4000,
    database: "metaverse",
    password: "t6yMhpe2BvqaAbeZ",
    waitForConnections: true,
    ssl: {
        ca: fs.readFileSync(new URL('./isrgrootx1.pem', import.meta.url)),
        rejectUnauthorized: false
    }
};
// Create pool with correct typings
const pool = mysql.createPool(poolOptions);
export default pool;
