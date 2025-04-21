process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost:27017/gerenciador_test';

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Noticia = require('../models/Noticia');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

let noticiaId;

beforeEach(async () => {
  await Noticia.deleteMany({});
  const noticia = await Noticia.create({
    id: 1,
    editoria: 'Economia',
    url: 'https://exemplo.com/economia',
    titulo: 'Título Exemplo',
    subtitulo: 'Subtitulo Exemplo',
    data_hora_publicacao: '2025-04-20T10:00:00Z',
    imagem: 'https://img.com/1.jpg',
    imagem_thumb: 'https://img.com/thumb1.jpg',
    conteudo: '<p>Conteúdo</p>'
  });
  noticiaId = noticia._id.toString();
});

describe('Notícia API', () => {
  test('GET /noticias - deve retornar todas as notícias', async () => {
    const res = await request(app).get('/noticias');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('GET /noticias/:id - deve retornar uma notícia específica', async () => {
    const res = await request(app).get(`/noticias/${noticiaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Título Exemplo');
  });

  test('POST /noticias - deve criar uma nova notícia', async () => {
    const nova = {
      id: 2,
      editoria: 'Política',
      url: 'https://exemplo.com/politica',
      titulo: 'Nova notícia',
      subtitulo: 'Sub',
      data_hora_publicacao: '2025-04-21T12:00:00Z',
      imagem: 'https://img.com/2.jpg',
      imagem_thumb: 'https://img.com/thumb2.jpg',
      conteudo: '<p>Nova</p>'
    };

    const res = await request(app).post('/noticias').send(nova);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('titulo', 'Nova notícia');
  });

  test('PUT /noticias/:id - deve atualizar a notícia', async () => {
    const res = await request(app).put(`/noticias/${noticiaId}`).send({
      titulo: 'Atualizado'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Atualizado');
  });

  test('DELETE /noticias/:id - deve deletar a notícia', async () => {
    const res = await request(app).delete(`/noticias/${noticiaId}`);
    expect(res.statusCode).toBe(204);

    const check = await request(app).get(`/noticias/${noticiaId}`);
    expect(check.statusCode).toBe(404);
  });

  test('DELETE /noticias - deve deletar todas as notícias', async () => {
    const res = await request(app).delete('/noticias');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('deletedCount', 1);
  });
});
