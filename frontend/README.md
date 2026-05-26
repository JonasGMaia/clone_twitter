# Twitter Clone

Uma aplicação full-stack que recria as principais funcionalidades de um microblog.

## Funcionalidades

  **Sistema de Autenticação e Criação de Conta**
O sistema permite que novos usuários se cadastrem e façam login com segurança.

  **Configuração de Perfil**
O usuário pode alterar sua foto de perfil, nome e senha.

  **Sistema de Seguir**
É possível seguir outros usuários e ver sua lista de seguidos e seguidores.

  **Feed de Notícias**
O feed de notícias exibe postagens das pessoas seguidas em ordem da mais recente para mais antiga.

  **Interações nas Postagens**
As postagens podem receber curtidas e comentários de outros usuários.

## Tecnologias Utilizadas

**Frontend:**
* [React](https://reactjs.org/) 
* [TypeScript](https://www.typescriptlang.org/) 
* [Vite](https://vitejs.dev/) 
* [Redux Toolkit](https://redux-toolkit.js.org/) 
* [Styled Components](https://styled-components.com/)
* [Axios](https://axios-http.com/)

**Backend:**
* [Python](https://www.python.org/)
* [Django](https://www.djangoproject.com/)
* [Django Rest Framework (DRF)](https://www.django-rest-framework.org/)
* [JWT (JSON Web Tokens)](https://jwt.io/)
* [Poetry](https://python-poetry.org/)

## Pré-requisitos

* [Node.js](https://nodejs.org/en/) (Versão 18 ou superior)
* [Python](https://www.python.org/downloads/) (Versão 3.10 ou superior)
* [Poetry](https://python-poetry.org/docs/#installation) 

## Como rodar o projeto localmente

**1. Clonar repositório**
**2. Rodar o Backend:**

  # Abra um terminal e navegue até a pasta do backend:
  cd backend
  # Instale as dependências usando o Poetry
  poetry install

  # Ative o ambiente virtual do Poetry
  poetry shell

  # Rode as migrações para criar o banco de dados
  python manage.py migrate

  # Inicie o servidor do Django (rodará na porta 8000)
  python manage.py runserver

**3. Rodar o Frontend:**

# Abra um novo terminal e navegue até a pasta do frontend:
cd frontend

# Instale as dependências do Node
npm install

# Inicie o servidor de desenvolvimento do Vite (uma porta padrão será designada)
npm run dev

## Variáveis de Ambiente

Para rodar o projeto localmente, pode ser necessário configurar algumas variáveis de ambiente.

**Backend:**
Criar um arquivo `.env` na raiz da pasta `backend` com as seguintes variáveis:
SECRET_KEY=a_sua_chave_secreta_do_django_aqui
DEBUG=True
# Adicione outras configurações que utilize, como as credenciais da base de dados
**Frontend:**
Caso tenha configurado o Axios para ler o URL da API de uma variável, crie um arquivo .env na pasta frontend:

Snippet de código
VITE_API_URL=http://localhost:8000/api

# Acesse e experimente o projeto através do link: