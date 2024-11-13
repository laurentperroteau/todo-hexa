import { TasksService } from './tasks.service';
import { ITasksRepository } from './port/tasks-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe(TasksService.name, () => {
  let tasksService: TasksService;
  let tasksRepository: ITasksRepository;

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
    tasksRepository = module.get<ITasksRepository>(ITasksRepository);
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
