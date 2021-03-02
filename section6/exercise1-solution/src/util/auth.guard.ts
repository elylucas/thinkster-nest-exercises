import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UsersRepository } from 'src/users/users.repository';

/**
Exercise:

Look up the user by their auth token and let them through if the user
exists, and deny access if they don’t.

Steps:
1 - Inject the UsersRepository into the AuthGuard.
2 - Access the request from the ExecutionContext.
3 - Pull back the user based on their authentication token provided 
    in the header.
4 - If the user exists, let them through, if not, deny the request.
5 - Test that the auth guard works by running a request to 
    http://localhost:3000/rooms while setting the authorization header to 
    ‘admin’ and then remove the authorization header (or change the value 
    to something else) and verify the request fails. 
*/

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.headers.authorization) {
      const user = this.usersRepository.getUserByToken(request.headers.authorization);
      if (user) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

}
