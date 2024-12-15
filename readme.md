# API de Gerenciamento de Habilidades e Usuários

Este projeto implementa uma API para gerenciar habilidades, relacionamentos entre usuários e habilidades, e a validação de números de telefone. As funcionalidades incluem a criação, atualização, listagem e exclusão de habilidades, além de validar números de telefone usando uma API externa.

## Funcionalidades

### 1. **Gerenciamento de Habilidades**

- **Criar uma habilidade**: Permite a criação de uma nova habilidade com o nome e status ativo por padrão.
- **Editar uma habilidade**: Permite editar o nome ou o status (ativo/inativo) de uma habilidade.
- **Listar habilidades**: Exibe todas as habilidades cadastradas com informações completas.

### 2. **Relacionamento entre Usuários e Habilidades**

- **Criar relacionamento**: Permite vincular um usuário a uma habilidade, incluindo a quantidade de anos de experiência no exercício dessa habilidade.
- **Deletar relacionamento**: Permite excluir um ou mais relacionamentos de habilidades com um usuário.
- **Listar habilidades de um usuário**: Exibe todas as habilidades de um usuário, com informações completas, exceto a senha do usuário.

### 3. **Validação de Números de Telefone**

- **Validar número de telefone**: Permite validar um número de telefone através de uma API externa, retornando informações sobre a validade e o formato do número.

### 4. **Gerenciamento de Usuários**

- **Cria um novo Usuario**: Permite a criação de um novo usuario.

- **login**: Permite realizar o login e gerar um token.

## Endpoints

### **1. Habilidades**

#### `POST /abilities`

Cria uma nova habilidade.

**Exemplo de corpo da requisição:**

```json
{
  "name": "Cozinheiro"
}
```

**_Resposta:_**

```json
{
  "id": "uuid-da-habilidade",
  "name": "Cozinheiro",
  "active": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### `PUT /abilities`

Atualiza uma habilidade existente. Você pode alterar o nome ou o status (ativo/inativo).

**Exemplo de corpo da requisição:**

```json
{
  "id": "uuid-da-habilidade",
  "name": "Novo nome",
  "active": true
}
```

**_Resposta:_**

```json
{
  "id": "uuid-da-habilidade",
  "name": "Novo nome",
  "active": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### `GET /abilities`

Lista todas as habilidades cadastradas.

**_Resposta:_**

```json
[
  {
    "id": "uuid-da-habilidade",
    "name": "Cozinheiro",
    "active": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### **2. Relacionamento de Usuários e Habilidades**

#### `POST /users/abilities`

Vincula um usuário a uma habilidade, incluindo a quantidade de anos de experiência.

**Exemplo de corpo da requisição:**

```json
{
  "userId": "uuid-do-usuario",
  "abilityId": "uuid-da-habilidade",
  "yearsExperience": 5
}
```

**_Resposta:_**

```json
{
  "id": "uuid-do-relacionamento",
  "userId": "uuid-do-usuario",
  "abilityId": "uuid-da-habilidade",
  "yearsExperience": 5,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### `DELETE /users/abilities`

Exclui um ou mais relacionamentos entre usuários e habilidades.

**Exemplo de corpo da requisição:**

```json
{
  "userId": "uuid-do-usuario",
  "abilityIds": ["uuid-da-habilidade-1", "uuid-da-habilidade-2"]
}
```

**_Resposta:_**

```json
{
  "message": "Relacionamentos excluídos com sucesso."
}
```

#### `GET /users/abilities`

Lista as habilidades associadas a um usuário, incluindo todas as informações de habilidades, exceto a senha do usuário.

**_Resposta:_**

```json
[
  {
    "userId": "uuid-do-usuario",
    "abilityId": "uuid-da-habilidade",
    "yearsExperience": 5,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "ability": {
      "id": "uuid-da-habilidade",
      "name": "Cozinheiro",
      "active": true
    }
  }
]
```

### **3. Validação de Número de Telefone**

#### `POST /validate-phone`

Valida um número de telefone usando a API externa.

**Exemplo de corpo da requisição:**

```json
{
  "number": "14158586273"
}
```

**_Resposta:_**

```json
{
  "valid": true,
  "number": "14158586273",
  "local_format": "(415) 858-6273",
  "international_format": "+14158586273",
  "country_prefix": "+1",
  "country_code": "US",
  "country_name": "United States",
  "location": "California"
}
```

### **4. Gerenciamento de Usuários**

#### `POST /users/create`

Cria um novo usuário com nome, e-mail, data de nascimento e senha.

**Exemplo de corpo da requisição:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "birthdate": "1990-01-01",
  "password": "password123"
}
```

**_Resposta:_**

```json
{
  "id": "uuid-do-usuario",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "birthdate": "1990-01-01",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### `POST /users/login`

Realiza o login de um usuário, retornando um token de autenticação.

**Exemplo de corpo da requisição:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**_Resposta:_**

```json
{
  "token": "jwt-token-gerado",
  "user": {
    "id": "uuid-do-usuario",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

## Como testar as rotas da API

Para testar as rotas da API, você pode importar a coleção do Postman usando o arquivo exportado ou acessar a versão online da coleção.

- **Importar a Coleção**: Baixe o arquivo JSON da coleção e importe no Postman. [Clique aqui para baixar o arquivo](https://drive.google.com/drive/folders/19vx5dekM3bzgK-_wNJmltGcGyzh0HfHg?usp=sharing).

**Passos para Importar no Postman:**

1. Abra o Postman.
2. No menu lateral, clique em **Import**.
3. Escolha o arquivo exportado ou cole o link da coleção.
4. Clique em **Importar** para carregar as rotas.

Agora você pode executar as requisições diretamente no Postman.

## Como Rodar o Projeto

### 1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. **Instale as dependências:**

```bash
yarn install
```

### 3. **Crie o arquivo .env:**

```bash
DATABASE_URL="mysql://[usuário]:[senha]@[host]:[porta]/[banco]"
JWT_SECRET_KEY="sua_chave_secreta"
```

### 4. **Configuração do Banco de Dados:**

Se esta for a primeira vez que você está rodando o projeto, será necessário inicializar o banco de dados. O Prisma irá configurar o banco para você, criando as tabelas e realizando as migrações.

Execute o seguinte comando para gerar e aplicar as migrações:

```bash
npx prisma migrate dev

```

### 5. **Execute a aplicação:**

```bash
yarn dev
```

**_A API estará disponível em_** http://localhost:3000

#### Observação:

Você pode iniciar o Prisma Studio, que oferece uma interface gráfica para interagir com o banco de dados.

Para abrir o Prisma Studio, execute o seguinte comando:

```bash
npx prisma studio
```

## Dependências

#### `express:`

Framework web para Node.js.

#### `prisma:`

ORM para interagir com o banco de dados.

#### `axios:`

Cliente HTTP para realizar requisições externas.

#### `uuid:`

Gerador de IDs únicos.

#### `MySQL:`

Banco de dados relacional utilizado para armazenar informações.

#### `Typescript:`

Linguagem de programação baseada em JavaScript, que adiciona tipagem estática.

#### `Node.js:`

Ambiente de execução para JavaScript no servidor.

## Contribuição

Sinta-se à vontade para abrir problemas ou fazer pull requests para contribuir com o projeto.

## Licença

Este `README.md` fornece todas as informações sobre a API, com exemplos de como interagir com os endpoints, configurar o ambiente de desenvolvimento e entender a estrutura do projeto.
