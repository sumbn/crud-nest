import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() reqBody: CreateUserDto) {
    return this.userService.create(reqBody);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get()
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put('/:id')
  updateUser(@Query('id', ParseIntPipe) id: number, @Body() requestBody: UpdateUserDto) {
    return this.userService.updateById(id, requestBody);
  }

  @Delete('/:id')
  deleteByID(@Query('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
