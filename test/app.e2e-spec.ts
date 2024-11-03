import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// Don't run test individually, run all or by describe
describe('AppController (e2e)', () => {
  let app: INestApplication;
  const server = () => request(app.getHttpServer());

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return server().get('/').expect(200).expect('Hello World!');
  });

  describe('Tasks CRUD', () => {
    it('GET /tasks', () => {
      return server().get('/tasks').expect(200).expect([]);
    });

    it('POST /tasks', () => {
      return server()
        .post('/tasks')
        .send({ title: 'Task 1', description: 'Description 1' })
        .expect(201);
    });

    describe('Created task', () => {
      let id: number;

      it('GET /tasks after post', async function () {
        const response = await server().get('/tasks');

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        id = response.body[0].id;
      });

      it('GET /tasks/:id', async function () {
        const response = await server().get(`/tasks/${id}`);

        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('Task 1');
        expect(response.body.description).toEqual('Description 1');
      });

      it('DELETE /tasks/:id', async function () {
        await server().delete(`/tasks/${id}`).expect(200);
      });

      it('GET /tasks return now empty', () => {
        return server().get('/tasks').expect(200).expect([]);
      });
    });
  });
});
