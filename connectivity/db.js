const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "auth",
};

const pool = mysql.createPool(dbConfig);


pool.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }
  console.log("MySQL connected");
  conn.release();
});

module.exports = pool;