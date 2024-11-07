import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../presentation/dto/create-task.dto';
import { UpdateTaskDto } from '../presentation/dto/update-task.dto';
import { TasksRepository } from '../data-access/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.create({ ...createTaskDto, done: false });
  }

  createWithUser(createTaskDto: CreateTaskDto, userId: string) {
    return this.tasksRepository.create({
      ...createTaskDto,
      done: false,
      userId,
    });
  }

  findAll() {
    return this.tasksRepository.findAll();
  }

  findAllByUserId(userId: string) {
    return this.tasksRepository.findAllByUser(userId);
  }

  findOne(id: string) {
    return this.tasksRepository.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.tasksRepository.remove(id);
  }
}
