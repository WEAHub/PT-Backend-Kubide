import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { Controller, Get, UseGuards, Request, Body, NotAcceptableException } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { NotificationsService } from "../services/messages.service";

@Controller('notifications')
@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationiService: NotificationsService,
  ) { }

  @Get('/getNotifications')
  @ApiOperation({ summary: 'Get notifications of user'})
  async getNotifications(@Request() req) {
    return this.notificationiService.getNotifications(req.user)
  }

}