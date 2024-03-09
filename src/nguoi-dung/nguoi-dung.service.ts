// nguoi-dung.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class NguoiDungService {
  constructor(private readonly filesService: FileService) {}
  prisma = new PrismaClient();

  async fetchNguoiDungApi(res): Promise<any> {
    try {
      let getData = await this.prisma.nguoi_dung.findMany();
      return res.status(201).send(getData);
    } catch {
      return res.status(400).send('Không lấy được dữ liệu người dùng!');
    }
  }

  async createNguoiDungApi(body: CreateNguoiDungDto, res): Promise<any> {
    try {
      let { full_name, email, pass_word, phone, birth_day, gender, role } =
        body;
      let checkEmail = await this.prisma.nguoi_dung.findFirst({
        where: {
          email,
        },
      });
      if (!checkEmail) {
        let hashPassword = bcrypt.hashSync(pass_word, 10);
        let newData = {
          full_name,
          email,
          pass_word: hashPassword,
          phone,
          birth_day,
          gender,
          role,
        };
        let createNguoiDung = await this.prisma.nguoi_dung.create({
          data: newData,
        });
        return res.status(200).send(createNguoiDung);
      } else {
        return res.status(400).send('Email đã tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async deleteNguoiDungApi(id, res): Promise<any> {
    try {
      let checkMail = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });
      let checkDatPhong = await this.prisma.dat_phong.findFirst({
        where: {
          ma_nguoi_dat: Number(id),
        },
      });
      if (checkMail && !checkDatPhong) {
        let deleteUser = await this.prisma.nguoi_dung.delete({
          where: {
            id: Number(id),
          },
        });
        return res.status(200).send('Xóa người dùng thành công');
      } else if (!checkMail) {
        return res.status(404).send('Người dùng không tồn tại!');
      } else if (checkDatPhong) {
        return res
          .status(404)
          .send('Người dùng này đã đặt phòng, không thể xóa!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async phanTrangUserApi(pageIndex, pageSize, keyword, res): Promise<any> {
    try {
      let data = await this.prisma.nguoi_dung.findMany({
        skip: (Number(pageIndex) - 1) * Number(pageSize),
        take: Number(pageSize),
      });
      let findKey = await this.prisma.nguoi_dung.findMany({
        where: {
          full_name: {
            contains: keyword,
          },
        },
      });
      if (data.length !== 0 && !keyword) {
        return res.status(200).send(data);
      } else if (keyword) {
        return res.status(200).send(findKey);
      } else {
        return res
          .status(400)
          .send('Không thể phân trang hoặc không có keyword!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async getInfoNguoiDungTheoIdApi(id, res): Promise<any> {
    try {
      let checkId = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (checkId) {
        let getData = await this.prisma.nguoi_dung.findFirst({
          where: {
            id: Number(id),
          },
        });
        return res.status(200).send(getData);
      } else {
        return res.status(400).send('Mã người dùng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async updateNguoiDungApi(body: UpdateNguoiDungDto, id, res): Promise<any> {
    try {
      let { full_name, phone, birth_day, gender, role } = body;
      let checkId = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (checkId) {
        let newUpdate = {
          full_name,
          phone,
          birth_day,
          gender,
          role,
        };
        let updateData = await this.prisma.nguoi_dung.update({
          where: {
            id: Number(id),
          },
          data: newUpdate,
        });
        return res.status(201).send(updateData);
      } else if (!checkId) {
        return res.status(404).send('Mã người dùng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  async searchNguoiDungApi(tenNguoiDung, res): Promise<any> {
    try {
      let data = await this.prisma.nguoi_dung.findMany({
        where: {
          full_name: {
            contains: tenNguoiDung,
          },
        },
      });
      if (data.length !== 0) {
        return res.status(200).send(data);
      } else {
        return res.status(404).send('Người dùng không tồn tại!');
      }
    } catch {
      return res.status(500).send('Lỗi BE!');
    }
  }

  // async uploadFile(imageBuffer: Buffer, filename: string) {
  //   const avatar = await this.filesService.uploadPublicFile(
  //     imageBuffer,
  //     filename,
  //   );
  //   return avatar;
  // }

  // nguoi-dung.service.ts

  async uploadFile(
    maNguoiDung,
    imageBuffer: Buffer,
    filename: string,
  ): Promise<any> {
    try {
      const checkMaNguoiDung = await this.prisma.nguoi_dung.findFirst({
        where: {
          id: Number(maNguoiDung),
        },
      });

      if (checkMaNguoiDung) {
        const photo = await this.filesService.uploadPublicFile(
          imageBuffer,
          filename,
        );

        const imageUrl = photo.Location;

        const updatedViTri = await this.prisma.vi_tri.update({
          where: {
            id: Number(maNguoiDung),
          },
          data: {
            hinh_anh: imageUrl,
          },
        });

        return updatedViTri;
      } else {
        throw new Error('Mã người dùng không tồn tại');
      }
    } catch {
      throw new Error('Không tìm thấy tài nguyên!');
    }
  }
}
