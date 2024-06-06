import { Exclude } from 'class-transformer';
import { PostEntity } from '../posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ROLES {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: ROLES.USER })
  role: ROLES;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
