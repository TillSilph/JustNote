import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.note.create({ data });
  }

  // Редактирование заметки
  async updateNote(id: string, data: Prisma.NoteUpdateInput) {
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
