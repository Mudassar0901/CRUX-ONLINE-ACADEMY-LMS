import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  createClass(data: any) { return this.prisma.class.create({ data }); }
  enrolStudent(data: any) { return this.prisma.enrolment.create({ data }); }
  checkAttendance(data: any) { return this.prisma.attendance.create({ data }); }
}