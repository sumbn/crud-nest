import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // get token

    const token = request.headers.authorization.split(' ')[1];
    // console.log(token);

    // jwt valid token

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      //find user in db

      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new BadRequestException('user not belong to token');
      }

      //assign user to request obj

      request.currentUser = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
