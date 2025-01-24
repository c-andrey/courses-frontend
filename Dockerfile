# Etapa 1: Build stage
FROM node:23.6.1-alpine3.20 AS builder


# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar dependências (permitindo peer dependencies legacy)
RUN npm install --legacy-peer-deps

# Copiar o restante do projeto
COPY . .

# Rodar o build do projeto
RUN npm run build

# Etapa 2: Runtime stage
FROM node:23.6.1-alpine3.20 

# Instalar bash (caso necessário em runtime)
RUN apk add --no-cache bash

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos necessários da etapa anterior
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalar dependências de produção
RUN npm install --production

# Expor a porta da aplicação
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["node", "dist/index.js"]
