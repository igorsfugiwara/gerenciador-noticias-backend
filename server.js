// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noticiaRoutes = require('./routes/noticiaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/noticias', noticiaRoutes);

if (require.main === module && process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  );
}

module.exports = app;
