import { Module } from '@nestjs/common';
import { TasksService } from './application/tasks.service';
import { TasksController } from './presentation/tasks.controller';
import { TasksRepository } from './data-access/tasks.repository';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/infrastructure/secondary/users.repository';
import { ITasksRepository } from './application/port/tasks-repository.interface';

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    UsersRepository,
    // useValue is not for class and useFactory add unnecessary complexity so use a abstract class
    { provide: ITasksRepository, useClass: TasksRepository },
  ],
})
export class TasksModule {}
