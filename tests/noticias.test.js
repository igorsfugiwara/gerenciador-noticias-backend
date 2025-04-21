// Configura o ambiente de teste ANTES de qualquer importação
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/gerenciador_test';

// Silencia logs para não atrapalhar o Jest
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const Noticia = require('../models/Noticia');

// Aguarda a conexão iniciada em server.js
beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) =>
      mongoose.connection.once('open', resolve)
    );
  }
});

// Limpa banco e fecha conexão
afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Limpa e popula banco antes de cada teste
  await Noticia.deleteMany({});
  await Noticia.create({
    id: 1,
    editoria: 'Economia',
    url: 'https://www.estadao.com.br/economia/china-nova-retaliacao-tarifas-estados-unidos/',
    titulo: 'China retalia os EUA, eleva tarifas para 125%',
    subtitulo: 'China diz que guerra se tornou ‘um jogo de números’',
    data_hora_publicacao: '2025-04-11 16:44:00',
    imagem: 'https://www.estadao.com.br/resizer/...1200',
    imagem_thumb: 'https://www.estadao.com.br/resizer/...380',
    conteudo: '<p>Conteúdo de exemplo</p>',
  });
});

describe('GET /noticias', () => {
  it('should return an array of noticias', async () => {
    const res = await request(app).get('/noticias');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id', 1);
  });
});

describe('GET /noticias/:id', () => {
  it('should return a single noticia by id', async () => {
    const res = await request(app).get('/noticias/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('titulo');
  });

  it('should return 404 if noticia not found', async () => {
    const res = await request(app).get('/noticias/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /noticias', () => {
  it('should create a new noticia', async () => {
    const newNoticia = {
      id: 2,
      editoria: 'Política',
      url: 'https://exemplo.com/politica',
      titulo: 'Nova lei aprovada',
      subtitulo: 'Detalhes da nova lei',
      data_hora_publicacao: '2025-04-20 10:00:00',
      imagem: 'https://exemplo.com/img.jpg',
      imagem_thumb: 'https://exemplo.com/thumb.jpg',
      conteudo: '<p>Texto da notícia</p>',
    };

    const res = await request(app)
      .post('/noticias')
      .send(newNoticia)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id', 2);
    expect(res.body).toHaveProperty('titulo', 'Nova lei aprovada');
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app).post('/noticias').send({ editoria: 'Saúde' });
    expect(res.statusCode).toBe(400);
  });
});

describe('PUT /noticias/:id', () => {
  it('should update an existing noticia', async () => {
    const updates = { titulo: 'Tarifas ajustadas' };
    const res = await request(app)
      .put('/noticias/1')
      .send(updates)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Tarifas ajustadas');
  });
});

describe('DELETE /noticias/:id', () => {
  it('should delete a noticia', async () => {
    const res = await request(app).delete('/noticias/1');
    expect(res.statusCode).toBe(204);

    const getRes = await request(app).get('/noticias/1');
    expect(getRes.statusCode).toBe(404 || 500);
  });
});
