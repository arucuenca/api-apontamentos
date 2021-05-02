import { Request, Response, Router } from 'express';
import { Console } from 'node:console';
import { getRepository, Repository } from 'typeorm';
import Apontamento from './Apontamento.entity';

export default class ApontamentoController {
  public router: Router = Router();
  public path: string = `/apontamento`;

  constructor() {
    this.router.get(this.path, this.handleGet);
    this.router.post(this.path, this.save);
    this.router.patch(this.path, this.update);
    this.router.delete(this.path, this.delete);
  }

  private getRepository = (): Repository<Apontamento> => {
    return getRepository(Apontamento);
  };

  private handleGet = (req: Request, res: Response) => {
    return req.query.user ? this.getByUser(req, res) : this.getAll(req, res);
  };

  private getByUser = async (req: Request, res: Response) => {
    await this.getRepository()
      .find({ where: { user: req.query.user } })
      .then((apontamento) => {
        res.json(apontamento);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  private getAll = async (req: Request, res: Response) => {
    await this.getRepository()
      .find()
      .then((apontamentos) => {
        res.json(apontamentos);
      })
      .catch((error) => {
        res.json(error);
      });
  };

  private save = async (req: Request, res: Response) => {
    const apontamento = req.body as Apontamento;

    if (apontamento && !apontamento.id) {
      await this.getRepository()
        .save(apontamento)
        .then((insertedApontamento) => {
          res.json(insertedApontamento).status(201);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.sendStatus(400);
    }
  };

  private update = async (req: Request, res: Response) => {
    const apontamento = req.body as Apontamento;

    if (apontamento && apontamento.id > 0) {
      await this.getRepository()
        .update(
          {
            id: apontamento.id,
          },
          {
            ...apontamento,
          }
        )
        .then((updateResult) => {
          res.json(updateResult).status(204);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.sendStatus(400);
    }
  };

  private delete = async (req: Request, res: Response) => {
    const id = Number(req.query.id);

    if (id && id > 0) {
      await this.getRepository()
        .delete({ id: id })
        .then((deleteResult) => {
          res.json(deleteResult).status(204);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.sendStatus(400);
    }
  };
}
