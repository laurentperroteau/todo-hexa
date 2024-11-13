import { TasksService } from './tasks.service';
import { ITasksRepository } from './port/tasks-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { DateHelper } from '../../common/helpers/dateHelper';

describe(TasksService.name, () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: ITasksRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should call tasksRepository.findAll', () => {
      tasksService.findAll();

      expect(tasksRepository.findAll).toHaveBeenCalled();
    });
  });
});
