import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}
  create(data: any) { return this.prisma.lead.create({ data }); }
  list() { return this.prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }); }
}