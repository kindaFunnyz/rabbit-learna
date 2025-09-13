import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WriterService } from './writer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly writerService: WriterService,
  ) {}

  @Get()
  sayHello() {
    return this.writerService.sayHello();
  }
}
