import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import AppParams from './AppParams.type';

export default class App {
  private server: Application;
  private config: AppParams;

  constructor(appInit: AppParams) {
    this.server = express();
    this.config = appInit;
  }

  public listen = async () => {
    await createConnection();

    this.config.resolvers.forEach((resolver) => {
      this.server.use(resolver);
    });
    this.config.controllers.forEach((controller) => {
      this.server.use(`/`, controller.router);
    });
    this.server.listen(this.config.port, () => {
      console.info(`Servidor rodando na porta ${this.config.port}`);
    });
  };
}
