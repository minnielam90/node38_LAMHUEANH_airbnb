import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { PhongModule } from './phong/phong.module';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, NguoiDungModule, DatPhongModule, PhongModule, ViTriModule, BinhLuanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
