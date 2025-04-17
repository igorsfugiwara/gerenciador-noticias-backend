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
# 🧰 Como Iniciar o Backend com Docker e MongoDB
Este guia é para quem deseja rodar o backend do projeto utilizando o Docker, sem precisar instalar o MongoDB diretamente no computador.

## ✅ Pré-requisitos
- Docker instalado no seu sistema.
- Node.js e npm instalados (se ainda não estiverem).

## 🐳 Instalando o Docker
### Windows e macOS
- Acesse o site oficial do Docker: https://www.docker.com/products/docker-desktop
- Baixe e instale o Docker Desktop.
- Após a instalação, abra o Docker Desktop para garantir que está funcionando corretamente.

### Linux (Ubuntu)
- Atualize os pacotes existentes:
```bash
sudo apt update
```
- Instale os pacotes necessários:
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
- Adicione a chave GPG oficial do Docker:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
- Adicione o repositório do Docker às fontes do APT:
```bash 
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```
- Atualize o banco de dados de pacotes com os pacotes do Docker:
```bash
sudo apt update
```
- Instale o Docker:
```bash
sudo apt install docker-ce
```
- Verifique se o Docker está instalado corretamente:
```bash
docker --version
```

## 📦 Configurando o MongoDB com Docker
Vamos utilizar o Docker para rodar o MongoDB em um contêiner.

1. Crie um arquivo docker-compose.yml na raiz do seu projeto com o seguinte conteúdo:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
  ```

Este arquivo define um serviço chamado mongodb que:
- Usa a imagem oficial do MongoDB.
- Mapeia a porta padrão do MongoDB (27017) para o host.
- Define um usuário e senha padrão (admin / admin123).
- Persiste os dados em um volume chamado mongodb_data.
2. Inicie o contêiner do MongoDB:

No terminal, na raiz do seu projeto, execute:
```bash
docker-compose up -d
```
Isso fará o download da imagem do MongoDB (se ainda não tiver) e iniciará o serviço em segundo plano.

3.Verifique se o contêiner está rodando:
```bash
docker ps
```
Você deve ver o contêiner mongodb na lista.

## 🚀 Iniciando o Backend
1. Clone o repositório do backend:
```bash
git clone https://github.com/igorsfugiwara/gerenciador-noticias-backend.git
```
2. Acesse o diretório do projeto:
```bash
cd gerenciador-noticias-backend
```
3. Instale as dependências:
```bash
npm install
```
4. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```env
PORT=10000
MONGO_URI=mongodb://admin:admin123@localhost:27017
```
Aqui, MONGO_URI é a string de conexão com o MongoDB que está rodando no contêiner Docker.

5. Inicie o servidor:
```bash
npm start
```
Se tudo estiver correto, você verá uma mensagem indicando que o servidor está rodando na porta 10000.

## 🧪 Testando a Conexão com o MongoDB
Você pode utilizar ferramentas como o MongoDB Compass para conectar-se ao MongoDB e verificar os dados.
- Host: localhost
- Porta: 27017
- Usuário: admin
- Senha: admin123

## 🧹 Parando os Contêineres
Para parar o MongoDB que está rodando no Docker:
```bash
docker-compose down
```

## 📌 Observações
- Certifique-se de que o Docker esteja rodando antes de iniciar o backend.
- Se alterar as credenciais do MongoDB, atualize também a variável MONGO_URI no arquivo .env.