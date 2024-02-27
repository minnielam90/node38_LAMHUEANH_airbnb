import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateViTriDto } from './dto/create-vi-tri.dto';

@Injectable()
export class ViTriService {
  prisma = new PrismaClient();

  async fetchViTriApi(res): Promise<any> {
    try {
      let data = await this.prisma.vi_tri.findMany();
      return res.status(200).send(data);
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async createViTriApi(body: CreateViTriDto, res): Promise<any> {
    try {
      let { ten_vi_tri, tinh_thanh, quoc_gia } = body;
      let data = { ten_vi_tri, tinh_thanh, quoc_gia };
      let newData = await this.prisma.vi_tri.create({
        data: data,
      });
      return res.status(201).send(newData);
    } catch {
      return res.status(400).send('Không tìm thấy tài nguyên!');
    }
  }
}
