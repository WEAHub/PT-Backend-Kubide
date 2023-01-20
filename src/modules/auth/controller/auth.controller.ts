import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { LoginDto, SignupDto } from '../dto/auth.dto';
import { LocalAuthGuard } from '../guards/local.guard';


@Controller("auth")
@ApiTags('Authentification')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'User Login'})
  async login(@Request() req, @Body() loginData: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'User Registration'})
  async createUser(@Body() user: SignupDto) {
    return this.authService.register(user)
  }
  
}