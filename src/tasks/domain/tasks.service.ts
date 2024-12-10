import { Injectable } from '@nestjs/common';
import { Task, TaskToCreate } from './task.model';
import { ITasksRepository } from './port/tasks-repository.interface';
import { DateHelper } from '../../common/helpers/dateHelper';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: ITasksRepository) {}

  create(taskToCreate: TaskToCreate) {
    return this.tasksRepository.create(taskToCreate);
  }

  async createWithUser(taskToCreate: TaskToCreate) {
    if (!taskToCreate.userId) {
      throw new Error('User id is required');
    }

    return this.tasksRepository.create(taskToCreate);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();
    return DateHelper.sortRecordByDateFromNewestToOldest<Task>(
      tasks,
      'updatedDate',
    );
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAllByUser(userId);
    return tasks;
  }

  async findOne(id: string): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) return undefined;

    return task;
  }

  async update(id: string, taskToUpdate: Partial<Task>) {
    return this.tasksRepository.update(id, {
      id: id,
      label: taskToUpdate.label,
      isDone: taskToUpdate.isDone,
      userId: taskToUpdate.userId,
    });
  }

  remove(id: string) {
    return this.tasksRepository.remove(id);
  }
}
