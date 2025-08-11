import { Controller, Get } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('api/v1/tenants')
export class TenantsController {
  constructor(private svc: TenantsService) {}
  @Get()
  list() { return this.svc.list(); }
}