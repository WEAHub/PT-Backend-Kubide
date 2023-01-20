import { IUserToken } from "@modules/auth/interfaces/user-session.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "../entities/messages.model";

@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(MessageEntity)
    private readonly msgRepository: Repository<MessageEntity>
  )
  { }

  async getUserMessages(user: IUserToken): Promise<MessageEntity[]> {
    return this.msgRepository.findBy({
      toUserId: user.userId
    })
  }

  async createMessage(message: MessageEntity) {
    this.msgRepository.save(message)
    return {
      message: 'Success'
    }
  }
}