import { NestFactory } from '@nestjs/core';
import { GradeModule } from './grade.module';

async function bootstrap() {
  const app = await NestFactory.create(GradeModule);
  await app.listen(3000);
}
bootstrap();
