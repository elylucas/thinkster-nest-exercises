import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const id = Math.floor(Math.random() * 1000);
    const request = context.switchToHttp().getRequest();
    request.id = id;

    return next
      .handle()
      .pipe(
        map(result => {

          const response = context.switchToHttp().getResponse();

          if (Array.isArray(result.data)) {
            const { data, ...meta } = result;
            return {
              id: id,
              meta: {
                statusCode: response.statusCode,
                ...meta
              },
              data
            };
          } else {
            return {
              id: id,
              meta: {
                statusCode: response.statusCode
              },
              data: result
            };
          }
        })
      );
  }
}
