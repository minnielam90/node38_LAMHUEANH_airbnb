import { Controller } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
}
