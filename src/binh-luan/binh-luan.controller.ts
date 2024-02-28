import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('BinhLuan')
@Controller('/api/binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Get()
  getBinhLuan(@Res() res): any {
    return this.binhLuanService.fetchBinhLuanApi(res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBinhLuan(@Body() body: CreateBinhLuanDto, @Res() res): any {
    return this.binhLuanService.createBinhLuanApi(body, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateBinhLuan(
    @Body() body: UpdateBinhLuanDto,
    @Param('id') idBinhLuan: number,
    @Res() res,
  ): any {
    return this.binhLuanService.updateBinhLuan(body, idBinhLuan, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
