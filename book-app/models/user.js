const { LowSync, JSONFileSync } = require('lowdb');

const adapter = new JSONFileSync('db.json');
const db = new LowSync(adapter);
db.read();
db.data ||= { users: [], books: [], tokens: [] };

module.exports = db;
