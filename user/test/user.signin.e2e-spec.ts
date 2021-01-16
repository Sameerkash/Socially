import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { UserModule } from './../src/user.module';

export const userSignupRequestSuccess = {
  email: 'test@gmail.com',
  password: 'test111',
};

export const userLoginRequestFailWrongPw = {
  ...userSignupRequestSuccess,
  password: new Date(),
};

export const userLoginRequestFailWrongEmail = {
  ...userSignupRequestSuccess,
  email: 'failed' + userSignupRequestSuccess.email,
};

describe('Users Sign In (e2e)', () => {
  let app;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DSN, { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/ (POST) - should create a valid user', done => {
    return request(app.getHttpServer())
      .post('/users/')
      .send(userSignupRequestSuccess)
      .expect(201)
      .end(done);
  });

  it('/users/login (POST) - should not create a token for invalid email', done => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send(userLoginRequestFailWrongEmail)
      .expect(401)
      .expect({
        message: 'user_search_by_credentials_not_found',
        data: null,
        errors: null,
      })
      .end(done);
  });

  it('/users/login (POST) - should not create a token for invalid password', done => {
    return request(app.getHttpServer())
      .post('/users/login')
      .send(userLoginRequestFailWrongPw)
      .expect(401)
      .expect({
        message: 'user_search_by_credentials_not_match',
        data: null,
        errors: null,
      })
      .end(done);
  });
});
