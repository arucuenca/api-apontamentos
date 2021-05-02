import { Request, Response, Router } from 'express';
import Apontamento from '../../src/apontamento/Apontamento.entity';
import ApontamentoData from './ApontamentoData.mock';

export default class ApontamentoController {
  public router: Router = Router();
  public path: string = `/apontamento`;
  private apontamentos = ApontamentoData;

  constructor() {
    this.router.get(this.path, this.handleGet);
    this.router.post(this.path, this.save);
    this.router.patch(this.path, this.update);
    this.router.delete(this.path, this.delete);
  }

  private handleGet = (req: Request, res: Response) => {
    return req.query.user ? this.getByUser(req, res) : this.getAll(req, res);
  };

  private getByUser = async (req: Request, res: Response) => {
    res.json(
      this.apontamentos.filter(
        (apontamento) => apontamento.user === req.query.user
      )
    );
  };

  private getAll = async (req: Request, res: Response) => {
    res.json(this.apontamentos);
  };

  private save = async (req: Request, res: Response) => {
    const apontamento = req.body as Apontamento;

    if (apontamento && !apontamento.id) {
      res.json({ ...apontamento, id: 1 }).status(201);
    } else {
      res.sendStatus(400);
    }
  };

  private update = async (req: Request, res: Response) => {
    const apontamento = req.body as Apontamento;

    if (apontamento && apontamento.id > 0) {
      const filteredResultsLength = this.apontamentos.filter(
        (apontamentoMock) => apontamentoMock.id === apontamento.id
      ).length;

      res.json({ raw: '', affectedRows: filteredResultsLength }).status(204);
    } else {
      res.sendStatus(400);
    }
  };

  private delete = async (req: Request, res: Response) => {
    const id = Number(req.query.id);

    if (id && id > 0) {
      const filteredResultsLength = this.apontamentos.filter(
        (apontamentoMock) => apontamentoMock.id === id
      ).length;

      res.json({ raw: '', affectedRows: filteredResultsLength }).status(204);
    } else {
      res.sendStatus(400);
    }
  };
}
