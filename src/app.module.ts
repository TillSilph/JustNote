import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NoteService } from './note/note.service';
import { NoteController } from './note/note.controller';
import { NoteModule } from './note/note.module';
import { KafkaController } from './kafka/kafka.controller';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';


@Module({
  imports: [ NoteModule, KafkaModule],
  controllers: [NoteController, KafkaController],
  providers: [PrismaService, NoteService, KafkaService, ],
})
export class AppModule {}
