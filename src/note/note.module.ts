import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports:[KafkaModule],
  controllers: [NoteController],
  providers: [NoteService, PrismaService],
})
export class NoteModule {}