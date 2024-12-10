import { TasksService } from './tasks.service';
import { ITasksRepository } from './port/tasks-repository.interface';

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

class TaskRepositoryMock implements Partial<ITasksRepository> {
  findAll = () => Promise.resolve(tasks);
}

describe(TasksService.name, () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    tasksService = new TasksService(
      new TaskRepositoryMock() as ITasksRepository,
    );
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
