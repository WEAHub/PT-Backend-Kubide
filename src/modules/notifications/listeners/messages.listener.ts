import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { NewMessageEvent } from "../events/new-message.event";
import { NotificationsService } from "../services/messages.service";

@Injectable()
class MessageListener {

  constructor(
    private notificationsService: NotificationsService
  ) { }

  @OnEvent('message.new')
  async handleNewMessageEvent(event: NewMessageEvent) {
    await this.notificationsService.addNotification(
      event.userId,
      event.message
    )
  }

}

export {
  MessageListener
}