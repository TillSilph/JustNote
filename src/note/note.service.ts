import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { KafkaService } from "src/kafka/kafka.service";

@Injectable()
export class NoteService {
    constructor(
        private prisma: PrismaService,
        private readonly kafka: KafkaService
    ) {}

    // Получение всех записей
    async getAllNotes() {
        const allNotes = await this.prisma.note.findMany();
        return {
            completed: allNotes.filter((el) => el.completed),
            inWork: allNotes.filter((el) => !el.completed),
        };
    }

    // Получение одной заметки по ID
    async getNoteById(id: string) {
        return this.prisma.note.findUnique({ where: { id } });
    }

    // Создание новой заметки
    async createNote(data: Prisma.NoteCreateInput) {
        const note = await this.prisma.note.create({ data });
        if (data.notificationTime) {
            this.kafka.sendNotification(
                JSON.stringify({
                    id: note.id,
                    notificationTime: note.notificationTime,
                })
            );
        }
        return note;
    }

    // Редактирование заметки
    async updateNote(id: string, data: Prisma.NoteUpdateInput) {
        if (data.notificationTime) {
            this.kafka.sendNotification(
                JSON.stringify({ id, notificationTime: data.notificationTime })
            );
        }
        return this.prisma.note.update({
            where: { id },
            data,
        });
    }

    // Удаление заметки
    async deleteNote(id: string) {
        return this.prisma.note.delete({ where: { id } });
    }
}
