
import { Controller, Get, UseGuards, Request, Body, NotAcceptableException } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { NotificationEntity } from "../entities/notifications.model";
import { NotificationsService } from "../services/notifications.service";

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
  async getNotifications(@Request() req): Promise<NotificationEntity[]> {
    return this.notificationiService.getNotifications(req.user)
  }

}