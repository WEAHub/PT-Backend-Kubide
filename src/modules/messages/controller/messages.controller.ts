import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { UsersService } from "@modules/users/services/users.service";
import { Controller, Get, UseGuards, Request, Body, NotAcceptableException, Post, Param } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { sendMessageDTO } from "../dto/send-message.dto";
import { MessageEntity } from "../entities/messages.model";
import { MessagesService } from "../services/messages.service";
import { NewMessageEvent } from "@modules/notifications/events/new-message.event";
import { getMessagesDTO } from "../dto/get-messages.dto";

@Controller('messages')
@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private eventEmitter: EventEmitter2
  ) { }

  @Get('/getMessages/:type')
  @ApiOperation({ summary: 'Get user messages'})
  async getMessages(@Request() req, @Param() messageType: getMessagesDTO) {
    return this.messagesService.getUserMessages(req.user, messageType.type)
  }

  @Post('/sendMessage')
  @ApiOperation({ summary: 'Send message to user'})
  async sendMessage(@Request() req, @Body() newMessage: sendMessageDTO) {
    const toUser = await this.usersService.findOneByEmail(newMessage.toUser)

    if(!toUser) {
      throw new NotAcceptableException(`This user doesn't exists.`);
    }

    if(!toUser.isOnline) {
      throw new NotAcceptableException(`The user (${newMessage.toUser}) is not Online.`);
    }

    const message = <MessageEntity>{
      fromUserId: req.user.userId,
      toUserId: toUser.id,
      created_dt: new Date(),
      message: newMessage.message
    }

    this.messagesService.createMessage(message);
    
    const newMessageEvent = new NewMessageEvent({
      userId: toUser.id,
      message: 'Te ha enviado un mensaje.'
    })
 
    this.eventEmitter.emit('message.new', newMessageEvent)

    return {
      message: 'sent!'
    }
  }

}