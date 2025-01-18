import mysql from 'mysql2';
import { db_config } from "../config/db.config.js";

console.log("Trying to connect to DB...");
console.log(db_config.HOST, db_config.PORT, db_config.USER, db_config.PASSWORD, db_config.DB);
const connection = mysql.createConnection({
    host: db_config.HOST,
    port: db_config.PORT,
    user: db_config.USER,
    password: db_config.PASSWORD,
    database: db_config.DB
});
    
// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection");
        console.log(err);
    }
    else {
        console.log(`Database Connected`);
    }
});

const query_callBack = (sql, params, callBack) => {
    connection.query(sql, params, callBack);
}

export { query_callBack };