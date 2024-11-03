import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../infrastructure/secondary/entities/user.entity';

export abstract class UsersRepositoryPort {
  abstract create(createUserDto: CreateUserDto): Promise<void>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract findOne(id: string): Promise<UserEntity | undefined>;
}
