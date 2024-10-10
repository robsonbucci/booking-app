# Hotel Booking

## Descrição do Projeto

Este é um sistema de reserva de hotéis, que inclui funcionalidades de CRUD (Create, Read, Update e Delete) para gerenciar hotéis, clientes, quartos (rooms) e um sistema de autenticação seguro baseado em JWT (JSON Web Token). O projeto está sendo desenvolvido utilizando Node.js com TypeScript no backend, com o banco de dados MongoDB para armazenamento.

Além disso, este projeto foi desenvolvido com a abordagem de Test-Driven Development (TDD), aplicando testes automatizados desde o início, garantindo maior confiabilidade e qualidade no código. Também estou aplicando os princípios de SOLID e Clean Code para manter um código modular, escalável e de fácil manutenção.

## Funcionalidades

- **Cadastro de Hotéis (CRUD):**
  - Criar, visualizar, editar e excluir hotéis.
- **Cadastro de Usuários (Clientes) (CRUD):**
  - Registro de usuários (clientes) no sistema, com autenticação JWT.
- **Gerenciamento de Quartos (CRUD):**
  - Adicionar e gerenciar informações de quartos disponíveis nos hotéis.
- **Autenticação e Autorização:**
  - Implementação de login e registro de usuários com autenticação JWT.
  - Proteção de rotas sensíveis utilizando middleware de autenticação.

## Tecnologias Utilizadas

- **Node.js**: Utilizado para a construção do servidor e das rotas da aplicação.
- **TypeScript**: Para garantir maior segurança com tipagem estática e melhores ferramentas de desenvolvimento.
- **MongoDB**: Banco de dados NoSQL para armazenar informações de usuários, hotéis e quartos.
- **Jest**: Ferramenta de testes utilizada para implementar testes unitários e de integração.
- **TDD (Test-Driven Development)**: Abordagem de desenvolvimento orientada a testes, assegurando que o código seja funcional e testado desde o início.
- **Princípios SOLID**: Seguindo as boas práticas de design de software para garantir manutenibilidade, escalabilidade e separação de responsabilidades no código.

## Arquitetura do Projeto

O projeto segue uma arquitetura organizada por responsabilidades e componentes. Cada funcionalidade está separada em módulos, seguindo os princípios de Single Responsibility Principle (SRP) e Dependency Injection (DI), para tornar o sistema mais modular e testável.

### Estrutura de Pastas:

```
src/
│
├── controllers/        # Lógica de controle das requisições
├── models/             # Definição de modelos do MongoDB
├── routes/             # Definição das rotas da aplicação
├── services/           # Lógica de negócios separada em serviços
├── middleware/         # Middleware de autenticação e validações
├── tests/              # Testes unitários e de integração (Jest)
└── utils/              # Funções utilitárias e helpers
```

### Testes

Cada módulo do projeto é acompanhado por testes unitários e de integração, garantindo que as funcionalidades sejam validadas. O objetivo é garantir que o sistema se comporte conforme esperado antes de qualquer novo código ser adicionado.

Os testes cobrem:

- Funcionalidades de criação, leitura, atualização e exclusão (CRUD) para usuários, hotéis e quartos.
- Autenticação com JWT, protegendo rotas sensíveis.
- Validação de erros e respostas corretas da API.

Para executar os testes:

```
npm run test
```

## Como Rodar o Projeto

### Pré-requisitos

- Node.js versão 18+
- MongoDB instalado e rodando localmente ou em um serviço de cloud
- npm ou yarn para gerenciar dependências

### Instalação

1. Clone este repositório:

```
git clone https://github.com/robsonbucci/booking-app.git
cd booking-app
```

2. Instale as dependências do projeto:

```
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`. Um exemplo de configuração seria:

```
# .env
PORT=3000
MONGO_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=sua_chave_secreta_para_token_jwt
```

4. Inicie o servidor:

```
npm run dev
```

A API estará rodando em http://localhost:3000.

### Rotas Disponíveis

### Rotas Disponíveis

| Método | Endpoint                    | Descrição                                     | Autenticação |
|--------|-----------------------------|-----------------------------------------------|--------------|
| POST   | /auth/register               | Registro de um novo usuário                   | Não          |
| POST   | /auth/login                  | Login do usuário e geração de token JWT       | Não          |
| GET    | /hotels                      | Lista todos os hotéis                         | Não          |
| POST   | /hotels                      | Criação de um novo hotel                      | Sim          |
| GET    | /hotels/:id                  | Detalhes de um hotel específico               | Não          |
| PUT    | /hotels/:id                  | Atualização de um hotel                       | Sim          |
| DELETE | /hotels/:id                  | Remoção de um hotel                           | Sim          |
| GET    | /rooms                       | Lista todos os quartos                        | Não          |
| POST   | /rooms                       | Criação de um novo quarto                     | Sim          |
| PUT    | /rooms/:id                   | Atualização de um quarto                      | Sim          |
| DELETE | /rooms/:id                   | Remoção de um quarto                          | Sim          |



## Próximos Passos
- Implementar filtragem e pesquisa de hotéis com base na localização e preço.
- Melhorar a interface de autenticação, adicionando recuperação de senha e atualização de perfil.
- Desenvolver a interface de front-end utilizando React e integração com a API.
## Contribuições
Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request** se encontrar algum problema ou desejar sugerir melhorias!

