import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BinhLuanService {
    constructor(
        // private jwtService: JwtService,
        // private configService: ConfigService,
      ) {}
      prisma = new PrismaClient();


    async fetchBinhLuanApi(res): Promise<any> {
        try {
          let data = await this.prisma.binh_luan.findMany({
            include: {
              nguoi_dung: true,
            },
          });
          return res.status(200).send(data);
        } catch {
          return res.status(500).send('Lỗi BE!');
        }
      }
}
