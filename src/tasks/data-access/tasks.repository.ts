import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';

const tasks: TaskEntity[] = [];

@Injectable()
export class TasksRepository {
  async create(taskToCreate: TaskEntity): Promise<void> {
    tasks.push(taskToCreate);
    return Promise.resolve();
  }

  findAll(): Promise<TaskEntity[]> {
    return Promise.resolve(tasks);
  }

  findOne(id: string): Promise<TaskEntity | undefined> {
    return Promise.resolve(tasks.find((task) => task.id === id));
  }

  findAllByUser(userId: string): Promise<TaskEntity[]> {
    return Promise.resolve(tasks.filter((task) => task.userId === userId));
  }

  async update(id: string, taskToUpdate: Partial<TaskEntity>): Promise<void> {
    const currentTask = await this.findOne(id);
    if (!currentTask) {
      throw new Error('Task not found');
    }

    tasks[id] = { ...currentTask, ...taskToUpdate };
  }

  remove(id: string): Promise<void> {
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1,
    );
    return Promise.resolve();
  }
}
