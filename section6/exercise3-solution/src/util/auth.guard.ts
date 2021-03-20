import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';

export interface AuthedRequest extends Request {
  user: User;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();

    if (request.headers.authorization) {
      const user = this.usersRepository.getUserByToken(request.headers.authorization);
      if (user) {
        request.user = user;

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (requiredRoles) {
          const hasRole = user.roles.some(role => requiredRoles.includes(role));
          return hasRole;
        }
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

}
