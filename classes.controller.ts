import { Body, Controller, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';

@Controller('api/v1')
export class ClassesController {
  constructor(private svc: ClassesService) {}

  @Post('classes')
  create(@Body() body: any) { return this.svc.createClass(body); }

  @Post('enrolments')
  enrol(@Body() body: any) { return this.svc.enrolStudent(body); }

  @Post('attendance/check')
  attendance(@Body() body: any) { return this.svc.checkAttendance(body); }
}