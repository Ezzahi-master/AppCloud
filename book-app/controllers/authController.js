const crypto = require('crypto');
const db = require('../models/user');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

exports.register = (req, res) => {
  const { username, password } = req.body;
  const userExists = db.data.users.find(u => u.username === username);
  if (userExists) return res.status(400).send('User exists');

  const hashed = hashPassword(password);
  db.data.users.push({ username, password: hashed });
  db.write();
  res.send('User registered');
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users.find(u => u.username === username);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).send('Invalid credentials');
  }

  const token = crypto.randomBytes(32).toString('hex');
  db.data.tokens.push({ username, token });
  db.write();
  res.json({ token });
};

exports.logout = (req, res) => {
  const auth = req.headers.authorization;
  const token = auth?.split(' ')[1];
  db.data.tokens = db.data.tokens.filter(t => t.token !== token);
  db.write();
  res.send('Logged out');
};
