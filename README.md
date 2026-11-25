# 🍕 Pizzaria API

API REST para gerenciar o cardápio de uma pizzaria: pizzas, ingredientes, tamanhos e preços. Ela alimenta o frontend do [Cardápio Online](https://github.com/flavianaal/Cardapio_Online), onde os clientes consultam as opções e fazem pedidos pelo WhatsApp.

## 🚀 Acesse o projeto

🌐 **Aplicação online (frontend):** https://cardapio-online-eta-beige.vercel.app/

🔗 **API:** https://pizzaria-api.duckdns.org/pizzas

## ✨ Funcionalidades

- Listagem de pizzas com ingredientes, tamanhos e preços.
- Cadastro, atualização e remoção de pizzas e ingredientes.
- Upload de imagens de pizzas e ingredientes (enviadas em base64 e salvas no servidor).
- Autenticação com JWT: consultas são públicas, e alterações exigem um usuário administrador.
- CORS configurado para o frontend.

## 🛠️ Tecnologias utilizadas

- **Java** — linguagem de programação.
- **Quarkus** — framework para a API REST.
- **PostgreSQL** — banco de dados relacional.
- **Hibernate ORM com Panache** — persistência e acesso aos dados.
- **SmallRye JWT** — autenticação com token JWT (RS256).
- **Maven** — gerenciamento de dependências e build.
- **Postman** — testes dos endpoints.

## 🏗️ Arquitetura

A aplicação segue uma estrutura em camadas:

- **Resources:** recebem as requisições HTTP e devolvem as respostas.
- **DTOs:** definem os dados recebidos nas requisições (`PizzaDTO`, `ItemPizzaDTO`, `IngredienteDTO`).
- **Entidades:** `Pizza`, `Ingrediente` e `ItemPizza` (tamanho e valor), mapeadas para o banco.
- **Repositórios:** acesso ao banco de dados com Panache.
- **Utilitário de imagens:** converte a imagem em base64 e grava o arquivo no servidor.

## 🔗 Endpoints

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/pizzas` | Público | Lista as pizzas |
| POST | `/pizzas` | Admin | Cadastra uma pizza |
| PUT | `/pizzas/{id}` | Admin | Atualiza uma pizza |
| DELETE | `/pizzas/{id}` | Admin | Remove uma pizza |
| GET | `/ingredientes` | Público | Lista os ingredientes |
| POST | `/ingredientes` | Admin | Cadastra um ingrediente |
| PUT | `/ingredientes/{id}` | Admin | Atualiza um ingrediente |
| DELETE | `/ingredientes/{id}` | Admin | Remove um ingrediente |

As imagens enviadas ficam disponíveis em `/uploads/pizzas/{arquivo}`.

## 💻 Como executar localmente

### Pré-requisitos

- JDK (versão definida no `pom.xml`)
- Maven (ou o `mvnw` do projeto)
- PostgreSQL
- Git

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/flavianaal/Pizzaria.git
cd Pizzaria
```

2. Crie o banco de dados no PostgreSQL:

```sql
CREATE DATABASE "Pizzaria";
```

3. Ajuste o `src/main/resources/application.properties` com os dados do seu banco:

```properties
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/Pizzaria
quarkus.datasource.username=SEU_USUARIO
quarkus.datasource.password=SUA_SENHA
```

4. Inicie a aplicação em modo de desenvolvimento:

```bash
./mvnw quarkus:dev
```

5. Acesse no navegador ou no Postman:

```
http://localhost:8080/pizzas
```

## ☁️ Deploy

A API roda em um servidor Ubuntu no **AWS Lightsail**, com o banco PostgreSQL no próprio servidor. O **Nginx** funciona como proxy reverso, o **Certbot (Let's Encrypt)** fornece o certificado HTTPS, e o domínio gratuito é gerenciado pelo **DuckDNS**.

## 📚 Aprendizados

- Desenvolvimento de API REST com Java e Quarkus.
- Persistência de dados com PostgreSQL e Panache.
- Autenticação e autorização com JWT.
- Upload e armazenamento de imagens.
- Deploy em servidor Linux na nuvem.
- Configuração de domínio, Nginx e HTTPS.

## 👩‍💻 Desenvolvido por

**Flaviana Andrade**
Tecnóloga em Telemática | Desenvolvedora em formação.

- GitHub: [@flavianaal](https://github.com/flavianaal)
- LinkedIn: [Flaviana Andrade](https://www.linkedin.com/in/flaviana-andrade/)

⭐ Se este projeto despertou seu interesse, fique à vontade para explorar o repositório!
