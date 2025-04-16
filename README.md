# 📰 Gerenciador de Notícias (Back-End)

Este repositório contém a API que serve como backend para o projeto de gerenciamento de notícias. Desenvolvida com **Node.js**, **Express**, **MongoDB** e **Mongoose**, oferece uma estrutura sólida e escalável para o gerenciamento de dados.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor, permitindo a construção de aplicações escaláveis e de alto desempenho.
- **Express**: Framework minimalista para Node.js, facilitando a criação de APIs RESTful com roteamento eficiente.
- **MongoDB**: Banco de dados NoSQL orientado a documentos, ideal para armazenar dados flexíveis e escaláveis.
- **Mongoose**: Biblioteca ODM (Object Data Modeling) para MongoDB e Node.js, proporcionando uma solução baseada em esquemas para modelar os dados.

## 📦 Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/igorsfugiwara/gerenciador-noticias-backend.git
   cd gerenciador-noticias-backend
   ```

2. Instale as dependências:

  ```bash
    npm install
  ```

3. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
MONGO_URI=mongodb://localhost:27017/gerenciador-noticias
PORT=5000
```

3. Inicie o servidor de desenvolvimento:

  ```bash
    npm start
  ```

  A API estará disponível em http://localhost:5000.

## 🧩 Funcionalidades
- Cadastro de notícias: Permite adicionar novas notícias ao sistema.
- Edição de notícias: Facilita a atualização de informações de notícias existentes.
- Exclusão de notícias: Oferece a possibilidade de remover notícias do sistema.
- Listagem de notícias: Exibe as notícias cadastradas de forma organizada.

## 🔗 Repositório Front-End
O front-end deste projeto está disponível em: https://github.com/igorsfugiwara/gerenciador-de-noticias .

#
#
# 🐳 Execução com Docker
Para facilitar a configuração e execução do projeto, você pode utilizar o Docker e o Docker Compose. Siga os passos abaixo:

Pré-requisitos
- Docker instalado em sua máquina.
- Docker Compose instalado.​

Instruções
Clone este repositório:​

```bash
git clone https://github.com/igorsfugiwara/gerenciador-noticias-backend.git
cd gerenciador-noticias-backend
```
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:​
```env
MONGO_URI=mongodb://mongo:27017/gerenciador-noticias
PORT=5000
```

Inicie os contêineres com o Docker Compose:​

```bash
docker-compose up --build
```

Isso iniciará tanto o backend quanto o banco de dados MongoDB.

Acesse a aplicação:​

Backend: http://localhost:5000​

## Estrutura dos Contêineres
- backend: Aplicação Node.js com Express e Mongoose.
- mongo: Banco de dados MongoDB.​

