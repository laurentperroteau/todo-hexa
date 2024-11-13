import { TasksService } from './tasks.service';
import { ITasksRepository } from './port/tasks-repository.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { DateHelper } from '../../common/helpers/dateHelper';

const tasks = [
  {
    id: '1',
    label: 'Task 1',
    isDone: false,
    userId: '1',
    updatedDate: new Date('2021-01-01'),
  },
  {
    id: '2',
    label: 'Task 2',
    isDone: false,
    userId: '1',
    updatedDate: new Date('2021-01-02'),
  },
  {
    id: '3',
    label: 'Task 3',
    isDone: false,
    userId: '1',
    updatedDate: new Date('2021-01-03'),
  },
];

describe(TasksService.name, () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: ITasksRepository,
          useValue: {
            findAll: jest.fn().mockReturnValue(Promise.resolve(tasks)),
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
    it('should return more recent date first', async () => {
      const res = await tasksService.findAll();
      const ids = res.map((task) => task.id);

      expect(ids).toStrictEqual(['3', '2', '1']);
    });
  });
});
