import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

export class SomethingDoneBrokeError extends Error { }

/*
  Exercise:
  A few things are missing to make this exception filter functional.
  Steps:
  1 - Make this filter listen for SomethingDoneBrokeErrors.
  2 - Get access to the response through the host argument and return an internal
      server error status code and a response body that contains the error message.
  3 - Bind the filter to the application in a method of your choosing.
  4 - Test that the filter works by running a request to http://localhost:3000/rooms/1
*/

@Catch()
export class SomethingDoneBrokeFilter implements ExceptionFilter {
  catch(exception: SomethingDoneBrokeError, host: ArgumentsHost) {
    
    // set the response status and body
    
  }
}