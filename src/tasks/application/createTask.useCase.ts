import { Injectable } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';
import { CreateTaskDto } from '../presentation/dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(private tasksService: TasksService) {}

  async execute(createTaskDto: CreateTaskDto): Promise<void> {
    const taskToCreate = CreateTaskDto.toDomain(createTaskDto);
    return this.tasksService.create(taskToCreate);
  }
}
