import { Task, TaskToCreate } from '../task.model';

export abstract class ITasksRepository {
  abstract create(taskToCreate: TaskToCreate): Promise<void>;
  abstract findAll(): Promise<Task[]>;
  abstract findOne(id: string): Promise<Task | undefined>;
  abstract findAllByUser(userId: string): Promise<Task[]>;
  abstract update(id: string, taskToUpdate: Partial<Task>): Promise<void>;
  abstract remove(id: string): Promise<void>;
}
