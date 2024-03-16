import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@ApiTags('ViTri')
@Controller('/api/vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  @Get()
  fetchViTri(@Res() res): any {
    return this.viTriService.fetchViTriApi(res);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Post()
  createViTri(@Body() body: CreateViTriDto, @Res() res): any {
    return this.viTriService.createViTriApi(body, res);
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Put('/:id')
  updateViTri(
    @Body() body: UpdateViTriDto,
    @Param('id') idViTri: number,
    @Res() res,
  ): any {
    return this.viTriService.updateLocationApi(body, idViTri, res);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Delete('/:id')
  deleteViTri(@Param('id') idViTri: number, @Res() res): any {
    return this.viTriService.deleteLocationApi(idViTri, res);
  }

  // Create hinh vi_tri
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post('/upload-hinh-vitri')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        maViTri: {
          type: 'integer',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['maViTri', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCreatePic(
    @Body() body: { maViTri: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { maViTri } = body;
    const key = `${file.originalname}${Date.now()}`;
    return this.viTriService.createUploadHinhVitri(maViTri, file.buffer, key);
  }
}
