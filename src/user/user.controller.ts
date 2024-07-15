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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserEntity } from './user.entity';
import { RoleGuard } from '../guards/role.guard';

@Controller('/api/v1/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(new RoleGuard(['admin', 'user', 'mod']))
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @Get()
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put('/:id')
  @UseGuards(new RoleGuard(['admin', 'user', 'mod']))
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    console.log('first', id);
    return this.userService.updateById(id, requestBody, currentUser);
    // return 'test';
  }

  @Delete('/:id')
  @UseGuards(new RoleGuard(['admin', 'user', 'mod']))
  @UseGuards(AuthGuard)
  deleteByID(@Query('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserEntity) {
    return this.userService.deleteById(id, currentUser);
  }

  @Post('/register')
  registerUser(@Body() requestBody: RegisterUserDto) {
    console.log(requestBody);
    return this.authService.register(requestBody);
  }

  @Post('/login')
  loginUser(@Body() requestBody: LoginUserDto) {
    return this.authService.login(requestBody);
  }
}
