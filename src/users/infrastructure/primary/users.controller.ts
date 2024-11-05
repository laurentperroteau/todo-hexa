import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../../application/createUser.useCase';
import { GetUsersUseCase } from '../../application/getUsers.useCase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.getUsersUseCase.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUsersUseCase.getOne(id);
  }
}
