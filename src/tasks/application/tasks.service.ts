import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../presentation/dto/create-task.dto';
import { UpdateTaskDto } from '../presentation/dto/update-task.dto';
import { TasksRepository } from '../data-access/tasks.repository';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    const taskToCreate = Task.toEntity({
      ...createTaskDto,
      id: randomUUID(),
      isDone: false,
    });

    return this.tasksRepository.create(taskToCreate);
  }

  createWithUser(createTaskDto: CreateTaskDto, userId: string) {
    const taskToCreate = Task.toEntity({
      ...createTaskDto,
      id: randomUUID(),
      isDone: false,
      userId,
    });

    return this.tasksRepository.create(taskToCreate);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();
    return tasks.map((task) => Task.fromEntity(task));
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAllByUser(userId);
    return tasks.map((task) => Task.fromEntity(task));
  }

  async findOne(id: string): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) return undefined;

    return Task.fromEntity(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, {
      id: id,
      label: updateTaskDto.label,
      done: updateTaskDto.isDone,
      userId: updateTaskDto.userId,
    });
  }

  remove(id: string) {
    return this.tasksRepository.remove(id);
  }
}
