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
import { TasksService } from '../domain/tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersRepository } from '../../users/infrastructure/secondary/users.repository';
import { Task } from '../domain/task.model';
import { GetAllTasksUseCase } from '../application/getAllTasks.useCase';
import { CreateTaskUseCase } from '../application/createTask.useCase';
import { CreateTaskWithUserUseCase } from '../application/createTaskWithUser.useCase';
import { FindAllTasksByUserUseCase } from '../application/findAllTasksByUser.useCase';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly createTaskWithUserUseCase: CreateTaskWithUserUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly findAllTasksByUserUseCase: FindAllTasksByUserUseCase,
    private readonly tasksService: TasksService,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Post('/users/:id')
  async createWithUser(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.createTaskWithUserUseCase.execute(id, createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.getAllTasksUseCase.execute();
  }

  @Get('/users/:id')
  async findAllByUserId(@Param('id') id: string): Promise<Task[]> {
    return this.findAllTasksByUserUseCase.execute(id);
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
