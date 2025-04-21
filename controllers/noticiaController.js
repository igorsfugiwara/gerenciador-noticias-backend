const Noticia = require('../models/Noticia');
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

// GET notícia por _id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const noticia = await Noticia.findById(id);
    if (!noticia) {
      return res.status(404).json({ error: 'Notícia não encontrada' });
    }

    res.status(200).json(noticia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar notícia' });
  }
};

// POST criar nova notícia
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
    const novaNoticia = new Noticia({
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

    await novaNoticia.save();
    res.status(201).json(novaNoticia);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
};

// PUT atualizar notícia existente por _id
exports.editNews = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

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

// DELETE notícia por _id
exports.delete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const deleted = await Noticia.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Notícia não encontrada' });

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Erro no servidor' });
  }
};

// DELETE todas as notícias
exports.deleteAll = async (req, res) => {
  try {
    const resultado = await Noticia.deleteMany({});
    res.status(200).json({
      message: 'Todas as notícias foram deletadas',
      deletedCount: resultado.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar todas as notícias' });
  }
};
