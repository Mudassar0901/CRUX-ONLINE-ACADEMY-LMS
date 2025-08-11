import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/payments')
export class PaymentsController {
  @Post('checkout')
  checkout(@Body() body: any) {
    return { ok: true, provider: body?.provider || 'paypal', amount: body?.amount };
  }
}