import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}
  list() { return this.prisma.tenant.findMany(); }
}