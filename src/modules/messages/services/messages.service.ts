import { IUserToken } from "@modules/auth/interfaces/user-session.interface";
import { IApiMessage } from "@modules/shared/interfaces/IApiMessages.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "../entities/messages.model";
import { EInboxType } from "../interfaces/get-messages.enum";

@Injectable()
export class MessagesService {

  constructor(
    @InjectRepository(MessageEntity)
    private readonly msgRepository: Repository<MessageEntity>
  )
  { }

  async getUserMessages(user: IUserToken, origin: string): Promise<MessageEntity[]> {

    const type = origin == EInboxType.IN
    ? { toUserId: user.userId }
    : { fromUserId: user.userId }

    return this.msgRepository.findBy(type)
  }

  async createMessage(message: MessageEntity): Promise<IApiMessage> {
    this.msgRepository.save(message)
    return {
      message: 'Success'
    }
  }
}