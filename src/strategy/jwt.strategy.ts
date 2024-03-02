import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  prisma = new PrismaClient();

  async validate(tokenDecode: any) {
    console.log('Token decoded:', tokenDecode); 
    let { id, email, full_name } = tokenDecode.data;
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return true;
    } else {
      return false;
    }
    console.log(tokenDecode);
    // return tokenDecode;
  }
}


// import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { PrismaClient } from "@prisma/client";
// import { ExtractJwt, Strategy } from "passport-jwt";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('SECRET_KEY'),
//     });
//   }
//   prisma = new PrismaClient();

//   async validate(tokenDecode: any) {
//     try {
//       console.log('Token decoded:', tokenDecode);
//       const { id, email, full_name } = tokenDecode.data;

//       const user = await this.prisma.nguoi_dung.findFirst({
//         where: {
//           email,
//         },
//       });

//       if (!user) {
//         throw new UnauthorizedException('Invalid user in token');
//       }

//       // If needed, you can attach user information to the request object here
//       // Req.user = user;

//       return user;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token', error.message);
//     }
//   }
// }
