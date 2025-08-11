import { Body, Controller, Headers, Post, Req } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('meta')
  meta(@Body() body: any) { return { received: true, source: 'META', body }; }

  @Post('tiktok')
  tiktok(@Body() body: any) { return { received: true, source: 'TIKTOK', body }; }

  @Post('stripe')
  stripe(@Req() req: any, @Headers('stripe-signature') sig: string) {
    return { received: true, source: 'STRIPE', signature: !!sig };
  }

  @Post('zoom')
  zoom(@Body() body: any) { return { received: true, source: 'ZOOM', body }; }
}