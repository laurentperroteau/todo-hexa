import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../infrastructure/primary/dto/create-user.dto';
import { UserToCreate } from '../domain/user.model';
import { UsersRepositoryPort } from '../domain/users.repository.port';
import { UsersService } from '../domain/users.service';

@Injectable()
export class CreateUserUseCase {
  private readonly usersService: UsersService;

  constructor(private readonly usersRepository: UsersRepositoryPort) {
    /**
     * Why instantiate manually ?
     * - domain should not know Nest dependencies so we cannot use @Injectable
     * - because use case is a singleton, it's safe to instantiate it here like a singleton
     * - repository (which should absolutely be a singleton) is still injected with Nest DI
     */
    this.usersService = new UsersService(usersRepository);
  }

  execute(createUserDto: CreateUserDto) {
    const user = new UserToCreate({ fullName: createUserDto.name });
    return this.usersService.create(user);
  }
}
