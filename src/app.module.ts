import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE_NAME'),
        entities: [UserEntity, PostEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostsModule,
  ],
})
export class AppModule {}
