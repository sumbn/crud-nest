import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos/createPost.dto';
import { UserEntity } from '../user/user.entity';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { Permission } from '../helpers/checkPermission.helper';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private postRepo: Repository<PostEntity>) {}

  create(req: CreatePostDto, currentUser: UserEntity) {
    const post = this.postRepo.create(req);
    post.user = currentUser;
    return this.postRepo.save(post);
  }

  getAll() {
    return this.postRepo.find();
  }

  getPostById(id: number) {
    return this.postRepo.findOneBy({ id });
  }

  async updatePost(id: number, req: UpdatePostDto, currentUser: UserEntity) {
    let post = await this.getPostById(id);

    if (!post) {
      throw new NotFoundException(`not found post with id ${id}`);
    }

    // Permission.check(post.user.id, currentUser);

    post = { ...post, ...req };

    return this.postRepo.save(post);
  }
}
