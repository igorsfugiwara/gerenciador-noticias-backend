const Noticia = require("../models/Noticia");
const mongoose = require('mongoose');

// GET todas as notícias
exports.getAll = async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
};

// GET notícia por ID (campo `id`)
exports.getById = async (req, res) => {
  try {
    const newsId = parseInt(req.params.id, 10);
    const noticia = await Noticia.findOne({ id: newsId });
    if (!noticia) {
      return res.status(404).json({ error: "Notícia não encontrada" });
    }
    res.status(200).json(noticia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar notícia' });
  }
};

// POST criar nova notícia com validação de campos obrigatórios
exports.create = async (req, res) => {
  const {
    id,
    editoria,
    url,
    titulo,
    subtitulo,
    data_hora_publicacao,
    imagem,
    imagem_thumb,
    conteudo
  } = req.body;

  // Validação de campos obrigatórios
  if (
    id == null ||
    !editoria ||
    !url ||
    !titulo ||
    !subtitulo ||
    !data_hora_publicacao ||
    !imagem ||
    !imagem_thumb ||
    !conteudo
  ) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }

  try {
    const nova = new Noticia({
      id,
      editoria,
      url,
      titulo,
      subtitulo,
      data_hora_publicacao,
      imagem,
      imagem_thumb,
      conteudo
    });
    await nova.save();
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
};

// DELETE remover notícia por campo `id` e retornar 204
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Noticia.findByIdAndDelete(id);
    if (!result) return res.status(404).send({ error: 'Notícia não encontrada' });
    res.status(200).send({ message: 'Notícia excluída com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro no servidor' });
  }
};

// DELETE /noticias - limpar todas as notícias (opcional)
exports.deleteAll = async (req, res) => {
  try {
    const resultado = await Noticia.deleteMany({});
    res.status(200).json({
      message: "Todas as notícias foram deletadas",
      deletedCount: resultado.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar todas as notícias" });
  }
};

// PUT atualizar notícia existente por campo `_id`
exports.editNews = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const updatedNews = await Noticia.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar notícia' });
  }
};