import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationSchedulerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Cron('*/1 * * * *')
  async handleCron() {
    const now = new Date();

    const notes = await this.prisma.note.findMany({
      where: {
        notificationTime: {
          not: null,
        },
      },
    });

    for (const note of notes) {
        const notificationDate = new Date(+(note.notificationTime as string));
      if (notificationDate <= now) {
        await this.kafkaService.sendNotification(JSON.stringify(note));
        await this.prisma.note.update({
          where: { id: note.id },
          data: { notificationTime: null },
        });
      }
    }
  }
}
