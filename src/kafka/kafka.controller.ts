import { Controller, Get, Query } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('send')
  async sendMessage(@Query('message') message: string) {
    await this.kafkaService.sendNotification(message);
    return { status: 'Message sent', message };
  }
}
