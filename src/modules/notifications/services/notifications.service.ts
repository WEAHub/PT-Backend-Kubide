
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { NotificationEntity } from "../entities/notifications.model";
import { UserEntity } from "@modules/users/entities/user.model";
import { IUserToken } from "@modules/auth/interfaces/user-session.interface";

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly msgRepository: Repository<NotificationEntity>
  )
  { }
  
  async addNotification(userId: number, message: string): Promise<void> {

    const newNotification = <NotificationEntity>{
      userId: userId,
      message,
      created_dt: new Date(),
    }

    this.msgRepository.save(newNotification)
    
  }

  async getNotifications(user: IUserToken): Promise<NotificationEntity[]> {
    return this.msgRepository.findBy({
      userId: user.userId
    })
  }

}