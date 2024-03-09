import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('NguoiDung')
@Controller('/api/nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  fetchNguoiDung(@Res() res): any {
    return this.nguoiDungService.fetchNguoiDungApi(res);
  }

  @Post()
  createNguoiDung(@Body() body: CreateNguoiDungDto, @Res() res): any {
    return this.nguoiDungService.createNguoiDungApi(body, res);
  }

  @Delete('/:id')
  deleteNguoiDung(@Param('id') id: number, @Res() res): any {
    return this.nguoiDungService.deleteNguoiDungApi(id, res);
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
  phanTrangUser(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
    @Res() res,
  ): any {
    return this.nguoiDungService.phanTrangUserApi(
      pageIndex,
      pageSize,
      keyword,
      res,
    );
  }

  @Get('/:id')
  getInfoNguoiDungTheoId(@Param('id') id: number, @Res() res): any {
    return this.nguoiDungService.getInfoNguoiDungTheoIdApi(id, res);
  }

  @Put('/:id')
  updateNguoiDung(
    @Body() body: UpdateNguoiDungDto,
    @Param('id') id: number,
    @Res() res,
  ): any {
    return this.nguoiDungService.updateNguoiDungApi(body, id, res);
  }

  @Get('/search/:TenNguoiDung')
  searchNguoiDung(
    @Param('TenNguoiDung') tenNguoiDung: string,
    @Res() res,
  ): any {
    return this.nguoiDungService.searchNguoiDungApi(tenNguoiDung, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        maNguoiDung: {
          type: 'integer',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['maNguoiDung', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Body() body: { maNguoiDung: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { maNguoiDung } = body;
    const key = `${file.originalname}${Date.now()}`;
    return this.nguoiDungService.uploadFile(maNguoiDung, file.buffer, key);
  }
}
