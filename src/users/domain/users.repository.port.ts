import { User } from './user.model';

export abstract class UsersRepositoryPort {
  abstract create(userToCreate: Omit<User, 'id'>): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: string): Promise<User | undefined>;
}
