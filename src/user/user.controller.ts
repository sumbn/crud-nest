import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return 'user1';
  }

  @Post()
  createUser(@Body() reqBody: any) {
    return this.userService.create(reqBody);
  }
}
