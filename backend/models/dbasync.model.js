import mysql from 'mysql2/promise.js';
import { db_config } from "../config/db.config.js";
const pool = mysql.createPool({
    host: db_config.HOST,
    port: db_config.PORT,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
});

try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database.");
    connection.release();
}
catch (err) {
    console.error('Database connection failed:', err);
}

const query = async (sql, param) => {
    return await pool.query(sql, param);
}

export { query };