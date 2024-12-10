import { Module } from '@nestjs/common';
import { TasksService } from './domain/tasks.service';
import { TasksController } from './presentation/tasks.controller';
import { TasksRepository } from './data-access/tasks.repository';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/infrastructure/secondary/users.repository';
import { ITasksRepository } from './domain/port/tasks-repository.interface';
import { CommonModule } from '../common/common.module';
import { GetAllTasksUseCase } from './application/getAllTasks.useCase';

@Module({
  imports: [CommonModule, UsersModule],
  controllers: [TasksController],
  providers: [
    GetAllTasksUseCase,
    TasksService,
    UsersRepository, // TODO fix with internal adapter
    // useValue is not for class and useFactory add unnecessary complexity so use a abstract class
    { provide: ITasksRepository, useClass: TasksRepository },
  ],
})
export class TasksModule {}
