import { BadRequestException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';

export class Permission {
  static check(id: number, currentUser: UserEntity) {
    if (id === currentUser.id) return;
    if (currentUser.role === 'ADMIN') return;
    throw new BadRequestException('user cannot perform action');
  }
}
