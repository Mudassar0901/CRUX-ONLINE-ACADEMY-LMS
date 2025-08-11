import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('api/v1/leads')
export class LeadsController {
  constructor(private svc: LeadsService) {}

  @Post()
  create(@Body() body: any) { return this.svc.create(body); }

  @Get()
  list() { return this.svc.list(); }
}