import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private svc: UsersService) {}
  @Get()
  list() { return this.svc.list(); }
}