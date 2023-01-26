import { Body, NotAcceptableException, Patch, Request, Controller, Get, UseGuards, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { compare } from "bcrypt";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { UsersService } from "../services/users.service";
import { AuthService } from "@modules/auth/services/auth.service";

import { UserEntity } from "../entities/user.model";

import { EApiResponses, IApiMessage } from "@modules/shared/interfaces/IApiMessages.interface";
import { IActiveUsersResponse } from "../interfaces/get-active-users.interface";

import { userChangePasswordDto, userStatusDto, userUpdateDataDto } from "../dto/update-user.dto";

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get('/activeUsers')
  @ApiOperation({ summary: 'Get active users'})
  async getActiveUsers(): Promise<IActiveUsersResponse[]> {
    return this.usersService.getActiveUsers();
  }

  @Get()
  @ApiOperation({ summary: 'Set user status (Online/Offline)'})
  async setUserStatus(@Request() req, @Query() queryParams: userStatusDto): Promise<IApiMessage> {
    await this.usersService.setUserStatus(req.user.userId, queryParams.active)
    return {
      message: EApiResponses.SUCCESS
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Update user data'})
  async updateUserData(@Request() req, @Body() userStatus: userUpdateDataDto): Promise<IApiMessage> {
    await this.usersService.updateUser(req.user, userStatus)
    
    return {
      message: EApiResponses.SUCCESS
    }
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get user information'})
  async getUserInfo(@Request() req): Promise<UserEntity> {
    return this.usersService.findOneById(req.user.userId)
  }

  @Put('/changePassword')
  @ApiOperation({ summary: 'Change user password'})
  async changePassword(@Request() req, @Body() userChangePassword: userChangePasswordDto): Promise<IApiMessage> {

    const user = await this.usersService.findOneById(req.user.userId)
    const passwordValid = await compare(userChangePassword.oldPassword, user.password)

    if(!passwordValid) {
      throw new NotAcceptableException('Current password wrong!');
    }

    const hashedPassword = await this.authService.hashPassword(userChangePassword.newPassword)
    await this.usersService.changeUserPassword(req.user, hashedPassword)
    

    return {
      message: EApiResponses.SUCCESS
    }

  }
}