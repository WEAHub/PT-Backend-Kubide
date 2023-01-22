import { MessageEntity } from "../entities/messages.model";


class IGetMessagesResponse extends MessageEntity {
  fromUserEmail: string;
  toUserEmail: string;
}

export {
  IGetMessagesResponse
}