import { Injectable } from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatPhongService {
  prisma = new PrismaClient();
  async fetchDatPhongApi(res): Promise<any> {
    try {
      const data = await this.prisma.dat_phong.findMany({});
      return res.status(200).send(data);
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async createDatPhongApi(body: CreateDatPhongDto, res): Promise<any> {
    try {
      const { ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } =
        body;
      const checkMaPhong = await this.prisma.phong.findFirst({
        where: {
          id: ma_phong,
        },
      });
      const checkMaNguoiDat = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: ma_nguoi_dat,
        },
      });
      if (checkMaPhong && checkMaNguoiDat) {
        const newDatPhong = {
          ma_phong,
          ngay_den,
          ngay_di,
          so_luong_khach,
          ma_nguoi_dat,
        };
        const datPhong = await this.prisma.dat_phong.create({
          data: newDatPhong,
        });
        return res.status(201).send({
          statusCode: 201,
          message: 'Thêm mới thành công!',
          content: datPhong,
        });
      } else if (!checkMaPhong) {
        return res.status(404).send('Mã phòng không tồn tại!');
      } else if (!checkMaNguoiDat) {
        return res.status(404).send('Mã người dùng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async getInfoDatPhongTheoIdApi(idDatPhong, res): Promise<any> {
    try {
      const checkMaDatPhong = await this.prisma.dat_phong.findFirst({
        where: {
          id: Number(idDatPhong),
        },
      });
      if (checkMaDatPhong) {
        const findInfoDatPhongBaseOnId = await this.prisma.dat_phong.findFirst({
          where: {
            id: Number(idDatPhong),
          },
        });
        return res.status(201).send(findInfoDatPhongBaseOnId);
      } else {
        return res.status(404).send('Mã đặt phòng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async updateDatPhongApi(
    body: UpdateDatPhongDto,
    idDatPhong,
    res,
  ): Promise<any> {
    try {
      const { ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } =
        body;
      const checkMaPhong = await this.prisma.phong.findFirst({
        where: {
          id: ma_phong,
        },
      });
      const checkMaNguoiDat = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: ma_nguoi_dat,
        },
      });
      const checkMaDatPhong = await this.prisma.dat_phong.findFirst({
        where: {
          id: Number(idDatPhong),
        },
      });
      if (checkMaDatPhong && checkMaNguoiDat && checkMaPhong) {
        const updateData = {
          ma_phong,
          ngay_den,
          ngay_di,
          so_luong_khach,
          ma_nguoi_dat,
        };
        const update = this.prisma.dat_phong.update({
          where: {
            id: Number(idDatPhong),
          },
          data: updateData,
        });
        return res.status(201).send(update);
      } else if (!checkMaDatPhong) {
        return res.status(404).send('Mã đặt phòng không tồn tại!');
      } else if (!checkMaNguoiDat) {
        return res.status(404).send('Mã người dùng không tồn tại!');
      } else if (!checkMaPhong) {
        return res.status(404).send('Mã phòng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async deleteDatPhongApi(idDatPhong, res): Promise<any> {
    try {
      const checkMaDatPhong = await this.prisma.dat_phong.findFirst({
        where: {
          id: Number(idDatPhong),
        },
      });
      if (checkMaDatPhong) {
        const deleteDatPhong = await this.prisma.dat_phong.delete({
          where: {
            id: Number(idDatPhong),
          },
        });
        return res.status(201).send('Xóa thông tin đặt phòng thành công!');
      } else {
        return res.status(404).send('Mã đặt phòng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async getInfoDatPhongBaseOnNguoiDung(maNguoiDung, res): Promise<any> {
    try {
      const checkMaNguoiDung = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: Number(maNguoiDung),
        },
      });
      if (checkMaNguoiDung) {
        const getInfo = await this.prisma.dat_phong.findMany({
          where: {
            ma_nguoi_dat: Number(maNguoiDung),
          },
        });
        return res.status(200).send(getInfo);
      } else {
        return res.status(404).send('Mã người dùng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }
}
