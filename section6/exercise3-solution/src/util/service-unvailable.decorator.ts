import { SetMetadata } from '@nestjs/common';

export const ServiceUnavailable = (isUnavailable: boolean) => SetMetadata('service-unavailable', isUnavailable);
