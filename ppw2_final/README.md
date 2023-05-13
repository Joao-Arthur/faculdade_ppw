# Projeto Final PPW2

## Sobre o projeto

Trabalho final da disciplina de programação para web 2 do curso de ciências da computação em 2021, desenvolvido em _Node JS_, _TS_ e _MongoDB_, utilizando a plataforma _Heroku_ para hospedagem em nuvem.

Link do projeto no Heroku: ~~https://projeto-final-ppw2.herokuapp.com~~

Nenhuma nova alteração será feita no projeto. Ele serve apenas como **fonte de consulta** e como **arquivo pessoal**.

A API utiliza autenticação com token JWT para acessar os principais recursos.

O token deve ser passado no cabeçalho das requisições como um `Bearer Token`.

## API

## `/healthcheck` No Authorization

### GET `/healthcheck`

Retorno: status code 200.

</br></br>

## `/user` Authorization Bearer Token

### POST `/user`

Salva um novo usuário da API.

Retorno: Token para acessar os recursos `band` e `album`.

Corpo da requisição:

```typescript
{
    name: string,
    username: string,
    password: string,
}
```

### POST `/user/login`

Realiza o login de um usuário já cadastrado.

Retorno: Token para acessar os recursos `band` e `album`.

Corpo da requisição:

```typescript
{
    username: string,
    password: string,
}
```

</br></br>

## `/band` Authorization Bearer Token

### GET `/band`

Retorno: Lista das bandas cadastradas.

#### queryparams

-   `name?: string` nome da banda;
-   `foundation?: number` ano de fundação da banda;
-   `dissolution?: number` ano de dissolução da banda;

### GET `/band/:id`

Retorno: A banda com o id informado.

### POST `/band`

Salva uma nova banda.

Retorno: Objeto da banda criada.

Corpo da requisição:

```typescript
{
    name: string,
    members: string[],
    foundation: number,
    dissolution: number,
}
```

### PUT `/band`

Atualiza uma banda a partir do id informado.

Retorno: Objeto da banda atualizada.

Corpo da requisição:

```typescript
{
    _id: string,
    name?: string,
    members?: string[],
    foundation?: number,
    dissolution?: number,
    albums?: string[],
}
```

### DELETE `/band/:id`

Deleta uma banda a partir do id informado.

Retorno: Objeto da banda deletada.

</br></br>

## `/album` Authorization Bearer Token

### GET `/album`

Retorno: Lista dos álbuns cadastrados.

#### queryparams

-   `title?: string` nome do álbum;
-   `band?: string` nome da banda;

### GET `/album/:id`

Retorno: O álbum com o id informado.

### POST `/album`

Salva um novo álbum.
Retorno: Objeto do álbum criado.

Corpo da requisição:

```typescript
{
    title: string,
    band: string,
    release: Date,
}
```

### PUT `/album`

Atualiza um álbum a partir do id informado.

Retorno: Objeto da álbum atualizado.

Corpo da requisição:

```typescript
{
    _id: string,
    title?: string,
    band?: string,
    release?: Date,
}
```

### DELETE `/album/:id`

Deleta um álbum a partir do id informado.

Retorno: Objeto do álbum deletado.

</br></br>

### GET `/`

Retorno: Listagem das rotas disponíveis além de informações da API e do autor.
