const db = require('../config/db');

// ログイン情報の確認
exports.login = (email, password, callback) => {
  const sql = 'SELECT user_id as userId, authority FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);

    callback(null, results[0]);
  });
}
