
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./controller/user.controller";
import { UserEntity } from "./entities/user.model";
import { UsersService } from "./services/users.service";

import { AuthService } from "@modules/auth/services/auth.service";

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]) ],
  providers: [ UsersService, AuthService, JwtService, ],
  controllers: [ UsersController ],
  exports: [ UsersService ]
})

export class UsersModule {}
