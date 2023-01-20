import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { AuthService } from "@modules/auth/services/auth.service";
import { Body, NotAcceptableException, Patch, Request } from "@nestjs/common";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { compare } from "bcrypt";
import { userChangePasswordDto, userStatusDto, userUpdateDataDto } from "../dto/update-user.dto";
import { UsersService } from "../services/users.service";

@Controller('users')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get('/activeUsers')
  @ApiOperation({ summary: 'Get active users'})
  async getActiveUsers() {
    return this.usersService.getActiveUsers();
  }

  @Patch('/setStatus')
  @ApiOperation({ summary: 'Set user status (Online/Offline)'})
  async setUserStatus(@Request() req, @Body() userStatus: userStatusDto) {
    return this.usersService.setUserStatus(req.user, userStatus)
  }

  @Patch('/updateUser')
  @ApiOperation({ summary: 'Update user data'})
  async updateUserData(@Request() req, @Body() userStatus: userUpdateDataDto) {
    return this.usersService.updateUser(req.user, userStatus)
  }

  @Get('/getUserInfo')
  @ApiOperation({ summary: 'Get user information'})
  async getUserInfo(@Request() req) {
    return this.usersService.findOneById(req.user.userId)
  }

  @Patch('/changePassword')
  @ApiOperation({ summary: 'Change user password'})
  async changePassword(@Request() req, @Body() userChangePassword: userChangePasswordDto) {

    const user = await this.usersService.findOneById(req.user.userId)
    const passwordValid = await compare(userChangePassword.oldPassword, user.password)

    if(!passwordValid) {
      throw new NotAcceptableException('Current password wrong!');
    }

    const hashedPassword = await this.authService.hashPassword(userChangePassword.newPassword)

    return this.usersService.changeUserPassword(req.user, hashedPassword)

  }
}