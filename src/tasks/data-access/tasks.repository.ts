import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { Task, TaskToCreate } from '../application/task.model';
import { randomUUID } from 'node:crypto';

const tasks: TaskEntity[] = [];

@Injectable()
export class TasksRepository {
  async create(taskToCreate: TaskToCreate): Promise<void> {
    const task = TaskEntity.fromDomain({
      ...taskToCreate,
      id: randomUUID(),
      isDone: false,
    });
    tasks.push(task);
    return Promise.resolve();
  }

  async findAll(): Promise<Task[]> {
    const _tasks = await Promise.resolve(tasks);
    return _tasks.map((task) => TaskEntity.toDomain(task));
  }

  async findOne(id: string): Promise<Task | undefined> {
    const task = await Promise.resolve(tasks.find((task) => task.id === id));
    if (!task) return undefined;

    return TaskEntity.toDomain(task);
  }

  async findAllByUser(userId: string): Promise<Task[]> {
    const _tasks = await Promise.resolve(
      tasks.filter((task) => task.userId === userId),
    );
    return _tasks.map((task) => TaskEntity.toDomain(task));
  }

  async update(id: string, taskToUpdate: Partial<Task>): Promise<void> {
    const currentTask = await this.findOne(id);
    if (!currentTask) {
      throw new Error('Task not found');
    }

    const task = TaskEntity.fromDomain({
      id,
      label: taskToUpdate.label || currentTask.label,
      isDone: taskToUpdate.isDone || currentTask.isDone,
      userId: taskToUpdate.userId || currentTask.userId,
    });

    tasks[id] = { ...currentTask, ...task };
  }

  remove(id: string): Promise<void> {
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1,
    );
    return Promise.resolve();
  }
}
