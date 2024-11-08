import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../data-access/tasks.repository';
import { Task, TaskToCreate } from './task.model';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  create(createTaskDto: TaskToCreate) {
    const taskToCreate = Task.toEntity({
      ...createTaskDto,
      id: randomUUID(),
      isDone: false,
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

  async update(id: string, taskToUpdate: Partial<Task>) {
    return this.tasksRepository.update(id, {
      id: id,
      label: taskToUpdate.label,
      done: taskToUpdate.isDone,
      userId: taskToUpdate.userId,
    });
  }

  remove(id: string) {
    return this.tasksRepository.remove(id);
  }
}
