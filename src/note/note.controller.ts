import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Patch,
  Delete,
  InternalServerErrorException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

  @Get(':id')
  getNoteById(@Param('id') id: string) {
    return this.noteService.getNoteById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createNote(@Body() createNoteDto: CreateNoteDto, @Req() req: Request) {
    try {
      const payload = jwt.decode(req.cookies.jwtoken);
      if(!payload?.login) throw new UnauthorizedException("Проблема с токеном");
      return await this.noteService.createNote({ login:payload.login, ...createNoteDto });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ошибка при создании заметки');
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async editNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    try {
      return await this.noteService.updateNote(id, updateNoteDto);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании заметки');
    }
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return await this.noteService.deleteNote(id);
  }
}
