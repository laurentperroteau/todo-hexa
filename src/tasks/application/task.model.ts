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
}

export class TaskToCreate {
  label: string;
  userId?: string;

  constructor(task: TaskToCreate) {
    this.label = task.label;
    this.userId = task.userId;
  }
}
