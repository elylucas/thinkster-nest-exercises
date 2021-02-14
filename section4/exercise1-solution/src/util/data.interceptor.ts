import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Exercise:
// Update the result that gets returned to have a meta field that will contain meta data 
// about the request. 
// If the result coming back from the controller is an array, move the array
// info to the meta data field (page, pageSize, etc...), and set the data field to the
// value of the list array.
// If the result is a single object, set that object to the data field.
// Bonus: Set the status code of the response to meta.statusCode.
// Once done, make a request to /rooms and verify the object is similar to:
// {
//   "id": "1234",
//   "meta": {
//     "statusCode": 200,
//     "page": 1,
//     "pageSize": 10,
//     "totalPages": 1,
//     "total": 10
//   }
//   "data": [...];
// }
// And then make a request to /rooms/1 and verify the result is like:
//   "id": "1234",
//   "meta": {
//     "statusCode": 200
//   }
//   "data": {...};
// }

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
