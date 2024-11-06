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

  let userId: string;

  it('/ (GET)', () => {
    return server().get('/').expect(200).expect('Hello World!');
  });

  describe('Users CRUD', () => {
    it('GET /users', () => {
      return server().get('/users').expect(200).expect([]);
    });

    it('POST /users', () => {
      return server().post('/users').send({ name: 'User 1' }).expect(201);
    });

    it('GET /users with created use', async function () {
      const response = await server().get('/users');

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(1);
      userId = response.body[0].id;
    });
  });

  describe('Tasks CRUD', () => {
    it('GET /tasks', () => {
      return server().get('/tasks').expect(200).expect([]);
    });

    it('POST /tasks', () => {
      return server().post('/tasks').send({ label: 'Task 1' }).expect(201);
    });

    describe('Created task', () => {
      let taskId: string;

      it('GET /tasks with created task', async function () {
        const response = await server().get('/tasks');

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(1);
        taskId = response.body[0].id;
      });

      it('GET /tasks/:id', async function () {
        const response = await server().get(`/tasks/${taskId}`);

        expect(response.status).toEqual(200);
        expect(response.body.label).toEqual('Task 1');
      });

      // it('DELETE /tasks/:id', async function () {
      //   await server().delete(`/tasks/${taskId}`).expect(200);
      // });
      //
      // it('GET /tasks return now empty', () => {
      //   return server().get('/tasks').expect(200).expect([]);
      // });
    });
  });

  describe('Tasks with user', () => {
    it('POST /tasks/users:id', () => {
      return server()
        .post(`/tasks/users/${userId}`)
        .send({ label: 'Task 2' })
        .expect(201);
    });

    it('GET /tasks now return 2 tasks', async function () {
      const response = await server().get('/tasks');

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(2);
    });

    it('GET /tasks/users:id return 1 task', async function () {
      const response = await server().get(`/tasks/users/${userId}`);

      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(1);
    });

    it('POST /tasks/users:id with unknown user', () => {
      return server()
        .post(`/tasks/users/9999`)
        .send({ label: 'Task 3' })
        .expect(400);
    });

    it('GET /tasks/users:id with unknown user', async function () {
      const response = await server().get(`/tasks/users/9999`);

      expect(response.status).toEqual(400);
    });
  });
});
