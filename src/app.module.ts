import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NoteService } from './note/note.service';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';
import { KafkaController } from './kafka/kafka.controller';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';
import { NotificationSchedulerService } from './ScheduleModule/notification-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), NoteModule, KafkaModule],
  controllers: [NoteController, KafkaController],
  providers: [PrismaService, NoteService, KafkaService, NotificationSchedulerService],
})
export class AppModule {}
