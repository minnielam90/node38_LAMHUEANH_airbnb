import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  login(@Body() body: LoginAuthDto, @Res() res): Promise<string> {
    return this.authService.signIn(body, res);
  }

  @Post('/signup')
  register(@Body() body: RegisterAuthDto, @Res() res): any {
    return this.authService.signUp(body, res);
  }
}
