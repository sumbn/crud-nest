import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createPost.dto';
import { CurrentUser } from '../user/decorators/currentUser.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/v1/post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() req: CreatePostDto, @CurrentUser() currentUser: UserEntity) {
    return this.postService.create(req, currentUser);
  }
}
