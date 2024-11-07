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
}
