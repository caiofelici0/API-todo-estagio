# API-todo-estagio

Este é o backend do Projeto Lista de Tarefas para uma vaga de estágio. O projeto foi criado utilizando o TypeScript, o Express e o Prisma. O Prisma foi escolhido como ORM para facilitar a criação do banco de dados relacional, que é o MySQL. Esta API possui autenticação utilizando o JWT, que é passado como cookie para o navegador. Como modelo arquitetural foi escolhido o MVC por questões de familiaridade.

## Deploy do projeto:

https://todo-estagio.vercel.app/

## Passos para rodar o projeto localmente:

Primeiramente instale as dependências do projeto:
```
npm install
```

Em seguida crie um arquivo .env com as seguintes variáveis:
```
DATABASE_URL="url_banco_de_dados" // substitua aqui
JWT_SECRET=secret_key
PORT=3000
NODE_ENV=dev
ORIGIN_CORS=url_do_frontend // substitua aqui
```

Realize as migrações para o banco de dados:
```
npx prisma migrate deploy
```

Agora inicie o serviço:
```
npm run dev
```
