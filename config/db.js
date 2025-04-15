const noticaModel = require('../models/Noticia.js');
const noticas = require('../noticias.json');
// config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB conectado");
    configDB()
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB", error);
    process.exit(1);
  }
};

const configDB = async () => {
  try {
    const totalNoticias = await noticaModel.countDocuments();

    if (totalNoticias === 0) {
      console.log('📭 Nenhuma notícia encontrada. Inserindo...');
      await noticaModel.insertMany(noticas);
      console.log('✅ Notícias inseridas com sucesso.');
    } else {
      console.log(`📚 Já existem ${totalNoticias} notícias. Nenhuma inserção feita.`);
    }
  } catch (err) {
    console.error("❌ Erro ao configurar o banco de dados:", err);
  }
};


module.exports = connectDB;