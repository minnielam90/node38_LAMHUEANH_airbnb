import { Body, Controller, Get, Post, Res, UseGuards, Logger, Query, Param, Delete, Put } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';

@ApiTags('ViTri')
@Controller('/api/vi-tri')
export class ViTriController {
  private readonly logger = new Logger(ViTriController.name);

  constructor(private readonly viTriService: ViTriService) {}

  @Get()
  fetchViTri(@Res() res): any {
    return this.viTriService.fetchViTriApi(res);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT token>',
  })
  @ApiBody({ type: CreateViTriDto })
  @Post()
  createViTri(@Body() body: CreateViTriDto, @Res() res): any {

    try {
      this.logger.log(`Received request to create position: ${JSON.stringify(body)}`);

      this.logger.log('Authentication successful');

      return this.viTriService.createViTriApi(body, res);
    } catch (error) {
      this.logger.error(`Error during authentication: ${error.message}`);

      throw error;
    }
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
  phanTrangViTri(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res,
  ): any {
    return this.viTriService.phanTrangViTriApi(
      pageIndex,
      pageSize,
      keyword,
      res,
    );
  }

  @Get('/:id')
  getInfoLocation(@Param('id') idViTri: number, @Res() res): any {
    return this.viTriService.getInfoLocationBaseOnId(idViTri, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateViTri(
    @Body() body: UpdateViTriDto,
    @Param('id') idViTri: number,
    @Res() res,
  ): any {
    return this.viTriService.updateLocationApi(body, idViTri, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteViTri(@Param('id') idViTri: number, @Res() res): any {
    return this.viTriService.deleteLocationApi(idViTri, res);
  }
}
