import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';
import { CreateTaskDto } from '../presentation/dto/create-task.dto';
import { UsersRepository } from '../../users/infrastructure/secondary/users.repository';

@Injectable()
export class CreateTaskWithUserUseCase {
  constructor(
    private tasksService: TasksService,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string, createTaskDto: CreateTaskDto): Promise<void> {
    const user = await this.usersRepository.findOne(userId);
    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const taskToCreate = CreateTaskDto.toDomain(createTaskDto, userId);
    return this.tasksService.createWithUser(taskToCreate);
  }
}
