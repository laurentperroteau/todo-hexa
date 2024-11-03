import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../../domain/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserToCreate } from '../../domain/user.model';
import { UsersRepositoryPort } from '../../domain/users.repository.port';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
