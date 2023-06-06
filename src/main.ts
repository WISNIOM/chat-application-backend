import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import entities, { Session, appDataSource } from './utils/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const sessionRepository = appDataSource.getRepository(Session);

  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 60 * 1000 * 24, // cookie expires in one day
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
    passport.initialize(),
    passport.session(),
  );
  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
