import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UsersModule } from '@modules/users/users.module'
import { AuthService } from "./services/auth.service"
import { AuthController } from './controller/auth.controller'

import { LocalStrategy } from './strategies/auth.local'
import { JwtStrategy } from './strategies/jwt.strategy'

import { ConfigService, ConfigModule } from '@nestjs/config'
import { UsersService } from '@modules/users/services/users.service'


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRY') },
      }),
    }), 
  ],
  providers: [AuthService,  LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})

export class AuthModule {}