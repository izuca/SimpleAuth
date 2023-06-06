# Projeto Básico de Express: SimpleAuth

Este é um projeto básico em Express, onde foram estudadas a autenticação de usuários e a criação de um CRUD em uma lista de tarefas (To-Do List).

## Recursos

O projeto possui os seguintes recursos:

- Autenticação de usuários (Json Web Token)
- Operações CRUD (Create, Read, Update, Delete)
- Hashing de senhas (Bcrypt)

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- Node.js
- Express
- MongoDB e MongoDB Atlas
- Mongoose
- JsonWebToken
- Dotenv
- BcryptJS
- CORS

## Configuração do Ambiente

Segue as instruções passo a passo sobre como configurar o ambiente de desenvolvimento.

1. Clone o repositório: `git clone https://github.com/izuca/SimpleAuth`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no arquivo `.env` onde:
   1. DATABASE_URL=`mongodb://username:password@host:port/database?options...`
   2. SECRET=`chave secreta`  
4. Inicie a aplicação: `npm start`
5. Utilize a aplicação seguindo a Documentação disponibilizada

## Configuração do Banco de Dados

1. Crie uma conta no MongoDB Atlas: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Crie um Cluster: ![](https://webimages.mongodb.com/_com_assets/cms/kmdu0r2qgvolofvzu-build-a-cluster.png?auto=format%2Ccompress)
3. Configure o Cluster pra região mais próxima a sua: ![](https://webimages.mongodb.com/_com_assets/cms/kmduabl7r7zdyslct-mongodb-atlas-shared-cluster.png?auto=format%2Ccompress)
4. Uma vez criado o cluster, acesse `Network Acess` e crie um acesso para o seu IP (ou acesso para todos, se preferir)
5. Copie a URL de conexão fornecida pelo MongoDB Atlas.
6. Cole a URL de conexão no arquivo `.env`.

## Uso

Para executar o projeto, siga as instruções abaixo:

1. Execute o projeto: `npm start`
2. Faça uma requisição para a API para realizar a autenticação e as operações CRUD.

## Endpoints:
### Login

Realiza o Login do Usuário

**Endpoint**: `.../user/login`

**Método**: `POST`

**Parâmetros de solicitação**:
- `username` (string, obrigatório): usuário.
- `password` (string, obrigatório): Senha do usuário.

**Exemplo de solicitação**:
    POST /user/login
    Content-Type: application/json

    {
    "username": "usuario@example.com",
    "password": "senha123"
    }

### Cadastro

Realiza o Cadastro do Usuário

**Endpoint**: `.../user/signup`

**Método**: `POST`

**Parâmetros de solicitação**:
- `username` (string, obrigatório): usuário.
- `password` (string, obrigatório): Senha do usuário.

**Exemplo de solicitação**:
    POST /user/login
    Content-Type: application/json

    {
    "username": "usuario@example.com",
    "password": "senha123"
    }

### READ de todas as Tasks

Disponibiliza todas as tasks criadas até agora

**Endpoint**: `.../todo/`

**Método**: `GET`

**Header de autenticação**:
- `authorization`: `bearer seu_token_jwt`

### READ de Task por ID

Disponibiliza a tasks de acordo com o ID informado

**Endpoint**: `.../todo/:id`

**Método**: `GET`

**Header de autenticação**:
- `authorization`: `bearer seu_token_jwt`

### Criar Task

Cria uma nova Task na Todo List

**Endpoint**: `.../user/`

**Método**: `POST`

**Header de autenticação**:
- `authorization`: `bearer seu_token_jwt`

**Parâmetros de solicitação**:
- `reminder` (string, obrigatório): Tarefa a ser realizada.

**Exemplo de solicitação**:
    POST /todo/
    Content-Type: application/json

    {
    "reminder": "Tarefa a ser relizada"
    }
### Atualizar Task

Atualiza a Task de Acordo com o seu ID

**Endpoint**: `.../user/:id`

**Método**: `PUT`

**Header de autenticação**:
- `authorization`: `bearer seu_token_jwt`

**Parâmetros de solicitação**:
- `reminder` (string, obrigatório): Tarefa atualizada.

**Exemplo de solicitação**:
    PUT /todo/:id
    Content-Type: application/json

    {
    "reminder": "Tarefa a ser atualizada"
    }

### Excluir Task

Exclui a Task de Acordo com o seu ID

**Endpoint**: `.../user/:id`

**Método**: `DELETE`

**Header de autenticação**:
- `authorization`: `bearer seu_token_jwt`

## Contribuição

O objetivo desse projeto é fundamentar, através da prática, a lógica por trás do funcionamento de uma autenticação usando JSON Web Token(JWT). Este repositório será usado para consultas futuras e revisar os conceitos trabalhados aqui.

Dessa forma, contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues), enviar solicitações de pull (pull requests) e até sugerir novos desafios que irão acrescenter ao meu aprendizado.



## Informações adicionais

Para realização do projeto, foi utilizado o seguinte artigo do blog:

[Basic Authentication with Node/Express and Mongo](https://dev.to/alexmercedcoder/basic-authentication-with-node-express-and-mongo-1a1c)
