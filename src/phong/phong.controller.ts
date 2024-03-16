import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePhongDto } from './dto/create-phong.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@ApiTags('Phong')
@Controller('/api/phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  fetchPhongThue(@Res() res): any {
    return this.phongService.fetchPhongThueApi(res);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Put('/:id')
  updatePhongThue(
    @Body() body: UpdatePhongDto,
    @Param('id') idPhong: number,
    @Res() res,
  ): any {
    return this.phongService.updatePhongThueApi(body, idPhong, res);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Delete('/:id')
  deletePhongThue(@Param('id') idPhong: number, @Res() res): any {
    return this.phongService.deletePhongThueApi(idPhong, res);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post('/upload-hinh-phong')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        maPhong: {
          type: 'integer',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['maPhong', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCreatePic(
    @Body() body: { maPhong: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { maPhong } = body;
    const key = `${file.originalname}${Date.now()}`;
    return this.phongService.createUploadHinhPhong(maPhong, file.buffer, key);
  }
}
