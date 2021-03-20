import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceUnavailableGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isUnavailable = this.reflector.get<boolean>('service-unavailable', context.getClass());
    if (isUnavailable) {
      throw new ServiceUnavailableException('service is temporarily unavailable');
    }
    return true;
  }
}
