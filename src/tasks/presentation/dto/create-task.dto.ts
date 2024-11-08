import { TaskToCreate } from '../../application/task.model';

export class CreateTaskDto {
  label: string;
  isDone?: false;

  static toDomain(dto: CreateTaskDto, userId?: string): TaskToCreate {
    return new TaskToCreate({
      label: dto.label,
      userId,
    });
  }
}
