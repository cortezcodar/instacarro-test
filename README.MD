## Leilão de Carro, Instacarro

A plataforma "Leilão de Carros" é um aplicativo que permite que os usuários participem de leilões de carros cadastrados na plataforma. Abaixo estão os principais aspectos do cenário do Leilão:

### Cadastro de Carros

- Os carros são cadastrados na plataforma, e as informações detalhadas sobre cada carro são armazenadas, incluindo modelo, ano, versão, marca, imagens, quilometragem, preço inicial, cor, fabricante, placa e quilometragem percorrida.

### Leilões de Carros

- Os carros cadastrados são disponibilizados em leilões, onde os usuários podem fazer lances competitivos para adquirir o veículo.

- Cada leilão tem um status que pode ser "Aguardando", "Aceitando Lances", "Em Processamento", "Vendido" ou "Cancelado".

### Autenticação de Usuários

- Os usuários devem se autenticar na plataforma para participar de leilões ou cadastrar novos carros.

### Regras de Lances

- Os lances devem obedecer a regras específicas, como valores mínimos de lance ou incrementos mínimos, para garantir um processo de leilão justo.

### Encerramento de Leilões

- Quando um leilão é encerrado, o vencedor é determinado, e o carro é atribuído ao usuário vencedor.

- O encerramento de um leilão pode ocorrer quando o tempo limite é atingido ou quando um administrador cancela o leilão.

Este Leilao serve como base para o funcionamento do aplicativo "Leilão de Carros".

## Setup

Este guia descreve os passos necessários para configurar o ambiente de desenvolvimento e iniciar o projeto "Leilão de Carros".

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- **Node.js**: [Baixe e instale o Node.js](https://nodejs.org/), que inclui o npm (gerenciador de pacotes do Node.js).

- **Docker (opcional)**: Se você pretende usar contêineres Docker para serviços, [instale o Docker](https://docs.docker.com/get-docker/).

### Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto:

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/cortezcodar/instacarro-test.git
cd leilao-de-carros
```

```json
npm install
```

1. **Criar o arquivo** .env copia todos os dados que estar na .env.example e configure com suas credenciais

2. .env.example

   **MONGODB_NAME**
   **MONGODB_PASSWORD**
   **JWT_SECRET**
   **SESSION_SECRET**
   **ACCESS_TOKEN_SECRET**

   3.**Execute** a aplicação usando o comando ``yarn start` no terminal (ou npm run start)
   Obs.: para gerar chaves precisa rodar o simples comando no terminal `

   ```json
   openssl rand -base64 32`
   ```

```
  4. Levantar o banco de dados `docker compose up -d`
```

## Tecnologias Principais

- **Node.js**: Plataforma de execução de código JavaScript no servidor.

- **Nest.js**: Framework Node.js para construir aplicativos escaláveis e eficientes.

- **MongoDB**: Banco de dados NoSQL usado para armazenar dados de forma flexível e escalável.

- **Jest**: Framework de teste JavaScript amplamente utilizado para testes automatizados.

## Dependências Principais

- **@nestjs/common**: Módulo principal do Nest.js para construção de aplicativos.

- **mongoose**: Biblioteca Node.js para modelagem de objetos MongoDB.

- **jest**: Framework de teste para JavaScript.

- **typescript**: Linguagem que adiciona tipagem estática ao JavaScript.

## Ferramentas de Desenvolvimento

- **eslint**: Ferramenta de análise estática de código JavaScript.

- **prettier**: Ferramenta de formatação de código JavaScript.

- **ts-jest**: Extensão do Jest para suportar TypeScript.

## Cadastro de Carros

- **Endpoint:** `/api/carros/cadastrar`
- **Método:** POST

**Descrição:**
Este endpoint permite o cadastro de novos carros no sistema de leilão.

**Parâmetros de Requisição:**
| Parâmetro | Tipo | Descrição |
| --------------- | -------- | --------------------------------------------- |
| **model** | String | O modelo do carro. |
| **year** | Number | O ano de fabricação do carro. |
| **version** | String | A versão do carro. |
| **brand** | String | A marca do carro. |
| **image** | Array | Um array de URLs das imagens do carro. |
| **km** | Number | A quilometragem do carro. |
| **price** | String | O preço inicial do leilão no formato string. |
| **color** | String | A cor do carro. |
| **manufacture** | String | O fabricante do carro. |
| **plate** | String | A placa do carro. |
| **mileage** | String | A quilometragem percorrida do carro. |

**Exemplo de Requisição:**

```json
POST /api/carros/cadastrar
{
  "model": "Corolla",
  "year": 2020,
  "version": "XLE",
  "brand": "Toyota",
  "image": ["https://example.com/car1.jpg", "https://example.com/car2.jpg"],
  "km": 30000,
  "price": "25000.00",
  "color": "Silver",
  "manufacture": "Toyota Corporation",
  "plate": "ABC-1234",
  "mileage": "30000 miles
  }
```

**Resposta de Sucesso:**

```json
{
  "mensagem": "Carro cadastrado com sucesso.",
  "id_carro": 12345
}
```

**Resposta de Erro:**

```json
{
  "erro": "Ocorreu um erro ao cadastrar o carro. Verifique os parâmetros da requisição."
}
```

**Notas:**

Certifique-se de que os campos obrigatórios, como **model**, **year**, **version**, **brand**, **image**, **km**, **price**, **color**, **manufacture**, **plate**, e **mileage**, sejam fornecidos na requisição. O id_carro retornado na resposta de sucesso é o identificador único do carro cadastrado e pode ser usado para outras operações, como listar lances para este carro.

## Criação de Leilão (CreateAuctionDto)

**Descrição:**
Este DTO (Objeto de Transferência de Dados) é usado para criar um novo leilão no sistema.

**Campos:**

- `Car` (Opcional): Uma string que representa o ID do carro associado ao leilão.

- `status` (Opcional): Um enum que representa o status do leilão. Os valores possíveis são os seguintes:
- `AWAITING`: Aguardando início do leilão.

- `ACCEPTING_BID`: Aceitando lances dos usuários.

- `PROCESSING`: Processando o leilão.

- `SOLD`: O carro foi vendido no leilão.

- `CANCELLED`: O leilão foi cancelado.

**Exemplo de Requisição:**

```json
{
  "Car": "123456789",
  "status": "ACCEPTING_BID"
}
```

## SignInDto (DTO de Login)

**Descrição:**
Este DTO (Objeto de Transferência de Dados) é usado para realizar a autenticação de um usuário.

**Campos:**

- `email`: O email do usuário para fins de autenticação.

- `password`: A senha do usuário para fins de autenticação.

**Exemplo de Requisição:**

```json
{
  "email": "exemplo@dominio.com",
  "password": "senhaSecreta"
}
```

## SignUpDto (DTO de Registro)

**Descrição:**
Este DTO é usado para registrar um novo usuário na plataforma.

**Campos:**

- `name`: O nome do novo usuário.

- `email`: O email do novo usuário.

- `password`: A senha escolhida pelo novo usuário.

**Exemplo de Requisição:**

```json
{
  "name": "Nome do Novo Usuário",
  "email": "novousuario@dominio.com",
  "password": "senhaSecreta"
}
```

**Notas:**

O DTO SignUpDto é usado para criar um novo usuário na plataforma.

Certifique-se de fornecer os dados necessários de acordo com os requisitos de registro do seu sistema.

Você pode usar esse DTO como modelo para criar endpoints de registro em sua API.

## CreateBidDto (DTO de Criação de Lance)

**Descrição:**
Este DTO (Objeto de Transferência de Dados) é usado para criar um novo lance em um leilão.

**Campos:**

- `auction` (Opcional): Uma string que representa o ID do leilão ao qual o lance está sendo feito.

- `amount` (Opcional): Um número que representa o valor do lance. O número pode conter até 4 casas decimais.

**Exemplo de Requisição:**

```json
{
  "auction": "123456789",
  "amount": 100.25
}
```

**Notas:**

O campo auction é opcional, o que significa que você pode criar um lance sem associá-lo a um leilão específico.

O campo amount é opcional e pode conter até 4 casas decimais para representar o valor do lance.

Certifique-se de fornecer os dados necessários de acordo com os requisitos do seu sistema ao criar um novo lance.


### Obrigado por visitar meu repositório!
