import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class WriterService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'], // важно: хост = имя сервиса docker
        queue: 'tasks_queue',
        queueOptions: { durable: true },
      },
    });
  }
  sayHello(): unknown {
    console.log('Hello');
    this.client.emit('message', 'Hello');
    return {
      data: new Date(),
    };
  }
}
