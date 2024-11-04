import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../../domain/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToCreate } from '../../domain/user.model';
import { UsersRepositoryPort } from '../../domain/users.repository.port';

@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(private readonly usersRepository: UsersRepositoryPort) {
    /**
     * Why instantiate manually ?
     * - domain should not know Nest dependencies so we cannot use @Injectable
     * - because controller is a singleton, it's safe to instantiate it here like a singleton
     * - repository (which should absolutely be a singleton) is still injected with Nest DI
     */
    this.usersService = new UsersService(usersRepository);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = new UserToCreate({ fullName: createUserDto.name });
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
