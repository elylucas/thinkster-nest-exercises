import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthedRequest } from './auth.guard';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthedRequest>();
  return request.user;
});