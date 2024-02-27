import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';

@ApiTags('BinhLuan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Get()
  getBinhLuan(@Res() res): any {
    return this.binhLuanService.fetchBinhLuanApi(res);
  }

  @Post()
  createBinhLuan(@Body() body: CreateBinhLuanDto, @Res() res): any {
    return this.binhLuanService.createBinhLuanApi(body, res);
  }

  @Put('/:id')
  updateBinhLuan(
    @Body() body: UpdateBinhLuanDto,
    @Param('id') idBinhLuan: number,
    @Res() res,
  ): any {
    return this.binhLuanService.updateBinhLuan(body, idBinhLuan, res);
  }

  @Delete('/:id')
  deleteBinhLuan(@Param('id') idBinhLuan: number, @Res() res): any {
    return this.binhLuanService.deleteBinhLuanApi(idBinhLuan, res);
  }

  @Get('/lay-binh-luan-theo-phong/:MaPhong')
  getInfoBinhLuanTheoMaPhong(
    @Param('MaPhong') maPhong: number,
    @Res() res,
  ): any {
    return this.binhLuanService.getInfoBinhLuanTheoMaPhongApi(maPhong, res);
  }
}
