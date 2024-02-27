import { Controller, Get, Res } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BinhLuan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Get()
  getBinhLuan(@Res() res): any {
    return this.binhLuanService.fetchBinhLuanApi(res);
  }
}
