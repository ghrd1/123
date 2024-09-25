import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from '../cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`App running on: ${await app.getUrl()}`);
}

AppClusterService.clusterize(bootstrap);
