# ⚽ Trybe Futebol Clube 
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat)

O **Trybe Futebol Clube** é uma API REST para gerenciamento de partidas de futebol. Com ela, é possível criar partidas, editar placares, acompanhar rankings, cadastrar times e muito mais. Construída com **Node.js**, **TypeScript** e **Docker**, a aplicação oferece uma base sólida, segura e fácil de rodar localmente.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)

---

## 🧰 Pré-requisitos

Antes de rodar o projeto, certifique-se de que os seguintes itens estão instalados na sua máquina:

- ✅ Node.js **v16.14.0 LTS** ou superior
- ✅ Docker
- ✅ Docker Compose **>= 1.29.2**

### 🔧 Instalando o Node.js com NVM

```bash
# Instale o NVM (guia oficial: https://github.com/nvm-sh/nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Reinicie o terminal, depois:
nvm install 16.14
nvm use 16.14
nvm alias default 16.14
```

### 🐳 Instalando o Docker + Docker Compose

Siga o [guia oficial do Docker](https://docs.docker.com/engine/install/) para seu sistema operacional.

Para instalar o Docker Compose:  
[Guia Oficial - Docker Compose](https://docs.docker.com/compose/install/)

---

## 📦 Como Rodar o Projeto

### 1️⃣ Clone o Repositório

```bash
git clone git@github.com:daviazev/trybe-futebol-clube.git
cd trybe-futebol-clube
```

### 2️⃣ Configure as Variáveis de Ambiente

Dentro da pasta `app/backend/`, renomeie o arquivo `.env.example` para `.env`:

```bash
mv app/backend/.env.example app/backend/.env
```

Edite o arquivo `.env` com as informações corretas:

```env
JWT_SECRET=jwt_secret
APP_PORT=3001
DB_USER=seu_user
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=3306
```

### 3️⃣ Suba os containers com Docker

Na raiz do projeto:

```bash
npm install
npm run compose:up
```

A aplicação estará disponível em:  
🔗 [http://localhost:3000](http://localhost:3000)

---

## 🔐 Acesso à Aplicação

Para testar as funcionalidades de login, criação de partidas, edição de placares, etc., utilize os seguintes usuários:

### 👑 Admin (acesso total)

```json
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

### 🙋‍♂️ Usuário Comum (acesso limitado)

```json
{
  "email": "user@user.com",
  "password": "secret_user"
}
```

---

## 📚 Endpoints da API

### 🔐 Autenticação

| Método | Descrição                            | URL                                      |
|--------|--------------------------------------|------------------------------------------|
| POST   | Login e obtenção de token JWT        | `/login`                                 |
| GET    | Valida o token e retorna o `role`    | `/login/validate`                        |

### 🧑‍🤝‍🧑 Times

| Método | Descrição                            | URL                                      |
|--------|--------------------------------------|------------------------------------------|
| GET    | Lista todos os times                 | `/teams`                                 |
| GET    | Retorna um time pelo ID              | `/teams/:id`                             |

### 🏟️ Partidas

| Método | Descrição                            | URL                                      |
|--------|--------------------------------------|------------------------------------------|
| GET    | Lista todas as partidas              | `/matches`                               |
| POST   | Cria uma nova partida                | `/matches`                               |
| PATCH  | Atualiza placar de uma partida       | `/matches/:id`                           |
| PATCH  | Finaliza uma partida em andamento    | `/matches/:id/finish`                    |

### 🏆 Classificação

| Método | Descrição                            | URL                                      |
|--------|--------------------------------------|------------------------------------------|
| GET    | Classificação geral                  | `/leaderboard`                           |
| GET    | Classificação em jogos em casa       | `/leaderboard/home`                      |
| GET    | Classificação em jogos fora de casa  | `/leaderboard/away`                      |

---

## 💡 Dicas Finais

- A API roda na porta `3001` e o frontend na `3000`.
- Use ferramentas como [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/) ou [Thunder Client](https://www.thunderclient.com/) para testar os endpoints.
- O token JWT é necessário para acessar rotas protegidas (como partidas e criação/edição de dados).

---
