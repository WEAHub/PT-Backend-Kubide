import { MessageEntity } from "@modules/messages/entities/messages.model";
import { UserEntity } from "@modules/users/entities/user.model";
import { INewMessage } from "../interfaces/new-message.interface";

class NewMessageEvent {
  message: string;
  userId: number;

  constructor(data: INewMessage) {
    this.message = data.message
    this.userId = data.userId
  }
}

export {
  NewMessageEvent
}