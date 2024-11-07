import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from '../application/tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersRepository } from '../../users/infrastructure/secondary/users.repository';
import { Task } from '../application/task.model';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post('/users/:id')
  async createWithUser(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.tasksService.createWithUser(createTaskDto, id);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('/users/:id')
  async findAllByUserId(@Param('id') id: string): Promise<Task[]> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.tasksService.findAllByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | undefined> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
