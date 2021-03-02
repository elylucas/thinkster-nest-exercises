import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersRepository {
  users: User[] = [
    { id: 'user', name: 'Joe User', roles: ['user'] },
    { id: 'admin', name: 'Becka Admin', roles: ['user', 'admin'] },
  ];

  getUserByToken(token: string) {
    const user = this.users.find(x => x.id === token);
    return user;
  }
}
