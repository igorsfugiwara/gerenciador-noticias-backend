const Noticia = require("../models/Noticia");

exports.getAll = async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar notícias' });
  }
};

exports.getById = async (req, res) => {
  const newsId = req.params.id;
  const noticia = await Noticia.findById(newsId);
  if (!noticia) return res.status(404).json({ error: "Notícia não encontrada" });
  res.json(noticia);
};

exports.create = async (req, res) => {
  const noticia = new Noticia(req.body);
  await noticia.save();
  res.status(201).json(noticia);
};

exports.delete = async (req, res) => {
  const newsId = req.params.id;
  console.log('<,,,,>',newsId);
  const deleted = await Noticia.findByIdAndDelete(newsId);
  if (!deleted) return res.status(404).json({ error: "Notícia não encontrada" });
  res.json({ message: "Notícia deletada" });
};

// Deletar depois
exports.deleteAll = async (req, res) => {
  try {
    const resultado = await Noticia.deleteMany({});
    res.json({
      message: "Todas as notícias foram deletadas",
      deletedCount: resultado.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar todas as notícias" });
  }
};

exports.editNews = async (req, res) => {
  const newsId = req.params.id;
  const { editoria, url, titulo, subtitulo, data_hora_publicacao, imagem, imagem_thumb, conteudo } = req.body;

  try {
    const updatedNews = await Noticia.findByIdAndUpdate(
      newsId,
      {
        editoria,
        url,
        titulo,
        subtitulo,
        data_hora_publicacao,
        imagem,
        imagem_thumb,
        conteudo
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }

    res.json(updatedNews);
  } catch (error) {
    console.error("Erro ao atualizar a notícia:", error);
    res.status(500).json({ error: "Erro ao atualizar a notícia" });
  }
};
