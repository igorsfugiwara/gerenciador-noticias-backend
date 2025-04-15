const mongoose = require("mongoose");
const Noticia = require("../models/Noticia");
const noticias = require("../noticias.json");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Noticia.deleteMany();
  await Noticia.insertMany(noticias);
  console.log("✅ Notícias importadas com sucesso");
  mongoose.disconnect();
});