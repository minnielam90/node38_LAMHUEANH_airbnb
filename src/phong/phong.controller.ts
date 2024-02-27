import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PhongService } from './phong.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePhongDto } from './dto/create-phong.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePhongDto } from './dto/update-phong.dto';

@ApiTags('Phong')
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  fetchPhongThue(@Res() res): any {
    return this.phongService.fetchPhongThueApi(res);
  }

  @Post()
  createPhongThue(@Body() body: CreatePhongDto, @Res() res): any {
    return this.phongService.createPhongThueApi(body, res);
  }

  @Get('/lay-phong-theo-vi-tri')
  getPhongBaseOnLocation(@Query('maViTri') maViTri: number, @Res() res): any {
    return this.phongService.getPhongBaseOneLocationApi(maViTri, res);
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({
    name: 'keyword',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'pageIndex',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  phanTrangPhong(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res,
  ): any {
    return this.phongService.phanTrangPhongApi(
      pageIndex,
      pageSize,
      keyword,
      res,
    );
  }

  @Get('/:id')
  getPhongBaseOnId(@Param('id') idPhong: number, @Res() res): any {
    return this.phongService.getPhongBaseOnIdApi(idPhong, res);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updatePhongThue(
    @Body() body: UpdatePhongDto,
    @Param('id') idPhong: number,
    @Res() res,
  ): any {
    return this.phongService.updatePhongThueApi(body, idPhong, res);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deletePhongThue(@Param('id') idPhong: number, @Res() res): any {
    return this.phongService.deletePhongThueApi(idPhong, res);
  }
}
