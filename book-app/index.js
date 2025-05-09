const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// Lancement serveur
app.listen(3000, () => console.log('Server running on port 3000'));
