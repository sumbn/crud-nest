import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { UpdatePostDto } from './dtos/updatePost.dto';

@Controller('api/v1/post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() req: CreatePostDto, @CurrentUser() currentUser: UserEntity) {
    return this.postService.create(req, currentUser);
  }

  @Get()
  getAllPost() {
    return this.postService.getAll();
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UpdatePostDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.postService.updatePost(id, req, currentUser);
  }
}
