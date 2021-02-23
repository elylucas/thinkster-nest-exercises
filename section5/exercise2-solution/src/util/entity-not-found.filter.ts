import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityConstraintException, EntityNotFoundException } from 'src/data/repositories/entity-not-found.exception';

@Catch(EntityNotFoundException)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityConstraintException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    response.status(HttpStatus.NOT_FOUND).json({
      message: exception.message,
      timestamp: new Date().toISOString(),
      url: request.url
    });
  }
}
