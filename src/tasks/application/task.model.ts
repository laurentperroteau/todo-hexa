import { TaskEntity } from '../data-access/entities/task.entity';

export class Task {
  id: string;
  label: string;
  isDone: boolean;
  userId?: string;

  constructor(task: Task) {
    this.id = task.id;
    this.label = task.label;
    this.isDone = task.isDone;
    this.userId = task.userId;
  }

  static fromEntity(entity: TaskEntity) {
    return new Task({
      id: entity.id,
      label: entity.label,
      isDone: entity.done,
      userId: entity.userId,
    });
  }

  static toEntity(task: Task) {
    return new TaskEntity({
      id: task.id,
      label: task.label,
      done: task.isDone,
      userId: task.userId,
    });
  }
}

export class TaskToCreate {
  label: string;
  userId?: string;

  constructor(task: TaskToCreate) {
    this.label = task.label;
    this.userId = task.userId;
  }
}
