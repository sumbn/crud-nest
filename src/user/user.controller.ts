import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() reqBody: any) {
    return this.userService.create(reqBody);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get()
  getUser(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put('/:id')
  updateUser(@Query('id') id: number, @Body() requestBody: any) {
    return this.userService.updateById(id, requestBody);
  }

  @Delete('/:id')
  deleteByID(@Query('id') id: number) {
    return this.userService.deleteById(id);
  }
}
