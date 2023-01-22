
import { Controller, Get, UseGuards, Request, Body, NotAcceptableException, Post, Param } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";

import { sendMessageDTO } from "../dto/send-message.dto";
import { getMessagesDTO } from "../dto/get-messages.dto";

import { MessageEntity } from "../entities/messages.model";
import { UserEntity } from "@modules/users/entities/user.model";

import { UsersService } from "@modules/users/services/users.service";
import { MessagesService } from "../services/messages.service";

import { NewMessageEvent } from "@modules/notifications/events/new-message.event";

import { IGetMessagesResponse } from "../interfaces/get-messages.interface";
import { EApiResponses, IApiMessage } from "@modules/shared/interfaces/IApiMessages.interface";

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
  async getMessages(@Request() req, @Param() messageType: getMessagesDTO): Promise<IGetMessagesResponse[]> {
    const messages: MessageEntity[] = await this.messagesService.getUserMessages(req.user, messageType.type)
    
    const messagesWithEmail = messages.map(async (message: MessageEntity) =>  {
      const fromUser: UserEntity = await this.usersService.findOneById(message.fromUserId)
      const toUser: UserEntity = await this.usersService.findOneById(message.toUserId)

      return <IGetMessagesResponse>{
        ...message,
        fromUserEmail: fromUser.email,
        toUserEmail: toUser.email
      }
    })

    return await Promise.all(messagesWithEmail)

  }

  @Post('/sendMessage')
  @ApiOperation({ summary: 'Send message to user'})
  async sendMessage(@Request() req, @Body() newMessage: sendMessageDTO): Promise<IApiMessage> {
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
      message: EApiResponses.SENT
    }
  }

}