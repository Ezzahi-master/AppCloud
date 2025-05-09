const db = require('../models/user');

exports.verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(403).send('No token');

  const token = auth.split(' ')[1];
  const valid = db.data.tokens.find(t => t.token === token);
  if (!valid) return res.status(401).send('Invalid token');

  req.user = valid.username;
  next();
};
