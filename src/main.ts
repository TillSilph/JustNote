import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true); // Разрешает все источники динамически
    },
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5090);
}
bootstrap();
