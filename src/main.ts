import { json, urlencoded } from 'express';
import ApontamentoController from './apontamento/Apontamento.controller';
import App from './app/App';

const app = new App({
  port: Number(process.env.PORT) || 3000,
  controllers: [new ApontamentoController()],
  resolvers: [json({}), urlencoded({ extended: true })],
});

app.listen();
