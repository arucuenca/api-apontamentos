import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiSpies from 'chai-spies';
import { json, urlencoded } from 'express';
import App from '../../src/app/App';
import ApontamentoController from './ApontamentoController.mock';
import ApontamentoData from './ApontamentoData.mock';

chai.use(chaiHttp);
chai.use(chaiSpies);

let app: App;
const apontamentoController = new ApontamentoController();

describe(`Apontamentos`, async () => {
  before(async () => {
    app = new App({
      controllers: [apontamentoController],
      port: 3000,
      resolvers: [json(), urlencoded({ extended: true })],
    });
    await app.listen();
  });

  after(async () => {
    await app.close();
  });

  describe(`GET /apontamentos`, () => {
    it(`Should return all 'Apontamento' records`, () => {
      chai
        .request(app.runningServer)
        .get(`/apontamento`)
        .then((res) => {
          chai.expect(res.body).to.equal(ApontamentoData);
        });
    });

    it(`Should call 'getAll()' function once`, () => {
      const spyGetAll = chai.spy.on(apontamentoController, `getAll`);
      chai
        .request(app.runningServer)
        .get(`/apontamento`)
        .then((res) => {
          chai.expect(spyGetAll).to.have.been.called.exactly(1);
        });
    });
  });

  describe(`GET /apontamentos by user`, () => {
    it(`Should return all 'Apontamento' records where apontamento.user = test`, () => {
      chai
        .request(app.runningServer)
        .get(`/apontamento`)
        .query({ user: `test` })
        .then((res) => {
          chai
            .expect(res.body)
            .to.equal(
              ApontamentoData.filter(
                (apontamento) => apontamento.user === 'test'
              )
            );
        });
    });

    it(`Should return no 'Apontamento' records`, () => {
      chai
        .request(app.runningServer)
        .get(`/apontamento`)
        .query({ user: `not_a_test` })
        .then((res) => {
          chai
            .expect(res.body)
            .to.equal(
              ApontamentoData.filter(
                (apontamento) => apontamento.user === 'not_a_test'
              )
            );
        });
    });

    it(`Should call 'getByUser()' function once`, () => {
      const spyGetAll = chai.spy.on(apontamentoController, `getByUser`);
      chai
        .request(app.runningServer)
        .get(`/apontamento`)
        .query({ user: `test` })
        .then((res) => {
          chai.expect(spyGetAll).to.have.been.called.exactly(1);
        });
    });
  });

  describe(`POST /apontamentos`, () => {
    const postData = {
      date: new Date(),
      startTime: `15h`,
      endTime: `16h`,
      user: `test`,
    };

    it(`Should return the inserted 'Apontamento' record`, () => {
      chai
        .request(app.runningServer)
        .post(`/apontamento`)
        .send(postData)
        .then((res) => {
          chai.expect(res.body).to.equal({ ...postData, id: 1 });
        });
    });

    it(`Should return status 400 when sending an 'Apontamento' record with id already defined`, () => {
      chai
        .request(app.runningServer)
        .post(`/apontamento`)
        .send({ ...postData, id: 1 })
        .then((res) => {
          chai.expect(res.status).to.equal(400);
        });
    });

    it(`Should call 'save()' function once`, () => {
      const spyGetAll = chai.spy.on(apontamentoController, `save`);
      chai
        .request(app.runningServer)
        .post(`/apontamento`)
        .send(postData)
        .then((res) => {
          chai.expect(spyGetAll).to.have.been.called.exactly(1);
        });
    });
  });

  describe(`PUT /apontamentos`, () => {
    const putData = {
      id: 1,
      date: new Date(),
      startTime: `15h`,
      endTime: `16h`,
      user: `test`,
    };

    it(`Should return the number of affected 'Apontamento' records`, () => {
      chai
        .request(app.runningServer)
        .put(`/apontamento`)
        .send(putData)
        .then((res) => {
          chai.expect(res.body).to.equal({ raw: '', affectedRows: 1 });
        });
    });

    it(`Should return status 400 when sending an 'Apontamento' record with id <= 0`, () => {
      chai
        .request(app.runningServer)
        .put(`/apontamento`)
        .send({ ...putData, id: 0 })
        .then((res) => {
          chai.expect(res.status).to.equal(400);
        });
    });

    it(`Should call 'update()' function once`, () => {
      const spyGetAll = chai.spy.on(apontamentoController, `update`);
      chai
        .request(app.runningServer)
        .put(`/apontamento`)
        .send(putData)
        .then((res) => {
          chai.expect(spyGetAll).to.have.been.called.exactly(1);
        });
    });
  });

  describe(`DELETE /apontamentos`, () => {
    it(`Should return the number of affected 'Apontamento' records`, () => {
      chai
        .request(app.runningServer)
        .delete(`/apontamento`)
        .query({ id: 1 })
        .then((res) => {
          chai.expect(res.body).to.equal({ raw: '', affectedRows: 1 });
        });
    });

    it(`Should return status 400 when sending an 'Apontamento' record with id <= 0`, () => {
      chai
        .request(app.runningServer)
        .delete(`/apontamento`)
        .query({ id: 0 })
        .then((res) => {
          chai.expect(res.status).to.equal(400);
        });
    });

    it(`Should call 'delete()' function once`, () => {
      const spyGetAll = chai.spy.on(apontamentoController, `delete`);
      chai
        .request(app.runningServer)
        .delete(`/apontamento`)
        .query({ id: 1 })
        .then((res) => {
          chai.expect(spyGetAll).to.have.been.called.exactly(1);
        });
    });
  });
});
