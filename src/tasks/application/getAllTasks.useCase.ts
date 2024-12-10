import { Injectable } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';

@Injectable()
export class GetAllTasksUseCase {
  constructor(private tasksService: TasksService) {}

  async execute() {
    return this.tasksService.findAll();
  }
}
