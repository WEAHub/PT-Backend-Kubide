
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationsController } from "./controller/notifications.controller";
import { NotificationsService } from "./services/notifications.service";
import { NotificationEntity } from "./entities/notifications.model";

import { MessageListener } from "./listeners/messages.listener";

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]) 
  ],
  providers: [ NotificationsService, JwtService, MessageListener ],
  controllers: [ NotificationsController ],
  exports: [ NotificationsService ]
})

export class NotificationsModule {}
