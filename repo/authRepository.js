const db = require("../connectivity/db");

exports.insertUser = (name, password, callback) => {
  const sql = "INSERT INTO auth (name, password) VALUES (?, ?)";
  db.query(sql, [name, password], (err, result) => {
    if (err) {
      console.error("Insert failed:", err.message);
      return callback(err);
    }
    return callback(null, result);
  });
};
