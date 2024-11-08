import { Task } from '../../application/task.model';

export class TaskEntity {
  id: string;
  label: string;
  done: boolean;
  userId?: string;

  constructor(task: TaskEntity) {
    this.id = task.id;
    this.label = task.label;
    this.done = task.done;
    this.userId = task.userId;
  }

  static toDomain(entity: TaskEntity): Task {
    return new Task({
      id: entity.id,
      label: entity.label,
      isDone: entity.done,
      userId: entity.userId,
    });
  }

  static fromDomain(task: Task): TaskEntity {
    return new TaskEntity({
      id: task.id,
      label: task.label,
      done: task.isDone,
      userId: task.userId,
    });
  }
}
