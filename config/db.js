// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');
const NoticiaModel = require('../models/Noticia');
const seedData = require('../noticias.json');

async function seedDatabase() {
  try {
    const count = await NoticiaModel.countDocuments();
    if (count === 0) {
      console.log('📭 Nenhuma notícia encontrada. Inserindo seed...');
      await NoticiaModel.insertMany(seedData);
      console.log('✅ Notícias inseridas com sucesso.');
    } else {
      console.log(`📚 Já existem ${count} notícias. Seed não foi executada.`);
    }
  } catch (err) {
    console.error('❌ Erro no seed do banco:', err);
  }
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (process.env.NODE_ENV !== 'test') {
      console.log('🟢 MongoDB conectado');
    }
    // Só faça seed fora de test
    if (process.env.NODE_ENV !== 'test') {
      await seedDatabase();
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('❌ Erro ao conectar no MongoDB', err);
    }
    throw err;
  }
}

module.exports = connectDB;
