import { MessageEntity } from "@modules/messages/entities/messages.model";
import { UserEntity } from "@modules/users/entities/user.model";

interface INewMessage {
  message: string;
  userId: number;
}

export {
  INewMessage
}