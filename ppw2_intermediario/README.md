# Projeto PPW2

Web API de Scraping (raspagem de dados).

## Sobre o projeto

Trabalho intermediário da disciplina de programação para web 2 do curso de ciências da computação em 2021, desenvolvido em _Node JS_ e _TS_, utilizando a plataforma _Heroku_ para hospedagem em nuvem.

Link do projeto no Heroku: ~~https://projeto-ppw.herokuapp.com~~

Nenhuma nova alteração será feita no projeto. Ele serve apenas como **fonte de consulta** e como **arquivo pessoal**.

## Documentação da API

### /healthcheck

##### info

retorna o status code 200.

### /cursos

##### info

array com informações sobre os cursos de graduação disponíveis na UNESC.

##### queryparams

-   curso - nome do curso de graduação;

### /rankingbandasderock

##### info

array com informações das 100 bandas de rock mais famosas de todos os tempos.

##### queryparams

-   ranking - posição da banda no ranking;
-   cidade - cidade de origem da banda;
-   regiao - estado ou país de origem da banda;
-   ano - ano em que a banda foi fundada;

### Demais rotas

retorna um objeto das rotas disponíveis, e de informações da API e do autor.
