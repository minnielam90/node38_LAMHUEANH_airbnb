import { Body, Controller, Get, Post, Res, UseGuards, Logger } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateViTriDto } from './dto/create-vi-tri.dto';

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
}
