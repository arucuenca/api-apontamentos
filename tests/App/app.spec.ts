import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiSpies from 'chai-spies';
import { json, urlencoded } from 'express';
import App from '../../src/app/App';

chai.use(chaiHttp);
chai.use(chaiSpies);

let app: App;

describe(`App`, async () => {
  before(async () => {
    app = new App({
      controllers: [],
      port: 3000,
      resolvers: [json(), urlencoded({ extended: true })],
    });
    await app.listen();
  });

  after(async () => {
    await app.close();
  });

  describe(`GET /`, () => {
    it(`Should return 'Ok'`, () => {
      chai
        .request(app.runningServer)
        .get(`/`)
        .then((res) => {
          chai.expect(res.status).to.equal(200);
        });
    });
  });
});
