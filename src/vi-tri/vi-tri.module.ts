import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [ViTriController],
  providers: [ViTriService, JwtStrategy],
})
export class ViTriModule {}
