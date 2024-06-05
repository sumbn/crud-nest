import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  create(reqBody: any) {
    const user = this.userRepo.create(reqBody);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async updateById(id: number, requestBody: any) {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    user = { ...user, ...requestBody };
    return this.userRepo.save(user);
  }

  async deleteById(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return this.userRepo.remove(user);
  }
}
