import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'playground_queue',
      queueOptions: { durable: true },
      prefetchCount: 5,
      noAck: false, // manual ack
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
