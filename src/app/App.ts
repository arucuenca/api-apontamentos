import express, { Application } from 'express';
import { Server } from 'node:http';
import { createConnection, getConnection } from 'typeorm';
import AppParams from './AppParams.type';

export default class App {
  private server: Application;
  public runningServer: Server;
  private config: AppParams;

  constructor(appInit: AppParams) {
    this.server = express();
    this.config = appInit;
  }

  public close = async () => {
    console.info(`Desligando app`);
    try {
      const connection = getConnection();
      if (connection && connection.isConnected) await connection.close();
    } catch {}
    this.runningServer.close();
  };

  public listen = async () => {
    await createConnection();

    this.config.resolvers.forEach((resolver) => {
      this.server.use(resolver);
    });
    this.config.controllers.forEach((controller) => {
      this.server.use(`/`, controller.router);
    });
    this.runningServer = this.server.listen(this.config.port, () => {
      console.info(`Servidor rodando na porta ${this.config.port}`);
    });
  };
}
