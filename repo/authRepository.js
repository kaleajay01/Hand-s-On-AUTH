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

exports.findUserByName = (name, callback) => {
  const sql = "SELECT * FROM auth WHERE name = ? LIMIT 1";
  db.query(sql, [name], (err, results) => {
    if (err) {
      console.error("Lookup failed:", err.message);
      return callback(err);
    }
    const user = results && results.length > 0 ? results[0] : null;
    return callback(null, user);
  });
};
