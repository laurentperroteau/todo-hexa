import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

const tasks: TaskEntity[] = [];

@Injectable()
export class TasksRepository {
  async create(createTaskDto: CreateTaskDto): Promise<void> {
    tasks.push({ ...createTaskDto, id: randomUUID() });
    return Promise.resolve();
  }

  async createWithUser(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<void> {
    tasks.push({ ...createTaskDto, id: randomUUID(), userId });
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

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
    const task = await this.findOne(id);
    if (!task) {
      return;
    }
    tasks[id] = { ...task, ...updateTaskDto };
  }

  remove(id: string): Promise<void> {
    tasks.splice(
      tasks.findIndex((task) => task.id === id),
      1,
    );
    return Promise.resolve();
  }
}
