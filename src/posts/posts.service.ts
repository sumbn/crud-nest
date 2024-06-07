import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos/createPost.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepo: Repository<PostEntity>) {}

  create(req: CreatePostDto, currentUser: UserEntity) {
    const post = this.postRepo.create(req);
    post.user = currentUser;
    return this.postRepo.save(post);
  }
}
