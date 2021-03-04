import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthedRequest } from './auth.guard';

/**
Exercise
Look up the user by their auth token and let them through if the user
exists, and deny access if they don’t.

Steps:
1 - Access the request from the ExecutionContext.
3 - Return back the user that is attached to the request.
4 - In the rooms, speakers, and sessions controllers, update the POST and PUT
    methods to take a user argument with the new @GetUser decorator.
    Instead of setting the createdBy manually on the entity, use the user id.
5 - Test that it works by running a POST request to
    http://localhost:3000/rooms with the following JSON:
    {
      "name": "A New Room",
      "capacity": 100
    }
    Change the authorization header to be "user".
6 - Verify that the createdBy field for the new room is "user" by going to the 
    src/data/db.json file and inspecting the new room in the rooms array.
*/

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthedRequest>();
  return request.user;
});