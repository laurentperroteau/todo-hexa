import { Task } from '../../domain/task.model';

export class TaskEntity {
  id: string;
  label: string;
  done: boolean;
  updatedDate: Date;
  userId?: string;

  constructor(task: TaskEntity) {
    this.id = task.id;
    this.label = task.label;
    this.done = task.done;
    this.updatedDate = task.updatedDate;
    this.userId = task.userId;
  }

  static toDomain(entity: TaskEntity): Task {
    return new Task({
      id: entity.id,
      label: entity.label,
      isDone: entity.done,
      updatedDate: entity.updatedDate,
      userId: entity.userId,
    });
  }

  static fromDomain(task: Task): TaskEntity {
    return new TaskEntity({
      id: task.id,
      label: task.label,
      done: task.isDone,
      updatedDate: task.updatedDate,
      userId: task.userId,
    });
  }
}
