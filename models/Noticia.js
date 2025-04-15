const mongoose = require("mongoose");

const NoticiaSchema = new mongoose.Schema({
  id: Number,
  editoria: String,
  url: String,
  titulo: String,
  subtitulo: String,
  data_hora_publicacao: String,
  imagem: String,
  imagem_thumb: String,
  conteudo: String,
});

module.exports = mongoose.model("Noticia", NoticiaSchema);
