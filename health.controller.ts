import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/health')
export class HealthController {
  @Get()
  ping() {
    return { ok: true, service: process.env.APP_NAME || 'Crux LMS API' };
  }
}