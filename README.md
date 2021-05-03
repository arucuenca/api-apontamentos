# Api de Apontamentos

Api CRUD para Apontamentos usando Express, PostgreSQL, TypeScript, TypeORM e testes com Mocha/Chai.

### Configurações
A configuração é feita através de um arquivo ```.env``` inserido na raiz do projeto, conforme o [exemplo](./.env.example).
Os campos que devem ser modificados estão comentados. Altere-os e retire o ```#``` do início da linha para torná-los válidos.

### Scripts
```bash
yarn start
```

### Rotas
#### HealthCheck
```
GET <host>:<porta>/
```
Retorna Ok se o app estiver rodando.
___

#### GetAll
```
GET <host>:<porta>/apontamento
```
Retorna a lista de [Apontamentos](./src/apontamento/Apontamento.entity.ts) cadastrados
___

#### GetByUser
```
GET <host>:<porta>/apontamento/?user=<valor>
```
Retorna a lista de [Apontamentos](./src/apontamento/Apontamento.entity.ts) cadastrados filtrada por usuário
___

#### Save
```
POST <host>:<porta>/apontamento
```
Insere um novo [Apontamento](./src/apontamento/Apontamento.entity.ts) no banco e o retorna.
O formato do conteúdo do corpo da requisição é:
```javascript
{
  date: Date,
  startTime: string,
  endTime: string,
  user: string
}
```
E o objeto de retorno é:
```javascript
{
  id: number,
  date: Date,
  startTime: string,
  endTime: string,
  user: string
}
```
___

#### Update
```
PATCH <host>:<porta>/apontamento
```
Altera um [Apontamento](./src/apontamento/Apontamento.entity.ts) do banco com o id informado.
O formato do conteúdo do corpo da requisição é:
```javascript
{
  id: number,
  date: Date,
  startTime: string,
  endTime: string,
  user: string
}
```
E o objeto de retorno é:
```javascript
{
  raw: [],
  affected: number,
  generatedMaps: []
}
```
___

#### Delete
```
DELETE <host>:<porta>/apontamento/?id=<valor>
```
Deleta um [Apontamento](./src/apontamento/Apontamento.entity.ts) do banco com o id informado.
O objeto de retorno é:
```javascript
{
  raw: [],
  affected: number
}
```
___
