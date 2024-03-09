import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [FileModule],
  controllers: [PhongController],
  providers: [PhongService, JwtStrategy],
})
export class PhongModule {}
